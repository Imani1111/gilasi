# M-Pesa Integration Architecture

## Complete Payment Flow

```
┌─────────────────────────────────────────────────────────────────┐
│                     GilasiShop Payment Flow                     │
└─────────────────────────────────────────────────────────────────┘

Step 1: User Initiates Payment
┌──────────────┐
│   Customer   │  Clicks "Pay via M-Pesa"
│   Browser    │  Enters: 254XXXXXXXXX
└──────┬───────┘  Amount: KSh 1,500
       │
       │ HTTPS POST Request
       │ Body: { phoneNumber, amount, accountReference }
       │ Headers: { Authorization: Bearer <publicAnonKey> }
       │
       ▼
┌────────────────────────────────────────────────────────────────┐
│              Supabase Edge Function (Backend)                  │
│  https://iwvonsyxjhbzycrvkuuu.supabase.co/functions/v1/       │
│              make-server-cce144c0/mpesa/stk-push               │
├────────────────────────────────────────────────────────────────┤
│  1. Validates phone number format                              │
│  2. Reads credentials from environment:                        │
│     - MPESA_CONSUMER_KEY                                       │
│     - MPESA_CONSUMER_SECRET                                    │
│  3. Gets OAuth access token from Safaricom                     │
│  4. Generates password (Base64 encode)                         │
│  5. Calls Safaricom STK Push API                               │
└────────┬───────────────────────────────────────────────────────┘
         │
         │ OAuth Request
         │ Authorization: Basic <Base64(key:secret)>
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│           Safaricom Daraja API (Sandbox/Production)             │
│       https://sandbox.safaricom.co.ke/oauth/v1/generate         │
├─────────────────────────────────────────────────────────────────┤
│  Returns: { access_token: "xyz...", expires_in: "3599" }       │
└────────┬────────────────────────────────────────────────────────┘
         │
         │ access_token
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│           Safaricom STK Push API                                │
│    https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/process    │
├─────────────────────────────────────────────────────────────────┤
│  POST {                                                         │
│    BusinessShortCode: "174379",                                 │
│    Password: "base64(shortcode+passkey+timestamp)",             │
│    Timestamp: "20260307143022",                                 │
│    Amount: 1500,                                                │
│    PhoneNumber: "254712345678",                                 │
│    CallBackURL: "https://...callback"                           │
│  }                                                              │
│                                                                 │
│  Returns: {                                                     │
│    CheckoutRequestID: "ws_CO_DMZ_123...",                       │
│    ResponseCode: "0",                                           │
│    CustomerMessage: "Success. Request accepted"                 │
│  }                                                              │
└────────┬────────────────────────────────────────────────────────┘
         │
         │ Sends STK Push to phone
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Customer's Phone                             │
│                  M-Pesa STK Prompt                              │
├─────────────────────────────────────────────────────────────────┤
│  ┌──────────────────────────────────────┐                      │
│  │  M-PESA                               │                      │
│  │  Enter M-PESA PIN to pay:             │                      │
│  │  KSh 1,500 to GilasiShop              │                      │
│  │                                        │                      │
│  │  [1] [2] [3] [4]                       │                      │
│  │                                        │                      │
│  │  [ Accept ]        [ Cancel ]          │                      │
│  └──────────────────────────────────────┘                      │
│                                                                 │
│  User enters PIN and confirms                                   │
└────────┬────────────────────────────────────────────────────────┘
         │
         │ User confirms payment
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│              Safaricom Processes Payment                        │
└────────┬────────────────────────────────────────────────────────┘
         │
         │ Payment result sent to callback URL
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│              Backend Callback Endpoint                          │
│     /make-server-cce144c0/mpesa/callback                        │
├─────────────────────────────────────────────────────────────────┤
│  Receives: {                                                    │
│    Body: {                                                      │
│      stkCallback: {                                             │
│        CheckoutRequestID: "ws_CO_DMZ_123...",                   │
│        ResultCode: "0",                                         │
│        ResultDesc: "Success",                                   │
│        CallbackMetadata: { ... }                                │
│      }                                                          │
│    }                                                            │
│  }                                                              │
│                                                                 │
│  Stores in KV Store for later retrieval                         │
└────────┬────────────────────────────────────────────────────────┘
         │
         │ Frontend polls status
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│           Frontend Status Query                                 │
│     POST /make-server-cce144c0/mpesa/stk-query                  │
├─────────────────────────────────────────────────────────────────┤
│  Every 3 seconds, frontend checks:                              │
│  { checkoutRequestId: "ws_CO_DMZ_123..." }                      │
│                                                                 │
│  Returns: {                                                     │
│    ResultCode: "0" = Success                                    │
│    ResultCode: "1032" = Cancelled by user                       │
│    ResultCode: "1037" = Timeout                                 │
│  }                                                              │
└────────┬────────────────────────────────────────────────────────┘
         │
         │ Success!
         │
         ▼
┌─────────────────────────────────────────────────────────────────┐
│              Payment Complete!                                  │
│                                                                 │
│  ✅ Customer sees success message                               │
│  ✅ Cart is cleared (if cart checkout)                          │
│  ✅ SMS confirmation sent to customer                           │
│  ✅ Redirect to "Continue Shopping"                             │
└─────────────────────────────────────────────────────────────────┘
```

---

## Security Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      Security Layers                            │
└─────────────────────────────────────────────────────────────────┘

Frontend (Browser)
├── ❌ NO access to consumer key/secret
├── ✅ Only has publicAnonKey (safe to expose)
├── ✅ Sends payment requests via HTTPS
└── ✅ Displays user-facing information only

           │
           │ HTTPS
           ▼

