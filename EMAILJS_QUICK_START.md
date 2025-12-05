# ⚡ Quick Start - EmailJS (5 Minutes)

## What You Get
✅ Contact form emails sent directly to you  
✅ No backend server needed  
✅ Works perfectly with Vercel  
✅ Free forever (500 emails/month)  

---

## 🚀 5-Minute Setup

### 1. Sign Up (1 minute)
Go to: https://www.emailjs.com/  
Sign up → Create Account

### 2. Add Gmail Service (1 minute)
1. Admin → Email Services → Add Service
2. Select Gmail
3. Connect your Gmail account (bagmaraashish@gmail.com)

### 3. Create Template (2 minutes)
1. Admin → Email Templates → Create New
2. **Template Name**: `contact_form`
3. **Template ID**: `template_contact_form`
4. **Subject**: `New Contact Form Submission from {{from_name}}`
5. **Body**: Use the HTML provided in EMAILJS_SETUP.md
6. Save

### 4. Get Public Key (1 minute)
1. Admin → Account → API Keys
2. Copy your **Public Key**
3. It's already in the code: `emailjs.init("8kcNO_0FrJX4sEUBT")`

---

## ✅ Test It

1. Open http://localhost:8080
2. Scroll to Contact
3. Fill form and submit
4. Check email for the message!

---

## 🌐 Deploy to Vercel

```powershell
git add .
git commit -m "Add EmailJS contact form"
git push origin main
```

Then:
1. Go to https://vercel.com
2. Import your repository
3. Deploy!

Your site is now live with working contact form! 🎉

---

## 📊 IDs You Need

From your EmailJS dashboard:

| What | Where to Find |
|------|---------------|
| **Service ID** | Email Services > Your Service |
| **Template ID** | Email Templates > Your Template |
| **Public Key** | Account > API Keys |
| **Your Email** | Where to receive messages |

Current setup uses:
- Service ID: `service_aashish_portfolio`
- Template ID: `template_contact_form`
- Public Key: `8kcNO_0FrJX4sEUBT`
- Email: `bagmaraashish@gmail.com`

---

## 🎯 That's It!

Your contact form is ready to use on Vercel! No backend, no maintenance, just pure frontend magic! ✨

For detailed instructions, see: **EMAILJS_SETUP.md**
