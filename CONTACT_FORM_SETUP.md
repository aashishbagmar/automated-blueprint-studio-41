# Contact Form Backend Setup Guide

This guide explains how to set up and run the contact form backend for your portfolio.

## 📋 Overview

The contact form system consists of two parts:
1. **Frontend** - React component in your portfolio (already implemented)
2. **Backend** - Flask API server that processes submissions and sends emails

## 🚀 Quick Start

### Step 1: Install Backend Dependencies

```powershell
pip install -r requirements.txt
```

Or individually:
```powershell
pip install Flask==2.3.3
pip install Flask-CORS==4.0.0
pip install python-dotenv==1.0.0
```

### Step 2: Configure Gmail (IMPORTANT!)

This backend uses Gmail's SMTP to send emails. You need to:

1. **Enable 2-Factor Authentication** on your Gmail account:
   - Go to https://myaccount.google.com/security
   - Enable 2-Step Verification

2. **Generate an App Password**:
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" and "Windows Computer" (or your device)
   - Google will generate a 16-character password
   - Copy this password

3. **Update `.env` file**:
   - Open `.env` file in the project root
   - Replace `your_gmail_app_password_here` with the password you just copied
   - Save the file

Example `.env`:
```env
PORTFOLIO_EMAIL=bagmaraashish@gmail.com
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=bagmaraashish@gmail.com
SMTP_PASSWORD=xxxx xxxx xxxx xxxx
FLASK_ENV=development
FLASK_DEBUG=True
```

### Step 3: Run the Backend Server

```powershell
python contact_form.py
```

You should see:
```
╔═══════════════════════════════════════════╗
║   Portfolio Contact Form API Server       ║
║   Aashish Bagmar                          ║
╚═══════════════════════════════════════════╝

📧 Configuring email settings...
   - SMTP Server: smtp.gmail.com
   - SMTP Port: 587
   - From: bagmaraashish@gmail.com
   - To: bagmaraashish@gmail.com

⚙️  Server configuration:
   - Rate Limit: 5 requests per 3600s
   - Log File: contact_submissions.json

🚀 Starting server...
   - API Endpoint: http://localhost:5000/api/contact
   - Health Check: http://localhost:5000/api/health

✅ Server running. Press Ctrl+C to stop.
```

### Step 4: Test the Connection

In another terminal, test the health check endpoint:

```powershell
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "healthy",
  "service": "Portfolio Contact Form API",
  "timestamp": "2025-12-05T12:00:00.000000"
}
```

### Step 5: Test Form Submission

Use PowerShell to test:

```powershell
$body = @{
    name = "Test User"
    email = "test@example.com"
    message = "This is a test message"
} | ConvertTo-Json

Invoke-WebRequest -Uri http://localhost:5000/api/contact `
    -Method POST `
    -Headers @{"Content-Type"="application/json"} `
    -Body $body
```

## 📁 File Structure

```
portfolio/
├── contact_form.py          # Main backend server
├── requirements.txt         # Python dependencies
├── .env                     # Environment variables (KEEP SECRET!)
├── .env.example             # Template for .env
├── contact_submissions.json # Log of all submissions (auto-created)
└── src/components/ContactSection.tsx # Frontend form
```

## 🔒 Security Features

- **Email Validation**: Checks email format
- **Input Validation**: Validates all fields (length, format, etc.)
- **Rate Limiting**: Max 5 requests per IP per hour
- **CORS Protection**: Only accepts requests from localhost during development
- **Error Handling**: Graceful error responses
- **Data Logging**: Stores submissions locally

## 📧 Features

### What Happens When Someone Submits:

1. ✅ Form validates input on frontend
2. ✅ Data sent to backend via POST request
3. ✅ Backend validates data again
4. ✅ Email sent to `bagmaraashish@gmail.com`
5. ✅ Submission logged to `contact_submissions.json`
6. ✅ Success message shown to user

### Email Features:

- Both plain text and HTML versions
- Timestamp included
- User's email included for easy reply
- Professional formatting

## 🛠️ Troubleshooting

### Issue: "Connection failed. Make sure the backend server is running"

**Solution**: Make sure the Flask server is running on port 5000
```powershell
python contact_form.py
```

### Issue: "Email authentication failed"

**Solution**: Check your Gmail App Password
1. Verify you've generated an App Password correctly
2. Make sure you have 2FA enabled
3. Check `.env` file has the correct password
4. Password should be 16 characters with spaces

### Issue: "Too many requests"

**Solution**: Rate limiting is active. Wait 1 hour or change `RATE_LIMIT_WINDOW` in code.

### Issue: Port 5000 already in use

**Solution**: Kill the process using port 5000 or change the port:
```powershell
# Find process using port 5000
Get-NetTCPConnection -LocalPort 5000

# Kill it (replace PID with actual process ID)
Stop-Process -Id PID -Force
```

## 📊 Viewing Submissions

All submissions are stored in `contact_submissions.json`:

```json
[
  {
    "timestamp": "2025-12-05T12:30:00.123456",
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Great portfolio!",
    "email_sent": true,
    "ip_address": "127.0.0.1"
  }
]
```

Or access via API:
```powershell
curl http://localhost:5000/api/contact/submissions
```

## 🚢 Production Deployment

When deploying to production:

1. **Change `.env` settings**:
   ```env
   FLASK_ENV=production
   FLASK_DEBUG=False
   ```

2. **Use a production WSGI server** (e.g., Gunicorn):
   ```powershell
   pip install gunicorn
   gunicorn -w 4 contact_form:app
   ```

3. **Update CORS settings** in `contact_form.py`:
   ```python
   CORS(app, origins=["https://yourdomain.com"])
   ```

4. **Use environment variables** instead of `.env` file:
   - Set via hosting platform (Heroku, Render, etc.)
   - Never commit `.env` to version control

5. **Add database** for submissions:
   - Use MongoDB, PostgreSQL, etc.
   - Replace JSON file storage

6. **Enable HTTPS** on your domain

## 📝 API Documentation

### POST /api/contact

Submit a contact form

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I'm interested in your work!"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Thank you! Your message has been sent successfully. I'll get back to you soon!"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "error": "Message must be at least 10 characters"
}
```

**Rate Limited (429):**
```json
{
  "success": false,
  "error": "Too many requests. Please try again later."
}
```

### GET /api/health

Health check endpoint

**Response:**
```json
{
  "status": "healthy",
  "service": "Portfolio Contact Form API",
  "timestamp": "2025-12-05T12:00:00.000000"
}
```

### GET /api/contact/submissions

Get all submissions (for admin dashboard)

**Response:**
```json
{
  "success": true,
  "count": 5,
  "submissions": [...]
}
```

## 🔗 Integration with Frontend

The React component (`ContactSection.tsx`) automatically:

1. Calls `http://localhost:5000/api/contact` on form submit
2. Displays success/error messages via toast notifications
3. Resets form after successful submission
4. Shows loading state while submitting

## 🎓 Learning Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [Gmail SMTP Guide](https://support.google.com/mail/answer/185833)
- [Flask-CORS](https://flask-cors.readthedocs.io/)
- [Python smtplib](https://docs.python.org/3/library/smtplib.html)

## 📞 Support

For issues or questions:
- Check the Troubleshooting section above
- Review error messages in console
- Check `contact_submissions.json` for submission logs
- Verify `.env` file configuration

---

**Status**: ✅ Ready to use!

Last updated: December 5, 2025
