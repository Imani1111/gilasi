# M-Pesa Integration Setup Guide

## Overview
Your GilasiShop app now has a complete M-Pesa STK Push integration using Safaricom's Daraja API. The backend is implemented in Supabase Edge Functions, keeping your credentials secure.

## 🔐 Required Environment Variables

You need to add the following environment variables to your Supabase project:

### 1. **MPESA_CONSUMER_KEY** (Required)
```
aU3p0fXU9bW7AGkMk2pI180fugBaFJxzDKNPNx7OGu5awGll
```

### 2. **MPESA_CONSUMER_SECRET** (Required)
```
7XCAy4Lrap1SSGZx0GwZ6zKVe1rljNKD5LLbTdNmUTmZUwobY9S9AAUowd0t1lIA
```

### 3. **MPESA_SHORTCODE** (Optional - defaults to sandbox)
```
174379
```
*This is the Safaricom sandbox shortcode. Replace with your production shortcode when going live.*

### 4. **MPESA_PASSKEY** (Optional - defaults to sandbox)
```
bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919
```
*This is the Safaricom sandbox passkey. Replace with your production passkey when going live.*

### 5. **MPESA_ENVIRONMENT** (Optional - defaults to "sandbox")
```
sandbox
```
*Change to "production" when deploying to live.*

### 6. **MPESA_CALLBACK_URL** (Optional - defaults to a placeholder)
```
https://YOUR_DOMAIN.com/callback
```
*Replace with your actual callback URL. For this project, you can use:*
```
https://iwvonsyxjhbzycrvkuuu.supabase.co/functions/v1/make-server-cce144c0/mpesa/callback
```

---

## 📝 How to Add Environment Variables to Supabase

### Step 1: Access Supabase Dashboard
1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project: **iwvonsyxjhbzycrvkuuu**

### Step 2: Navigate to Edge Functions Settings
1. Click on **Edge Functions** in the left sidebar
2. Click on the **make-server** function (or your server function)
3. Click on **Settings** or **Secrets** tab

### Step 3: Add Each Secret
For each environment variable:
1. Click **Add Secret** or **New Secret**
2. Enter the **Name** (e.g., `MPESA_CONSUMER_KEY`)
3. Enter the **Value** (copy from the values above)
4. Click **Save**

### Alternative Method: Using Supabase CLI
If you have Supabase CLI installed, you can set secrets using:

```bash
# Set consumer key
supabase secrets set MPESA_CONSUMER_KEY=aU3p0fXU9bW7AGkMk2pI180fugBaFJxzDKNPNx7OGu5awGll

# Set consumer secret
supabase secrets set MPESA_CONSUMER_SECRET=7XCAy4Lrap1SSGZx0GwZ6zKVe1rljNKD5LLbTdNmUTmZUwobY9S9AAUowd0t1lIA

# Set shortcode (optional)
supabase secrets set MPESA_SHORTCODE=174379

# Set passkey (optional)
supabase secrets set MPESA_PASSKEY=bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919

# Set environment (optional)
supabase secrets set MPESA_ENVIRONMENT=sandbox

# Set callback URL (optional)
supabase secrets set MPESA_CALLBACK_URL=https://iwvonsyxjhbzycrvkuuu.supabase.co/functions/v1/make-server-cce144c0/mpesa/callback
```

---

## 🚀 Backend API Endpoints

Your M-Pesa backend exposes the following endpoints:

### 1. Initiate STK Push
**Endpoint:** `POST /make-server-cce144c0/mpesa/stk-push`

**Request Body:**
```json
{
  "phoneNumber": "254712345678",
  "amount": 1500,
  "accountReference": "ORDER123",
  "transactionDesc": "GilasiShop Purchase"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "merchantRequestId": "...",
    "checkoutRequestId": "...",
    "responseCode": "0",
    "responseDescription": "Success. Request accepted for processing",
    "customerMessage": "Success. Request accepted for processing"
  }
}
```

### 2. Query Payment Status
**Endpoint:** `POST /make-server-cce144c0/mpesa/stk-query`

**Request Body:**
```json
{
  "checkoutRequestId": "ws_CO_DMZ_123456789_12345678"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "responseCode": "0",
    "resultCode": "0",
    "resultDesc": "The service request is processed successfully."
  }
}
```

### 3. M-Pesa Callback (Webhook)
**Endpoint:** `POST /make-server-cce144c0/mpesa/callback`

This endpoint receives payment confirmations from Safaricom. The data is stored in the key-value store.

