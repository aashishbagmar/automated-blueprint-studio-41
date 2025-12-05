# 🚀 EmailJS Setup - Complete Guide (No Coding!)

## ⚠️ Current Error

You're seeing this error because EmailJS credentials are not configured yet. Let's fix it in 10 minutes!

---

## 📋 What You Need to Do

### Step 1: Create EmailJS Account (2 minutes)

1. Go to: **https://www.emailjs.com/**
2. Click **Sign Up**
3. Enter your email: **bagmaraashish@gmail.com**
4. Create password and account
5. **Verify your email** (check inbox)

### Step 2: Set Up Gmail Service (3 minutes)

1. Log in to https://dashboard.emailjs.com/
2. Click **Email Services** on the left
3. Click **Add Service**
4. Select **Gmail**
5. Click **Create Service**
6. In the popup, **connect your Gmail account** (bagmaraashish@gmail.com)
7. Grant permissions
8. **Copy your Service ID** (looks like: `service_a1b2c3d4e5f6g7h8`)
9. **Save it somewhere safe** - you'll need it next

### Step 3: Create Email Template (3 minutes)

1. Click **Email Templates** on the left
2. Click **Create New Template**
3. Fill in these exact values:

**Template Name:** 
```
contact_form
```

**Template ID:** 
```
template_contact_form
```

4. Delete the default content and add this **Subject:**
```
New Contact Form Submission from {{from_name}}
```

5. In **HTML Content**, paste this:
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        * { margin: 0; padding: 0; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 10px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.1); }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; }
        .header h1 { font-size: 28px; margin-bottom: 5px; }
        .content { padding: 30px; }
        .field { margin-bottom: 25px; }
        .label { font-weight: 600; color: #333; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; color: #667eea; }
        .value { background: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #667eea; color: #333; font-size: 15px; word-break: break-word; }
        .divider { height: 1px; background: #e0e0e0; margin: 30px 0; }
        .footer { background: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #e0e0e0; }
        .reply-hint { color: #667eea; font-style: italic; margin-top: 15px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📧 New Message Received</h1>
            <p>Someone filled out your contact form</p>
        </div>
        
        <div class="content">
            <div class="field">
                <div class="label">👤 Name</div>
                <div class="value">{{from_name}}</div>
            </div>
            
            <div class="field">
                <div class="label">📧 Email</div>
                <div class="value">{{from_email}}</div>
            </div>
            
            <div class="field">
                <div class="label">💬 Message</div>
                <div class="value">{{message}}</div>
            </div>
            
            <div class="reply-hint">
                ✉️ You can reply directly to this email to contact the sender.
            </div>
            
            <div class="divider"></div>
        </div>
        
        <div class="footer">
            <p>Message from your portfolio contact form</p>
            <p>Aashish Bagmar's Portfolio</p>
        </div>
    </div>
</body>
</html>
```

6. Click **Save**

### Step 4: Get Your Public Key (2 minutes)

1. Click **Account** on the left menu
2. Click **API Keys**
3. Under "Public Key", click the copy button
4. **Save this key somewhere** - you'll need it next

---

## 📝 Update Your Code

Now you have 3 values:
- **Service ID** (from Step 2)
- **Template ID** = `template_contact_form`
- **Public Key** (from Step 4)

### Create `.env.local` File

In your project root, create a new file called:
```
.env.local
```

Add these lines (replace with YOUR actual values):

```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=template_contact_form
```

**Where to get these:**
- **Public Key**: From EmailJS Account → API Keys
- **Service ID**: From EmailJS Email Services → Your Gmail Service
- **Template ID**: Exactly as typed above: `template_contact_form`

### Example (with fake values):
```env
VITE_EMAILJS_PUBLIC_KEY=8kcNO_0FrJX4sEUBT2nH8m9pQ3rS4t5u
VITE_EMAILJS_SERVICE_ID=service_a1b2c3d4e5f6g7h8
VITE_EMAILJS_TEMPLATE_ID=template_contact_form
```

---

## ✅ Test It

1. **Refresh your browser** (Ctrl+F5 or Cmd+Shift+R)
2. Go to http://localhost:8080
3. Scroll to **Contact Section**
4. Fill in the form:
   - Name: Your name
   - Email: Your email
   - Message: Test message (at least 10 chars)
5. Click **await send_message()**
6. ✅ You should see **"Message sent!"**
7. Check your email inbox for the message!

---

## 🎉 Done!

Your contact form now works! You can:
- ✅ Test locally
- ✅ Deploy to Vercel
- ✅ Receive emails in Gmail
- ✅ Reply to messages

---

## 🚀 Deploy to Vercel

When you deploy to Vercel, add environment variables:

1. Go to https://vercel.com
2. Select your project
3. Go to **Settings** → **Environment Variables**
4. Add these 3 variables:
   - `VITE_EMAILJS_PUBLIC_KEY` = your public key
   - `VITE_EMAILJS_SERVICE_ID` = your service id
   - `VITE_EMAILJS_TEMPLATE_ID` = template_contact_form
5. Redeploy

---

## 🆘 Troubleshooting

### Error: "Configuration Error"
**Cause:** .env.local file not created or values missing  
**Fix:** Create .env.local with all 3 values

### Error: "Failed to send message"
**Cause:** Wrong Service ID or Template ID  
**Fix:** Double-check values in EmailJS dashboard

### No email received
**Cause:** Gmail service not authenticated  
**Fix:** Go to EmailJS → Email Services → Check Gmail is connected

### Can't find API Key
**Go to:** https://dashboard.emailjs.com/  
**Click:** Account → API Keys → Copy Public Key

---

## 📊 Reference

| What | Where to Find |
|------|---------------|
| **Public Key** | https://dashboard.emailjs.com/ → Account → API Keys |
| **Service ID** | https://dashboard.emailjs.com/ → Email Services → Your Service |
| **Template ID** | `template_contact_form` (exact value) |

---

## ✨ What Happens Next

When someone fills your form:
1. ✅ They click "await send_message()"
2. ✅ Message sent to your email instantly
3. ✅ You see beautiful formatted email
4. ✅ You can reply directly
5. ✅ Perfect! 🎉

---

## 💡 Pro Tips

- **Test with fake data first** before sharing form
- **Check spam folder** if email doesn't arrive
- **One template works for all forms** - reusable!
- **Free plan = 500 emails/month** - plenty for portfolio
- **No coding skills needed** to set up!

---

## 🔒 Security Notes

- ✅ Public Key is **safe to share** (it's public!)
- ❌ Secret Key should **NEVER** be in frontend code
- ✅ EmailJS handles security for you
- ✅ No passwords stored anywhere

---

## 📞 Need Help?

**EmailJS Support:**
- Docs: https://www.emailjs.com/docs/
- Status: https://status.emailjs.com/

**Your Email:**
- bagmaraashish@gmail.com

---

**You're all set!** Your contact form is ready to go! 🚀

Once this works, you can deploy to Vercel with confidence! ✨
