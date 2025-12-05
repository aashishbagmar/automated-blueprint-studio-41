#!/usr/bin/env python3
"""
contact_form.py - Contact Form Handler for Portfolio

This script handles contact form submissions from the portfolio website.
It processes user inquiries and sends them via email to the portfolio owner.
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
from datetime import datetime
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
import json
import re
from functools import wraps
from collections import defaultdict
import time

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Configuration from environment
PORTFOLIO_EMAIL = os.getenv("PORTFOLIO_EMAIL", "bagmaraashish@gmail.com")
SMTP_SERVER = os.getenv("SMTP_SERVER", "smtp.gmail.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USERNAME = os.getenv("SMTP_USERNAME", "bagmaraashish@gmail.com")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")

# Rate limiting
rate_limit_store = defaultdict(list)
RATE_LIMIT_REQUESTS = 5
RATE_LIMIT_WINDOW = 3600

# Submissions log file
SUBMISSIONS_LOG = "contact_submissions.json"


def load_submissions():
    """Load submissions from JSON file"""
    if os.path.exists(SUBMISSIONS_LOG):
        try:
            with open(SUBMISSIONS_LOG, "r") as f:
                return json.load(f)
        except (json.JSONDecodeError, IOError):
            return []
    return []


def save_submission(submission_data):
    """Save submission to JSON file"""
    submissions = load_submissions()
    submissions.append(submission_data)
    
    try:
        with open(SUBMISSIONS_LOG, "w") as f:
            json.dump(submissions, f, indent=2)
    except IOError as e:
        print(f"Error saving submission: {e}")


def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None


def validate_form_data(data):
    """Validate contact form data"""
    errors = []
    
    name = data.get("name", "").strip()
    if not name:
        errors.append("Name is required")
    elif len(name) < 2:
        errors.append("Name must be at least 2 characters")
    elif len(name) > 100:
        errors.append("Name must be less than 100 characters")
    
    email = data.get("email", "").strip()
    if not email:
        errors.append("Email is required")
    elif not validate_email(email):
        errors.append("Invalid email format")
    
    message = data.get("message", "").strip()
    if not message:
        errors.append("Message is required")
    elif len(message) < 10:
        errors.append("Message must be at least 10 characters")
    elif len(message) > 5000:
        errors.append("Message must be less than 5000 characters")
    
    if errors:
        return False, ", ".join(errors)
    
    return True, None


def rate_limit(f):
    """Rate limiting decorator"""
    @wraps(f)
    def decorated_function(*args, **kwargs):
        ip = request.remote_addr
        now = time.time()
        
        rate_limit_store[ip] = [
            timestamp for timestamp in rate_limit_store[ip]
            if now - timestamp < RATE_LIMIT_WINDOW
        ]
        
        if len(rate_limit_store[ip]) >= RATE_LIMIT_REQUESTS:
            return jsonify({
                "success": False,
                "error": "Too many requests. Please try again later."
            }), 429
        
        rate_limit_store[ip].append(now)
        return f(*args, **kwargs)
    
    return decorated_function


def send_email(name, email, message):
    """Send email notification to portfolio owner"""
    try:
        msg = MIMEMultipart("alternative")
        msg["Subject"] = f"New Contact Form Submission from {name}"
        msg["From"] = SMTP_USERNAME
        msg["To"] = PORTFOLIO_EMAIL
        
        # Plain text version
        text = f"""
New contact form submission:

Name: {name}
Email: {email}
Message:
{message}

---
Sent at: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}
"""
        
        # HTML version
        html = f"""
<html>
  <body style="font-family: Arial, sans-serif; background-color: #f5f5f5;">
    <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 20px; border-radius: 8px;">
      <h2 style="color: #1abc9c;">New Contact Form Submission</h2>
      <p><strong>Name:</strong> {name}</p>
      <p><strong>Email:</strong> <a href="mailto:{email}">{email}</a></p>
      <p><strong>Message:</strong></p>
      <p style="background-color: #f9f9f9; padding: 10px; border-left: 4px solid #1abc9c;">{message.replace(chr(10), '<br>')}</p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
      <p style="font-size: 12px; color: #999;">Sent at: {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}</p>
    </div>
  </body>
</html>
"""
        
        msg.attach(MIMEText(text, "plain"))
        msg.attach(MIMEText(html, "html"))
        
        # Send email
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SMTP_USERNAME, SMTP_PASSWORD)
            server.send_message(msg)
        
        return True, "Email sent successfully"
    
    except smtplib.SMTPAuthenticationError:
        return False, "Email authentication failed. Check credentials."
    except smtplib.SMTPException as e:
        return False, f"SMTP error: {str(e)}"
    except Exception as e:
        return False, f"Error sending email: {str(e)}"


@app.route("/api/contact", methods=["POST"])
@rate_limit
def handle_contact():
    """Handle contact form submissions"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                "success": False,
                "error": "No data provided"
            }), 400
        
        # Validate form data
        is_valid, error_msg = validate_form_data(data)
        if not is_valid:
            return jsonify({
                "success": False,
                "error": error_msg
            }), 400
        
        name = data.get("name", "").strip()
        email = data.get("email", "").strip()
        message = data.get("message", "").strip()
        
        # Try to send email
        email_success, email_msg = send_email(name, email, message)
        
        # Save submission regardless of email status
        submission = {
            "timestamp": datetime.now().isoformat(),
            "name": name,
            "email": email,
            "message": message,
            "email_sent": email_success,
            "ip_address": request.remote_addr
        }
        save_submission(submission)
        
        if email_success:
            return jsonify({
                "success": True,
                "message": "Thank you! Your message has been sent successfully. I'll get back to you soon!"
            }), 200
        else:
            return jsonify({
                "success": True,
                "message": "Your message has been received. I'll get back to you soon!"
            }), 200
    
    except Exception as e:
        return jsonify({
            "success": False,
            "error": f"Server error: {str(e)}"
        }), 500


@app.route("/api/contact/submissions", methods=["GET"])
def get_submissions():
    """Get all contact form submissions"""
    try:
        submissions = load_submissions()
        return jsonify({
            "success": True,
            "count": len(submissions),
            "submissions": submissions
        }), 200
    except Exception as e:
        return jsonify({
            "success": False,
            "error": str(e)
        }), 500


@app.route("/api/health", methods=["GET"])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "service": "Portfolio Contact Form API",
        "timestamp": datetime.now().isoformat()
    }), 200


if __name__ == "__main__":
    print("""
    ╔═══════════════════════════════════════════╗
    ║   Portfolio Contact Form API Server       ║
    ║   Aashish Bagmar                          ║
    ╚═══════════════════════════════════════════╝
    """)
    
    print("📧 Email Configuration:")
    print(f"   - From: {SMTP_USERNAME}")
    print(f"   - To: {PORTFOLIO_EMAIL}")
    print(f"   - Server: {SMTP_SERVER}:{SMTP_PORT}")
    
    print("\n⚙️  Server Configuration:")
    print(f"   - Rate Limit: {RATE_LIMIT_REQUESTS} requests per {RATE_LIMIT_WINDOW}s")
    print(f"   - Log File: {SUBMISSIONS_LOG}")
    
    print("\n🚀 Starting server on http://localhost:5000")
    print("   - Submit form: POST /api/contact")
    print("   - View submissions: GET /api/contact/submissions")
    print("   - Health check: GET /api/health")
    print("\n✅ Server running. Press Ctrl+C to stop.\n")
    
    app.run(debug=True, host="0.0.0.0", port=5000)
