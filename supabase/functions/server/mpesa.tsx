/**
 * M-Pesa STK Push Integration
 * Safaricom Daraja API Implementation
 */

interface MpesaTokenResponse {
  access_token: string;
  expires_in: string;
}

interface STKPushResponse {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResponseCode: string;
  ResponseDescription: string;
  CustomerMessage: string;
}

interface STKQueryResponse {
  ResponseCode: string;
  ResponseDescription: string;
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResultCode: string;
  ResultDesc: string;
}

/**
 * Get OAuth Access Token from Safaricom
 */
export async function getMpesaAccessToken(): Promise<string> {
  const consumerKey = Deno.env.get("MPESA_CONSUMER_KEY");
  const consumerSecret = Deno.env.get("MPESA_CONSUMER_SECRET");
  
  if (!consumerKey || !consumerSecret) {
    throw new Error("M-Pesa credentials not configured. Please set MPESA_CONSUMER_KEY and MPESA_CONSUMER_SECRET environment variables.");
  }

  const auth = btoa(`${consumerKey}:${consumerSecret}`);
  const environment = Deno.env.get("MPESA_ENVIRONMENT") || "sandbox";
  const authUrl = environment === "production"
    ? "https://api.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    : "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

  try {
    const response = await fetch(authUrl, {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`M-Pesa OAuth error while generating access token: ${response.status} ${response.statusText} - ${errorText}`);
      throw new Error(`Failed to get M-Pesa access token: ${response.status} ${response.statusText}`);
    }

    const data: MpesaTokenResponse = await response.json();
    return data.access_token;
  } catch (error) {
    console.error(`Error in getMpesaAccessToken: ${error}`);
    throw error;
  }
}

/**
 * Initiate STK Push to customer's phone
 */
export async function initiateSTKPush(
  phoneNumber: string,
  amount: number,
  accountReference: string,
  transactionDesc: string
): Promise<STKPushResponse> {
  const accessToken = await getMpesaAccessToken();
  
  const businessShortCode = Deno.env.get("MPESA_SHORTCODE") || "174379";
  const passkey = Deno.env.get("MPESA_PASSKEY") || "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
  const environment = Deno.env.get("MPESA_ENVIRONMENT") || "sandbox";
  const callbackUrl = Deno.env.get("MPESA_CALLBACK_URL") || "https://mydomain.com/callback";

  // Generate timestamp (YYYYMMDDHHmmss)
  const timestamp = new Date().toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);

  // Generate password: Base64(Shortcode + Passkey + Timestamp)
  const password = btoa(`${businessShortCode}${passkey}${timestamp}`);

  // Format phone number (remove + if present, ensure 254 prefix)
  const formattedPhone = phoneNumber.replace(/^\+/, "").replace(/^0/, "254");

  const stkUrl = environment === "production"
    ? "https://api.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
    : "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";

  const payload = {
    BusinessShortCode: businessShortCode,
    Password: password,
    Timestamp: timestamp,
    TransactionType: "CustomerBuyGoodsOnline",
    Amount: Math.ceil(amount), // Must be integer
    PartyA: formattedPhone,
    PartyB: businessShortCode,
    PhoneNumber: formattedPhone,
    CallBackURL: callbackUrl,
    AccountReference: accountReference,
    TransactionDesc: transactionDesc,
  };

  try {
    const response = await fetch(stkUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`M-Pesa STK Push error while initiating payment: ${response.status} ${response.statusText} - ${errorText}`);
      throw new Error(`Failed to initiate STK push: ${response.status} ${response.statusText}`);
    }

    const data: STKPushResponse = await response.json();
    
    // Check if request was successful
    if (data.ResponseCode !== "0") {
      console.error(`M-Pesa STK Push returned error code during initiation: ${data.ResponseCode} - ${data.ResponseDescription}`);
      throw new Error(data.CustomerMessage || data.ResponseDescription);
    }

    return data;
  } catch (error) {
    console.error(`Error in initiateSTKPush: ${error}`);
    throw error;
  }
}

/**
 * Query STK Push transaction status
 */
export async function querySTKPushStatus(checkoutRequestId: string): Promise<STKQueryResponse> {
  const accessToken = await getMpesaAccessToken();
  
  const businessShortCode = Deno.env.get("MPESA_SHORTCODE") || "174379";
  const passkey = Deno.env.get("MPESA_PASSKEY") || "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919";
  const environment = Deno.env.get("MPESA_ENVIRONMENT") || "sandbox";

  // Generate timestamp
  const timestamp = new Date().toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);

  // Generate password
  const password = btoa(`${businessShortCode}${passkey}${timestamp}`);

  const queryUrl = environment === "production"
    ? "https://api.safaricom.co.ke/mpesa/stkpushquery/v1/query"
    : "https://sandbox.safaricom.co.ke/mpesa/stkpushquery/v1/query";

  const payload = {
    BusinessShortCode: businessShortCode,
    Password: password,
    Timestamp: timestamp,
    CheckoutRequestID: checkoutRequestId,
  };

  try {
    const response = await fetch(queryUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`M-Pesa query error while checking transaction status: ${response.status} ${response.statusText} - ${errorText}`);
      throw new Error(`Failed to query STK push status: ${response.status} ${response.statusText}`);
    }

    const data: STKQueryResponse = await response.json();
    return data;
  } catch (error) {
    console.error(`Error in querySTKPushStatus: ${error}`);
    throw error;
  }
}

/**
 * Validate phone number format
 */
export function isValidKenyanPhone(phone: string): boolean {
  // Remove spaces, dashes, and plus signs
  const cleaned = phone.replace(/[\s\-+]/g, "");
  
  // Must be 12 digits starting with 254, or 10 digits starting with 0
  const pattern254 = /^254[17]\d{8}$/;
  const pattern0 = /^0[17]\d{8}$/;
  
  return pattern254.test(cleaned) || pattern0.test(cleaned);
}