Supabase Edge Function (Backend)
├── ✅ Reads secrets from Deno.env (secure)
├── ✅ Validates all inputs
├── ✅ Handles OAuth with Safaricom
├── ✅ Never exposes credentials to frontend
├── ✅ Logs all transactions
└── ✅ Stores sensitive data in KV store

           │
           │ HTTPS + OAuth
           ▼

Safaricom Daraja API
├── ✅ Validates OAuth token
├── ✅ Processes payment securely
├── ✅ Sends callback to registered URL
└── ✅ Returns transaction results
```

---

## Environment Variables Flow

```
┌─────────────────────────────────────────────────────────────────┐
│          Where Credentials Are Stored & Used                    │
└─────────────────────────────────────────────────────────────────┘

Supabase Dashboard (You set these once)
┌──────────────────────────────────────────────────────┐
│  Project Settings → Edge Functions → Secrets         │
│                                                      │
│  ✅ MPESA_CONSUMER_KEY                               │
│  ✅ MPESA_CONSUMER_SECRET                            │
│  ✅ MPESA_SHORTCODE (optional)                       │
│  ✅ MPESA_PASSKEY (optional)                         │
│  ✅ MPESA_ENVIRONMENT (optional)                     │
│  ✅ MPESA_CALLBACK_URL (optional)                    │
└──────────────────┬───────────────────────────────────┘
                   │
                   │ Injected securely at runtime
                   ▼
Edge Function Runtime (Deno)
┌──────────────────────────────────────────────────────┐
│  const key = Deno.env.get("MPESA_CONSUMER_KEY")      │
│  const secret = Deno.env.get("MPESA_CONSUMER_SECRET")│
│                                                      │
│  ✅ Only accessible in backend code                  │
│  ✅ Never sent to frontend                           │
│  ✅ Used only for Safaricom API calls                │
└──────────────────────────────────────────────────────┘
```

---

## File Structure

```
GilasiShop/
│
├── Frontend (React)
│   ├── /src/app/pages/Payment.tsx
│   │   └── Calls backend API, displays UI
│   │
│   └── /src/app/context/AppContext.tsx
│       └── Manages cart state
│
├── Backend (Supabase Edge Functions)
│   ├── /supabase/functions/server/index.tsx
│   │   ├── Route: POST /mpesa/stk-push
│   │   ├── Route: POST /mpesa/stk-query
│   │   ├── Route: POST /mpesa/callback
│   │   └── Route: GET /mpesa/callback/:id
│   │
│   ├── /supabase/functions/server/mpesa.tsx
│   │   ├── getMpesaAccessToken()
│   │   ├── initiateSTKPush()
│   │   ├── querySTKPushStatus()
│   │   └── isValidKenyanPhone()
│   │
│   └── /supabase/functions/server/kv_store.tsx
│       └── Stores callback data
│
├── Configuration
│   ├── /MPESA_SETUP.md
│   │   └── Complete setup guide
│   │
│   ├── /QUICK_START_MPESA.md
│   │   └── Quick start instructions
│   │
│   └── /mpesa-credentials.config.ts
│       └── Your credentials reference
│
└── /utils/supabase/info.tsx
    ├── projectId: "iwvonsyxjhbzycrvkuuu"
    └── publicAnonKey: "eyJh..."
```

---

## API Response Codes

### M-Pesa Result Codes

| Code | Meaning | Action |
|------|---------|--------|
| `0` | Success | Show success message |
| `1032` | User cancelled | Show "Payment cancelled" |
| `1037` | Timeout | Show "Request timeout" |
| `1` | Insufficient funds | Show error message |
| `2001` | Invalid credentials | Check environment variables |

### HTTP Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| `200` | Success | Payment initiated successfully |
| `400` | Bad Request | Invalid phone number format |
| `401` | Unauthorized | Missing authorization header |
| `500` | Server Error | M-Pesa API connection failed |

---

## Testing Checklist

### Before Testing
- [ ] Added `MPESA_CONSUMER_KEY` to Supabase
- [ ] Added `MPESA_CONSUMER_SECRET` to Supabase
- [ ] Edge Functions are deployed/restarted
- [ ] Opened browser console (F12) for logs

### Test Scenarios

#### ✅ Successful Payment
1. Phone: `254708374149`
2. Amount: Any positive number
3. Expected: Success after 3 seconds

#### ❌ Invalid Phone Number
1. Phone: `123456789` (wrong format)
2. Expected: Validation error shown

#### ⏱️ Timeout Simulation
1. Phone: `254711222333` (timeout test number)
2. Expected: Timeout message after 30 seconds

---

## Production Deployment

When going live:

1. **Get Production Credentials**
   - Apply at https://developer.safaricom.co.ke
   - Complete KYC verification
   - Get approved shortcode

2. **Update Environment Variables**
   ```
   MPESA_CONSUMER_KEY=<production_key>
   MPESA_CONSUMER_SECRET=<production_secret>
   MPESA_SHORTCODE=<your_shortcode>
   MPESA_PASSKEY=<your_passkey>
   MPESA_ENVIRONMENT=production
   ```

3. **Register Callback URL**
   - Go to Daraja Portal
   - Register: `https://iwvonsyxjhbzycrvkuuu.supabase.co/functions/v1/make-server-cce144c0/mpesa/callback`

4. **Test with Real Money**
   - Use small amounts (KSh 1) first
   - Verify callbacks are received
   - Check transaction logs

---

**This is your complete M-Pesa integration architecture!** 🎉
