/**
 * M-Pesa Configuration File
 * 
 * THIS FILE CONTAINS YOUR M-PESA CREDENTIALS
 * DO NOT COMMIT THIS FILE TO PUBLIC REPOSITORIES
 * 
 * Instructions:
 * 1. Copy these values
 * 2. Go to Supabase Dashboard: https://supabase.com/dashboard
 * 3. Select your project (iwvonsyxjhbzycrvkuuu)
 * 4. Navigate to: Settings > Edge Functions > Secrets
 * 5. Add each secret using the name and value below
 */

export const MPESA_CONFIG = {
  // Required: Your Safaricom Daraja API Consumer Key
  MPESA_CONSUMER_KEY: "aU3p0fXU9bW7AGkMk2pI180fugBaFJxzDKNPNx7OGu5awGll",

  // Required: Your Safaricom Daraja API Consumer Secret  
  MPESA_CONSUMER_SECRET: "7XCAy4Lrap1SSGZx0GwZ6zKVe1rljNKD5LLbTdNmUTmZUwobY9S9AAUowd0t1lIA",

  // Optional: Business Shortcode (defaults to sandbox: 174379)
  MPESA_SHORTCODE: "174379",

  // Optional: Lipa Na M-Pesa Passkey (defaults to sandbox passkey)
  MPESA_PASSKEY: "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919",

  // Optional: Environment (sandbox or production)
  MPESA_ENVIRONMENT: "sandbox",

  // Optional: Callback URL for payment confirmations
  MPESA_CALLBACK_URL: "https://iwvonsyxjhbzycrvkuuu.supabase.co/functions/v1/make-server-cce144c0/mpesa/callback"
};

/**
 * IMPORTANT NOTES:
 * 
 * 1. SANDBOX vs PRODUCTION:
 *    - Current credentials are for SANDBOX (testing only)
 *    - No real money will be charged in sandbox mode
 *    - Use test phone: 254708374149 for successful payments
 * 
 * 2. ADDING TO SUPABASE:
 *    You MUST add these as environment variables in Supabase:
 *    - Go to Supabase Dashboard
 *    - Project Settings > Edge Functions > Secrets
 *    - Add each variable name and value
 *    - Redeploy your Edge Functions
 * 
 * 3. GOING LIVE:
 *    When ready for production:
 *    - Apply for production access at https://developer.safaricom.co.ke
 *    - Complete KYC verification
 *    - Get production credentials
 *    - Update all environment variables with production values
 *    - Change MPESA_ENVIRONMENT to "production"
 * 
 * 4. SECURITY:
 *    - Never share these credentials publicly
 *    - Never commit them to GitHub or public repos
 *    - Only store them in Supabase environment variables
 *    - The backend (server) reads them securely from Deno.env
 * 
 * 5. TESTING:
 *    After adding credentials to Supabase:
 *    - Visit your app's payment page
 *    - Enter phone: 254708374149 (sandbox test number)
 *    - Click "Pay via M-Pesa"
 *    - STK push will be simulated (sandbox won't send to real phone)
 *    - Payment should complete successfully after 3 seconds
 */

// Quick Copy-Paste for Supabase CLI:
/*
supabase secrets set MPESA_CONSUMER_KEY=aU3p0fXU9bW7AGkMk2pI180fugBaFJxzDKNPNx7OGu5awGll
supabase secrets set MPESA_CONSUMER_SECRET=7XCAy4Lrap1SSGZx0GwZ6zKVe1rljNKD5LLbTdNmUTmZUwobY9S9AAUowd0t1lIA
supabase secrets set MPESA_SHORTCODE=174379
supabase secrets set MPESA_PASSKEY=bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919
supabase secrets set MPESA_ENVIRONMENT=sandbox
supabase secrets set MPESA_CALLBACK_URL=https://iwvonsyxjhbzycrvkuuu.supabase.co/functions/v1/make-server-cce144c0/mpesa/callback
*/
