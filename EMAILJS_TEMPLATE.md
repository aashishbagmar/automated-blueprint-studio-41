# 📧 EmailJS Template Setup

## 🎯 Create Email Template in EmailJS Dashboard

Follow these steps to create the template that will format your emails:

---

## Step 1️⃣: Go to Email Templates

1. Login to https://dashboard.emailjs.com/
2. Click **Email Templates** in the left sidebar
3. Click **Create New Template**

---

## Step 2️⃣: Configure Template Details

### Template Name:
```
contact_form
```

### Template ID:
```
template_contact_form
```

> ⚠️ Make sure the Template ID matches exactly: `template_contact_form`

---

## Step 3️⃣: Configure Email Content

### Email Subject:
```
New Message from {{from_name}}
```

### Email Body (HTML):

Copy and paste this entire HTML into the **Content** section:

```html
<!DOCTYPE html>
<html>
  <head>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background: #f9f9f9;
        border-radius: 8px;
      }
      .header {
        background: linear-gradient(135deg, #00d4ff 0%, #0099cc 100%);
        color: white;
        padding: 20px;
        border-radius: 8px 8px 0 0;
        text-align: center;
      }
      .content {
        background: white;
        padding: 20px;
        border-left: 4px solid #00d4ff;
      }
      .field {
        margin-bottom: 15px;
      }
      .label {
        font-weight: bold;
        color: #00d4ff;
        display: block;
        margin-bottom: 5px;
      }
      .value {
        color: #333;
        padding: 10px;
        background: #f5f5f5;
        border-radius: 4px;
        word-break: break-word;
      }
      .footer {
        margin-top: 20px;
        padding-top: 15px;
        border-top: 1px solid #ddd;
        font-size: 12px;
        color: #666;
      }
      .reply-link {
        display: inline-block;
        margin-top: 15px;
        padding: 10px 20px;
        background: #00d4ff;
        color: white;
        text-decoration: none;
        border-radius: 4px;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>📬 New Contact Form Submission</h1>
      </div>
      <div class="content">
        <div class="field">
          <span class="label">From:</span>
          <span class="value">{{from_name}}</span>
        </div>
        <div class="field">
          <span class="label">Email:</span>
          <span class="value">
            <a href="mailto:{{from_email}}">{{from_email}}</a>
          </span>
        </div>
        <div class="field">
          <span class="label">Message:</span>
          <span class="value" style="white-space: pre-wrap;">{{message}}</span>
        </div>
        <div class="footer">
          <p>✅ This message was sent from your portfolio contact form</p>
          <p>
            <a href="mailto:{{reply_to}}" class="reply-link">Reply to {{from_name}}</a>
          </p>
        </div>
      </div>
    </div>
  </body>
</html>
```

---

## Step 4️⃣: Verify Template Variables

The template uses these variables (they come from your ContactSection.tsx):

| Variable | Source | Description |
|----------|--------|-------------|
| `{{from_name}}` | `formData.name` | Visitor's name |
| `{{from_email}}` | `formData.email` | Visitor's email |
| `{{message}}` | `formData.message` | Visitor's message |
| `{{reply_to}}` | `formData.email` | Email to reply to |
| `{{to_email}}` | `"bagmaraashish@gmail.com"` | Your email (hardcoded) |

---

## Step 5️⃣: Save Template

1. Click **Save** button
2. You should see: ✅ "Template saved successfully"
3. Template ID should show: `template_contact_form`

---

## ✅ You're Done!

Your EmailJS template is now ready. Now you need to:

1. ✅ **Service ID** - From Email Services (VITE_EMAILJS_SERVICE_ID)
2. ✅ **Template ID** - From this guide (template_contact_form)
3. ✅ **Public Key** - From Account → API Keys (VITE_EMAILJS_PUBLIC_KEY)

Create `.env.local` with:
```env
VITE_EMAILJS_PUBLIC_KEY=your_public_key
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=template_contact_form
```

---

## 🧪 Test Your Template

1. Go back to Email Templates
2. Find `contact_form` template
3. Click **Preview & Test**
4. Fill in test values:
   - `from_name`: "John Doe"
   - `from_email`: "john@example.com"
   - `message`: "This is a test message from my portfolio!"
   - `reply_to`: "john@example.com"
   - `to_email`: "bagmaraashish@gmail.com"
5. Click **Send Test Email**
6. Check your inbox! 📧

---

## 📝 Notes

- Template ID must be: `template_contact_form` (with underscore, no spaces)
- All variables are case-sensitive
- The `{{variable}}` syntax is EmailJS syntax - don't change it
- HTML will be rendered in the email client
- Save the template before moving forward

---

## 🆘 Troubleshooting

**Template not appearing?**
- Refresh the dashboard
- Try creating again with exact name: `contact_form`

**Variables not showing in email?**
- Make sure variable names match exactly (case-sensitive)
- Check `{{` and `}}` are double curly braces
- Don't use single `{` or `}`

**Email not formatting correctly?**
- Some email clients don't support advanced CSS
- The template includes fallback styling
- Plain text version is automatically generated

---

Good luck! 🚀 Your contact form will work once this template is created.