### 4. Get Callback Data
**Endpoint:** `GET /make-server-cce144c0/mpesa/callback/:checkoutRequestId`

Retrieve stored callback data for a specific checkout request.

---

## 🧪 Testing with Sandbox

The credentials you provided are for the **Safaricom Sandbox environment**. This means:

- ✅ No real money will be charged
- ✅ You can test the full STK Push flow
- ✅ Use test phone numbers provided by Safaricom
- ✅ The payment will simulate success/failure scenarios

### Sandbox Test Numbers
Use these test phone numbers (as per Safaricom documentation):
- **254708374149** - For testing success scenarios
- **254711222333** - For testing timeout scenarios

---

## 🔄 Going Live (Production)

When you're ready to accept real payments:

1. **Get Production Credentials:**
   - Apply for M-Pesa production access via [Daraja Portal](https://developer.safaricom.co.ke/)
   - Complete KYC verification
   - Get your production Consumer Key, Consumer Secret, Shortcode, and Passkey

2. **Update Environment Variables:**
   - Replace `MPESA_CONSUMER_KEY` with production key
   - Replace `MPESA_CONSUMER_SECRET` with production secret
   - Replace `MPESA_SHORTCODE` with your production shortcode
   - Replace `MPESA_PASSKEY` with your production passkey
   - Set `MPESA_ENVIRONMENT=production`

3. **Configure Callback URL:**
   - Register your callback URL in the Daraja Portal:
     ```
     https://iwvonsyxjhbzycrvkuuu.supabase.co/functions/v1/make-server-cce144c0/mpesa/callback
     ```

4. **Important Security Notes:**
   - ⚠️ **Never** commit credentials to version control
   - ⚠️ Keep environment variables secure
   - ⚠️ Monitor your M-Pesa transactions regularly
   - ⚠️ Implement proper error handling and logging

---

## 📱 Frontend Integration

The Payment page (`/src/app/pages/Payment.tsx`) is already configured to:
- ✅ Connect to your M-Pesa backend
- ✅ Validate phone numbers (254 format)
- ✅ Show real-time STK Push status
- ✅ Handle success/failure scenarios
- ✅ Clear cart on successful payment

---

## 🛠️ Troubleshooting

### "M-Pesa credentials not configured" Error
- Make sure you've added `MPESA_CONSUMER_KEY` and `MPESA_CONSUMER_SECRET` to Supabase secrets
- Restart your Edge Functions after adding secrets

### STK Push Not Received on Phone
- Verify phone number format: `254XXXXXXXXX`
- Check if you're using a valid Safaricom number
- In sandbox, use the test numbers provided

### Payment Status Query Returns Error
- The status query may take a few seconds after STK push
- In sandbox mode, not all status queries work perfectly
- Check the callback endpoint for actual payment confirmation

### Callback Not Received
- Ensure your callback URL is publicly accessible
- Safaricom sends callbacks to the registered URL
- Check Supabase logs for incoming callback requests

---

## 📊 Architecture Overview

```
┌─────────────┐
│   Frontend  │
│  (React)    │
└──────┬──────┘
       │
       │ HTTPS Request
       │ (with publicAnonKey)
       ▼
┌─────────────────────┐
│  Supabase Edge      │
│  Function (Hono)    │
│  /mpesa/stk-push    │
└──────┬──────────────┘
       │
       │ OAuth + STK Push
       │ (with credentials)
       ▼
┌─────────────────────┐
│  Safaricom Daraja   │
│  API                │
└──────┬──────────────┘
       │
       │ STK Push to Phone
       ▼
┌─────────────────────┐
│  Customer's Phone   │
│  (M-Pesa Prompt)    │
└─────────────────────┘
```

---

## ✅ Quick Start Checklist

- [ ] Add `MPESA_CONSUMER_KEY` to Supabase secrets
- [ ] Add `MPESA_CONSUMER_SECRET` to Supabase secrets
- [ ] (Optional) Add other M-Pesa environment variables
- [ ] Restart Supabase Edge Functions if needed
- [ ] Test payment flow with sandbox phone number (254708374149)
- [ ] Verify STK push is received on phone
- [ ] Check payment success/failure handling
- [ ] Review server logs for any errors

---

## 📞 Support

If you encounter issues:
1. Check Supabase Edge Function logs
2. Review browser console for errors
3. Verify all environment variables are set correctly
4. Consult [Safaricom Daraja Documentation](https://developer.safaricom.co.ke/Documentation)

---

**Your M-Pesa integration is ready! Just add the environment variables and start testing.** 🎉
