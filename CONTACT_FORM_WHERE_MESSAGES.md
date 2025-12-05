# 📧 Contact Form Messages - Where to Find Them

## Quick Answer

**Messages will appear in 2 main places:**

1. ✉️ **Your Gmail Inbox** (bagmaraashish@gmail.com) - Real-time email notifications
2. 📄 **contact_submissions.json** - Local file with all submissions

---

## 🚀 Step-by-Step Setup

### Step 1: Install Dependencies

```powershell
pip install Flask==2.3.3 Flask-CORS==4.0.0 python-dotenv==1.0.0
```

### Step 2: Get Gmail App Password

1. Go to: https://myaccount.google.com/security
2. Click "2-Step Verification" (enable if not done)
3. Go to: https://myaccount.google.com/apppasswords
4. Select "Mail" → "Windows Computer"
5. Copy the 16-character password

### Step 3: Create .env File

Create a file named `.env` in your project root:

```env
PORTFOLIO_EMAIL=bagmaraashish@gmail.com
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=bagmaraashish@gmail.com
SMTP_PASSWORD=xxxx xxxx xxxx xxxx
FLASK_ENV=development
FLASK_DEBUG=True
```

Replace `xxxx xxxx xxxx xxxx` with your 16-character app password.

### Step 4: Run the Backend Server

```powershell
python contact_form.py
```

You'll see:
```
╔═══════════════════════════════════════════╗
║   Portfolio Contact Form API Server       ║
║   Aashish Bagmar                          ║
╚═══════════════════════════════════════════╝

📧 Email Configuration:
   - From: bagmaraashish@gmail.com
   - To: bagmaraashish@gmail.com
   - Server: smtp.gmail.com:587

⚙️  Server Configuration:
   - Rate Limit: 5 requests per 3600s
   - Log File: contact_submissions.json

🚀 Starting server on http://localhost:5000
   - Submit form: POST /api/contact
   - View submissions: GET /api/contact/submissions
   - Health check: GET /api/health

✅ Server running. Press Ctrl+C to stop.
```

---

## 📧 Option 1: View in Gmail (Recommended)

### What Happens

When someone submits the form:
- You receive an email at **bagmaraashish@gmail.com**
- Subject: "New Contact Form Submission from [Name]"
- Contains their name, email, and full message
- You can reply directly to their email

### How to View

1. Open https://gmail.com
2. Login to bagmaraashish@gmail.com
3. Look for emails with subject "New Contact Form Submission"
4. Click to open and read the message
5. Reply directly to the sender

### Example Email

```
From: noreply@portfolio
To: bagmaraashish@gmail.com
Subject: New Contact Form Submission from John Doe

Name: John Doe
Email: john@example.com
Message: I love your portfolio! Great work!

---
Sent at: 2025-12-05 14:30:00
```

---

## 📄 Option 2: View in contact_submissions.json

### What's Stored

Every submission is automatically saved to a file called:
```
contact_submissions.json
```

### Location
In your project root folder (same level as package.json)

### How to View

#### In VS Code:
1. Open the project in VS Code
2. Find `contact_submissions.json` file
3. Click to open and view all submissions

