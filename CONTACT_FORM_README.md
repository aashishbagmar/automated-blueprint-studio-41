# 📧 Contact Form System

A complete contact form solution for your portfolio with frontend and backend components.

## 🎯 Features

### Frontend (React)
- ✨ Beautiful form with Python syntax styling
- 🎨 Smooth animations and hover effects
- ✅ Real-time form validation
- 🔄 Loading states and success/error messages
- 📱 Fully responsive design
- ♿ Accessible form inputs

### Backend (Flask)
- 🚀 Fast and lightweight Flask API
- 📧 Automated email sending via Gmail SMTP
- ✔️ Input validation and sanitization
- 🔒 Rate limiting (5 requests/hour per IP)
- 💾 Local JSON storage for submissions
- 📊 Submission logging and tracking
- 🛡️ CORS protection

## 📦 What's Included

```
contact-form/
├── contact_form.py              # Flask backend server
├── setup_contact_form.py        # Automated setup script
├── requirements.txt             # Python dependencies
├── .env.example                 # Template for environment variables
├── CONTACT_FORM_SETUP.md        # Detailed setup guide
├── contact_submissions.json     # Submission log (auto-generated)
└── src/components/ContactSection.tsx  # React frontend component
```

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

```powershell
# Run the setup script
python setup_contact_form.py
```

This will guide you through:
1. ✅ Checking Python version
2. ✅ Installing dependencies
3. ✅ Configuring Gmail credentials
4. ✅ Testing the setup

### Option 2: Manual Setup

1. **Install dependencies:**
   ```powershell
   pip install -r requirements.txt
   ```

2. **Configure environment:**
   - Copy `.env.example` to `.env`
   - Add your Gmail App Password to `.env`

3. **Start the server:**
   ```powershell
   python contact_form.py
   ```

## 🔧 Configuration

### Gmail Setup (Required)

1. Enable 2-Factor Authentication:
   - https://myaccount.google.com/security

2. Generate App Password:
   - https://myaccount.google.com/apppasswords
   - Select "Mail" and your device type
   - Copy the 16-character password

3. Update `.env`:
   ```env
   SMTP_USERNAME=your_email@gmail.com
   SMTP_PASSWORD=xxxx xxxx xxxx xxxx
   ```

## 📝 Usage

### Start Backend Server

```powershell
python contact_form.py
```

Server runs on `http://localhost:5000`

### Start Frontend (in separate terminal)

```powershell
npm run dev
```

Frontend runs on `http://localhost:8080`

### Test the System

1. Open http://localhost:8080
2. Scroll to contact section
3. Fill in the form:
   - **Name**: Your name
   - **Email**: Your email address
   - **Message**: Your message
4. Click "await send_message()"
5. Check your email inbox!

## 🏗️ Architecture

### Request Flow

```
User fills form
        ↓
Frontend validates
        ↓
Sends POST to /api/contact
        ↓
Backend validates
        ↓
Sends email via Gmail SMTP
        ↓
Saves to contact_submissions.json
        ↓
Returns success response
        ↓
Frontend shows toast notification
```

### File Storage

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

## 🔐 Security

- **Input Validation**: Name (2-100 chars), Email (valid format), Message (10-5000 chars)
- **Rate Limiting**: Max 5 requests per IP per hour
- **CORS Protection**: Configured to accept local requests
- **Environment Variables**: Sensitive data never in code
- **.env Protection**: File is in .gitignore and not committed

## 📊 Monitoring Submissions

### View in Browser

```powershell
curl http://localhost:5000/api/contact/submissions
```

### View in File

Open `contact_submissions.json` directly in your editor

### Check Status

```powershell
curl http://localhost:5000/api/health
```

## 🛠️ Troubleshooting

### "Connection failed" error

**Solution**: Ensure backend is running
```powershell
python contact_form.py
```

### "Email authentication failed"

**Solution**: Check Gmail App Password
- Verify 2FA is enabled
- Regenerate App Password at https://myaccount.google.com/apppasswords
- Update `.env` file

### "Too many requests"

