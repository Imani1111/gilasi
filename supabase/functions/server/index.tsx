import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import * as mpesa from "./mpesa.tsx";

const app = new Hono();

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-cce144c0/health", (c) => {
  return c.json({ status: "ok" });
});

/**
 * M-Pesa STK Push Initiation Endpoint
 * POST /make-server-cce144c0/mpesa/stk-push
 * Body: { phoneNumber: string, amount: number, accountReference: string, transactionDesc: string }
 */
app.post("/make-server-cce144c0/mpesa/stk-push", async (c) => {
  try {
    const body = await c.req.json();
    const { phoneNumber, amount, accountReference, transactionDesc } = body;

    // Validate input
    if (!phoneNumber || !amount || !accountReference) {
      return c.json(
        { 
          success: false, 
          error: "Missing required fields: phoneNumber, amount, accountReference" 
        },
        400
      );
    }

    // Validate phone number
    if (!mpesa.isValidKenyanPhone(phoneNumber)) {
      return c.json(
        { 
          success: false, 
          error: "Invalid phone number format. Use 254XXXXXXXXX or 07XXXXXXXX" 
        },
        400
      );
    }

    // Validate amount
    if (isNaN(amount) || amount <= 0) {
      return c.json(
        { 
          success: false, 
          error: "Invalid amount. Must be a positive number" 
        },
        400
      );
    }

    // Initiate STK Push
    const result = await mpesa.initiateSTKPush(
      phoneNumber,
      amount,
      accountReference,
      transactionDesc || "GilasiShop Purchase"
    );

    console.log(`STK Push initiated successfully: CheckoutRequestID=${result.CheckoutRequestID}`);

    return c.json({
      success: true,
      data: {
        merchantRequestId: result.MerchantRequestID,
        checkoutRequestId: result.CheckoutRequestID,
        responseCode: result.ResponseCode,
        responseDescription: result.ResponseDescription,
        customerMessage: result.CustomerMessage,
      },
    });
  } catch (error) {
    console.error(`Error in STK Push endpoint: ${error}`);
    return c.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to initiate M-Pesa payment" 
      },
      500
    );
  }
});

/**
 * M-Pesa STK Push Status Query Endpoint
 * POST /make-server-cce144c0/mpesa/stk-query
 * Body: { checkoutRequestId: string }
 */
app.post("/make-server-cce144c0/mpesa/stk-query", async (c) => {
  try {
    const body = await c.req.json();
    const { checkoutRequestId } = body;

    if (!checkoutRequestId) {
      return c.json(
        { 
          success: false, 
          error: "Missing required field: checkoutRequestId" 
        },
        400
      );
    }

    const result = await mpesa.querySTKPushStatus(checkoutRequestId);

    console.log(`STK Push status queried: CheckoutRequestID=${checkoutRequestId}, ResultCode=${result.ResultCode}`);

    return c.json({
      success: true,
      data: {
        responseCode: result.ResponseCode,
        responseDescription: result.ResponseDescription,
        merchantRequestId: result.MerchantRequestID,
        checkoutRequestId: result.CheckoutRequestID,
        resultCode: result.ResultCode,
        resultDesc: result.ResultDesc,
      },
    });
  } catch (error) {
    console.error(`Error in STK Query endpoint: ${error}`);
    return c.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : "Failed to query M-Pesa payment status" 
      },
      500
    );
  }
});

/**
 * M-Pesa Callback Endpoint (for receiving payment notifications from Safaricom)
 * POST /make-server-cce144c0/mpesa/callback
 */
app.post("/make-server-cce144c0/mpesa/callback", async (c) => {
  try {
    const body = await c.req.json();
    console.log("M-Pesa Callback received:", JSON.stringify(body, null, 2));

    // Store callback data in KV store for later retrieval
    const checkoutRequestId = body?.Body?.stkCallback?.CheckoutRequestID;
    if (checkoutRequestId) {
      await kv.set(`mpesa_callback_${checkoutRequestId}`, body);
      console.log(`Stored M-Pesa callback for CheckoutRequestID: ${checkoutRequestId}`);
    }

    // Safaricom expects a 200 OK response
    return c.json({ ResultCode: 0, ResultDesc: "Success" });
  } catch (error) {
    console.error(`Error in M-Pesa callback endpoint: ${error}`);
    return c.json({ ResultCode: 1, ResultDesc: "Failed" }, 500);
  }
});

/**
 * Get M-Pesa callback data
 * GET /make-server-cce144c0/mpesa/callback/:checkoutRequestId
 */
app.get("/make-server-cce144c0/mpesa/callback/:checkoutRequestId", async (c) => {
  try {
    const checkoutRequestId = c.req.param("checkoutRequestId");
    const callbackData = await kv.get(`mpesa_callback_${checkoutRequestId}`);

    if (!callbackData) {
      return c.json(
        { 
          success: false, 
          error: "No callback data found for this checkout request" 
        },
        404
      );
    }

    return c.json({
      success: true,
      data: callbackData,
    });
  } catch (error) {
    console.error(`Error retrieving M-Pesa callback: ${error}`);
    return c.json(
      { 
        success: false, 
        error: "Failed to retrieve callback data" 
      },
      500
    );
  }
});

Deno.serve(app.fetch);