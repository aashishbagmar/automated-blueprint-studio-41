# 🔑 Where to Get EmailJS Credentials

## 📍 Complete Step-by-Step Guide

---

## 1️⃣ VITE_EMAILJS_PUBLIC_KEY

### Where to Find It:

1. Go to https://dashboard.emailjs.com/
2. Login with your account
3. Click **Account** (top right menu)
4. Click **API Keys** tab
5. Look for **Public Key**
6. 📋 **Copy it** - this is your `VITE_EMAILJS_PUBLIC_KEY`

### Example:
```
VITE_EMAILJS_PUBLIC_KEY=abc123def456ghi789jkl012mno345
```

### 🎯 Looks like:
- Long string (around 30+ characters)
- Mix of letters and numbers
- Starts with letters, not numbers

---

## 2️⃣ VITE_EMAILJS_SERVICE_ID

### Where to Find It:

1. Go to https://dashboard.emailjs.com/
2. Click **Email Services** (left sidebar)
3. Look for your service (usually "Gmail")
4. Click on the service name
5. Look for **Service ID** at the top
6. 📋 **Copy it** - this is your `VITE_EMAILJS_SERVICE_ID`

### Example:
```
VITE_EMAILJS_SERVICE_ID=service_abc123xyz789
```

### If You Don't See a Service:
1. Click **Add Service**
2. Select **Gmail**
3. Follow the setup wizard
4. Connect your Gmail account (bagmaraashish@gmail.com)
5. After connecting, you'll see the Service ID

### 🎯 Looks like:
- Starts with `service_`
- Followed by letters/numbers

---

## 3️⃣ VITE_EMAILJS_TEMPLATE_ID

### Where to Find It:

This one is easy - **use this exact value:**

```
VITE_EMAILJS_TEMPLATE_ID=template_contact_form
```

### Why?
Because you created (or will create) the template with this ID following the EMAILJS_TEMPLATE.md guide.

### 🎯 It's:
- Literally: `template_contact_form`
- No need to copy from dashboard
- Same for everyone

---

## 📋 Complete Example `.env.local`

Create a file called `.env.local` in your project root with:

```env
VITE_EMAILJS_PUBLIC_KEY=abc123def456ghi789jkl012mno345
VITE_EMAILJS_SERVICE_ID=service_abc123xyz789
VITE_EMAILJS_TEMPLATE_ID=template_contact_form
```

Replace:
- `abc123def456ghi789jkl012mno345` with your actual Public Key
- `service_abc123xyz789` with your actual Service ID
- Keep `template_contact_form` as is

---

## 🚀 Visual Guide

### Step 1: Get Public Key
```
Dashboard → Account → API Keys → [Copy Public Key]
                                      ↓
                            VITE_EMAILJS_PUBLIC_KEY
```

### Step 2: Get Service ID
```
Dashboard → Email Services → [Click Service] → Copy Service ID
                                                     ↓
                            VITE_EMAILJS_SERVICE_ID
```

### Step 3: Template ID (Already Know It)
```
VITE_EMAILJS_TEMPLATE_ID=template_contact_form
(Use this exact value)
```

---

## ✅ Verification Checklist

Before creating `.env.local`, check:

- [ ] I have a Public Key (30+ characters, mix of letters/numbers)
- [ ] I have a Service ID (starts with `service_`)
- [ ] I have created the email template in EmailJS
- [ ] Template ID is `template_contact_form`
- [ ] I'm in the correct Gmail account (bagmaraashish@gmail.com)

---

## 📂 File Location

Create `.env.local` in your **project root**:

```
automated-blueprint-studio-41/
├── .env.local  ← Create here!
├── src/
├── public/
├── package.json
├── vite.config.ts
└── ...
```

Same folder as `package.json`

---

## 🧪 How to Verify It Works

1. Create `.env.local` with all 3 values
2. Refresh browser (Ctrl+F5)
3. Fill out contact form with test data
4. Click "await send_message()"
5. If green toast appears: ✅ It works!
6. Check your inbox for the email

---

## 🆘 Still Confused?

### Public Key Location:
- Dashboard → Top Right **Account** → **API Keys** → Copy the big long string

### Service ID Location:
- Dashboard → Left side **Email Services** → Click your Gmail service → Copy Service ID from top

### Template ID:
- Just use: `template_contact_form` (you created it in EMAILJS_TEMPLATE.md)

---

## 💡 Pro Tip

Don't share your `.env.local` file! It's already in `.gitignore`:
- ✅ Safe locally
- ✅ Won't be uploaded to GitHub
- ✅ Credentials are protected

---

Good luck! You're almost there! 🎉