**Solution**: Rate limiting is active
- Wait 1 hour before trying again
- Or change `RATE_LIMIT_WINDOW` in `contact_form.py`

### Port 5000 already in use

**Solution**: Change port or kill process
```powershell
# Kill process using port 5000
Get-NetTCPConnection -LocalPort 5000 | Stop-Process -Force
```

## 🚀 Production Deployment

### Before Going Live

1. **Update CORS Settings** in `contact_form.py`:
   ```python
   CORS(app, origins=["https://yourdomain.com"])
   ```

2. **Set Environment to Production**:
   ```env
   FLASK_ENV=production
   FLASK_DEBUG=False
   ```

3. **Use Production WSGI Server**:
   ```powershell
   pip install gunicorn
   gunicorn -w 4 contact_form:app
   ```

4. **Add Database** for submissions:
   - Replace JSON with MongoDB/PostgreSQL
   - Better for scaling

5. **Enable HTTPS** on your domain

6. **Add Email Service** (Optional):
   - SendGrid, Mailgun, AWS SES
   - Better reliability and deliverability

### Hosting Options

- **Heroku**: `git push heroku main`
- **Render**: Connect GitHub repository
- **PythonAnywhere**: Web hosting for Python
- **AWS**: EC2 or Lambda
- **Digital Ocean**: Droplets or App Platform

## 📚 API Reference

### POST /api/contact

Submit a contact form message

**Request:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello!"
}
```

**Success Response:**
```json
{
  "success": true,
  "message": "Thank you! Your message has been sent successfully..."
}
```

**Error Response:**
```json
{
  "success": false,
  "error": "Message must be at least 10 characters"
}
```

### GET /api/health

Server health check

**Response:**
```json
{
  "status": "healthy",
  "service": "Portfolio Contact Form API",
  "timestamp": "2025-12-05T12:00:00"
}
```

### GET /api/contact/submissions

Get all submissions (admin only in production)

**Response:**
```json
{
  "success": true,
  "count": 5,
  "submissions": [...]
}
```

## 📖 File Reference

| File | Purpose |
|------|---------|
| `contact_form.py` | Main Flask application |
| `setup_contact_form.py` | Automated setup wizard |
| `requirements.txt` | Python dependencies |
| `.env` | Configuration (SECRET!) |
| `.env.example` | Configuration template |
| `contact_submissions.json` | Submission logs |
| `CONTACT_FORM_SETUP.md` | Detailed setup guide |
| `ContactSection.tsx` | React frontend component |

## 🎓 Learning Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [Gmail SMTP Setup](https://support.google.com/mail/answer/185833)
- [Python Email](https://docs.python.org/3/library/email.html)
- [CORS in Flask](https://flask-cors.readthedocs.io/)
- [Flask Deployment](https://flask.palletsprojects.com/deployment/)

## 💡 Tips & Tricks

### Custom Email Templates

Edit the HTML template in `send_email()` function to customize the email format

### Change Rate Limiting

```python
RATE_LIMIT_REQUESTS = 10  # Change from 5
RATE_LIMIT_WINDOW = 7200  # Change from 3600 (2 hours)
```

### Add More Fields

1. Add to ContactSection.tsx form
2. Update `validate_form_data()` in contact_form.py
3. Update email template in `send_email()`

### Send Copy to User

Add this to `send_email()`:
```python
msg_user = MIMEMultipart("alternative")
msg_user["Subject"] = "We received your message"
msg_user["From"] = SMTP_USERNAME
msg_user["To"] = email
# ... add content ...
```

## 🤝 Contributing

Found a bug or want to improve? Feel free to:
1. Open an issue
2. Submit a pull request
3. Share feedback

## 📄 License

Free to use and modify for your portfolio

## 👤 Author

Created for Aashish Bagmar's Portfolio
- 📧 Email: bagmaraashish@gmail.com
- 🔗 GitHub: github.com/aashishbagmar
- 💼 LinkedIn: linkedin.com/in/aashishbagmar

---

**Happy coding! 🚀**

For more help, see `CONTACT_FORM_SETUP.md`