#### In File Explorer:
1. Go to: `C:\Users\bagma\OneDrive\Desktop\Portfolio\automated-blueprint-studio-41\`
2. Look for `contact_submissions.json`
3. Open with Notepad or any text editor

### Example Content

```json
[
  {
    "timestamp": "2025-12-05T14:30:00.123456",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "I love your portfolio! Great work!",
    "email_sent": true,
    "ip_address": "127.0.0.1"
  },
  {
    "timestamp": "2025-12-05T14:32:15.654321",
    "name": "Jane Smith",
    "email": "jane@example.com",
    "message": "Would love to collaborate on a project",
    "email_sent": true,
    "ip_address": "192.168.1.100"
  }
]
```

### Fields Explained

| Field | Meaning |
|-------|---------|
| `timestamp` | When the form was submitted |
| `name` | Sender's name |
| `email` | Sender's email address |
| `message` | The message content |
| `email_sent` | Whether email notification was sent |
| `ip_address` | Sender's IP address |

---

## 🌐 Option 3: View via API

If you want to view submissions programmatically:

### In PowerShell

```powershell
curl http://localhost:5000/api/contact/submissions
```

### In Browser

Go to: http://localhost:5000/api/contact/submissions

### Response

```json
{
  "success": true,
  "count": 2,
  "submissions": [
    {
      "timestamp": "2025-12-05T14:30:00.123456",
      "name": "John Doe",
      "email": "john@example.com",
      "message": "I love your portfolio!",
      "email_sent": true,
      "ip_address": "127.0.0.1"
    }
  ]
}
```

---

## 🧪 Test It Out

### Test 1: Test the Health Check

```powershell
curl http://localhost:5000/api/health
```

Should return:
```json
{
  "status": "healthy",
  "service": "Portfolio Contact Form API",
  "timestamp": "2025-12-05T14:30:00.000000"
}
```

### Test 2: Submit a Test Message

Fill out the form on http://localhost:8080 and submit:
- Name: John Doe
- Email: john@example.com
- Message: This is a test message to verify the system works

### Test 3: Check Your Email

1. Open Gmail
2. Check bagmaraashish@gmail.com
3. Look for the new email

### Test 4: Check the JSON File

1. Open `contact_submissions.json`
2. You should see your test submission listed

---

## 🛠️ Troubleshooting

### Problem: "Connection failed" when submitting form

**Solution:** Make sure backend server is running
```powershell
python contact_form.py
```

### Problem: Email not received in Gmail

**Checklist:**
- [ ] Is the backend server running?
- [ ] Did you create a `.env` file?
- [ ] Did you add your Gmail App Password to `.env`?
- [ ] Did you enable 2-Factor Authentication on Gmail?
- [ ] Check spam/junk folder

**Fix:**
```powershell
# Reinstall packages
pip install -r requirements.txt

# Start server again
python contact_form.py
```

### Problem: ".env file not found" error

**Solution:** Create `.env` file with your credentials

```powershell
# Go to project folder
cd C:\Users\bagma\OneDrive\Desktop\Portfolio\automated-blueprint-studio-41

# Create .env file (use Notepad)
notepad .env

# Paste this content:
PORTFOLIO_EMAIL=bagmaraashish@gmail.com
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=bagmaraashish@gmail.com
SMTP_PASSWORD=your_16_char_app_password
FLASK_ENV=development
FLASK_DEBUG=True

# Save (Ctrl+S)
```

### Problem: "Too many requests" error

**Solution:** Wait 1 hour or test from a different IP

(Rate limiting: max 5 requests per hour per IP)

---

## 📱 Summary

| Where | How to View | Real-time? |
|-------|------------|-----------|
| 📧 Gmail | Open email in inbox | ✅ Yes |
| 📄 JSON File | Open `contact_submissions.json` | ✅ Yes |
| 🌐 API | http://localhost:5000/api/contact/submissions | ✅ Yes |

---

## ✅ Current Status

Your contact form is now:
- ✅ **Live on portfolio** at http://localhost:8080
- ✅ **Backend ready** - just need to run `python contact_form.py`
- ✅ **Email configured** - set up `.env` file with your credentials
- ✅ **Submissions logged** - stored in `contact_submissions.json`

---

## 🚀 Next Steps

1. **Install dependencies:**
   ```powershell
   pip install -r requirements.txt
   ```

2. **Create `.env` file** with your Gmail App Password

3. **Start the backend:**
   ```powershell
   python contact_form.py
   ```

4. **Test by submitting** a form on your portfolio

5. **Check Gmail** for the email notification

6. **Check JSON file** for the stored submission

**That's it! You're all set!** 🎉

---

Questions? Check the other documentation files:
- `CONTACT_FORM_README.md` - Full documentation
- `CONTACT_FORM_SETUP.md` - Detailed setup guide
- `.env.example` - Template for .env file
