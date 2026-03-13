# 🔐 Environment Variables Setup

## Your M-Pesa credentials are stored in `.env` file

### ✅ What's Been Created

1. **`.env`** - Contains your actual M-Pesa credentials (already filled in)
2. **`.env.example`** - Template file for others to use
3. **`.gitignore`** - Ensures `.env` is never committed to Git

---

## 📋 Quick Reference

Your credentials in `.env`:

```bash
MPESA_CONSUMER_KEY=aU3p0fXU9bW7AGkMk2pI180fugBaFJxzDKNPNx7OGu5awGll
MPESA_CONSUMER_SECRET=7XCAy4Lrap1SSGZx0GwZ6zKVe1rljNKD5LLbTdNmUTmZUwobY9S9AAUowd0t1lIA
MPESA_SHORTCODE=174379
MPESA_PASSKEY=bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919
MPESA_ENVIRONMENT=sandbox
MPESA_CALLBACK_URL=https://iwvonsyxjhbzycrvkuuu.supabase.co/functions/v1/make-server-cce144c0/mpesa/callback
```

---

## ⚠️ IMPORTANT: You Still Need to Add to Supabase

The `.env` file is for your **local reference only**. The Supabase Edge Functions run in the cloud and need the credentials added to Supabase Dashboard.

### Add to Supabase Dashboard (Required)

1. **Go to:** https://supabase.com/dashboard
2. **Select project:** `iwvonsyxjhbzycrvkuuu`
3. **Navigate to:** Edge Functions → Secrets (or Project Settings → Edge Functions)
4. **Add these 2 required secrets:**

   **Secret 1:**
   ```
   Name:  MPESA_CONSUMER_KEY
   Value: aU3p0fXU9bW7AGkMk2pI180fugBaFJxzDKNPNx7OGu5awGll
   ```

   **Secret 2:**
   ```
   Name:  MPESA_CONSUMER_SECRET
   Value: 7XCAy4Lrap1SSGZx0GwZ6zKVe1rljNKD5LLbTdNmUTmZUwobY9S9AAUowd0t1lIA
   ```

5. **Click Save** for each one

---

## 🚀 Using Supabase CLI (Alternative Method)

If you have Supabase CLI installed, you can run these commands:

```bash
# Set all M-Pesa secrets at once
supabase secrets set MPESA_CONSUMER_KEY=aU3p0fXU9bW7AGkMk2pI180fugBaFJxzDKNPNx7OGu5awGll
supabase secrets set MPESA_CONSUMER_SECRET=7XCAy4Lrap1SSGZx0GwZ6zKVe1rljNKD5LLbTdNmUTmZUwobY9S9AAUowd0t1lIA
supabase secrets set MPESA_SHORTCODE=174379
supabase secrets set MPESA_PASSKEY=bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919
supabase secrets set MPESA_ENVIRONMENT=sandbox
supabase secrets set MPESA_CALLBACK_URL=https://iwvonsyxjhbzycrvkuuu.supabase.co/functions/v1/make-server-cce144c0/mpesa/callback
```

Or load from .env file automatically:
```bash
# Load all variables from .env
supabase secrets set --env-file .env
```

---

## 🔒 Security Best Practices

### ✅ DO:
- Keep `.env` file in your project root (it's in `.gitignore`)
- Add credentials to Supabase Dashboard
- Use `.env.example` as a template for team members
- Rotate credentials regularly
- Use different credentials for sandbox vs production

### ❌ DON'T:
- Never commit `.env` to Git/GitHub
- Never share `.env` file publicly
- Never hardcode credentials in code files
- Never use production credentials for testing

---

## 🧪 Testing After Setup

1. **Verify .env file exists:**
   ```bash
   cat .env
   ```

2. **Add secrets to Supabase** (see steps above)

3. **Test M-Pesa payment:**
   - Open your GilasiShop app
   - Go to Shop → Select product → Buy Now
   - Enter phone: `254708374149`
   - Click "Pay via M-Pesa"
   - Should succeed after 3 seconds

4. **Check logs:**
   - Open browser console (F12)
   - Look for: "STK Push initiated"
   - Check Supabase Edge Function logs

---

## 📂 File Structure

```
GilasiShop/
├── .env                    # ✅ Your actual credentials (gitignored)
├── .env.example            # ✅ Template for others
├── .gitignore              # ✅ Protects .env from being committed
├── MPESA_SETUP.md          # Complete setup guide
├── QUICK_START_MPESA.md    # Quick start guide
└── ENV_SETUP.md            # This file
```

---

## 🔄 Updating Credentials

### To Change Credentials:

1. **Update `.env` file** (local reference)
2. **Update Supabase Dashboard:**
   - Go to Edge Functions → Secrets
   - Edit existing secret or delete and re-add
3. **Restart Edge Functions** (usually automatic)

### When Going to Production:

1. Get production credentials from Safaricom
2. Update all values in `.env`:
   ```bash
   MPESA_CONSUMER_KEY=<production_key>
   MPESA_CONSUMER_SECRET=<production_secret>
   MPESA_SHORTCODE=<your_shortcode>
   MPESA_PASSKEY=<your_passkey>
   MPESA_ENVIRONMENT=production
   ```
3. Update the same in Supabase Dashboard
4. Test with small amounts first!

---

## 🆘 Troubleshooting

### "M-Pesa credentials not configured" Error
- ✅ Check `.env` file exists
- ✅ Verify credentials are added to Supabase Dashboard
- ✅ Restart Edge Functions
- ✅ Check secret names match exactly

### Can't Find Secrets in Supabase
- Try: **Project Settings** → **API** → **Secrets**
- Or: **Edge Functions** → Select function → **Secrets**
- Different projects may have different UI layouts

### Credentials Not Working
- Verify you copied the values exactly (no extra spaces)
- Check if credentials are for sandbox or production
- Ensure you're testing with correct phone format: `254XXXXXXXXX`

---

## 📞 Support Resources

- **Safaricom Daraja Portal:** https://developer.safaricom.co.ke
- **Supabase Docs:** https://supabase.com/docs
- **M-Pesa API Docs:** https://developer.safaricom.co.ke/Documentation

---

**Your `.env` file is ready! Now add the credentials to Supabase Dashboard and you're all set!** 🎉
