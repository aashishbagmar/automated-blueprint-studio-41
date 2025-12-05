#!/usr/bin/env python3
"""
setup_contact_form.py - Setup script for contact form backend

This script helps you set up the contact form backend by:
1. Checking Python version
2. Installing dependencies
3. Configuring .env file
4. Testing the setup
"""

import os
import sys
import subprocess
from pathlib import Path

def print_header(text):
    """Print a formatted header"""
    print("\n" + "="*50)
    print(f"  {text}")
    print("="*50 + "\n")

def check_python_version():
    """Check if Python version is 3.8 or higher"""
    print("🔍 Checking Python version...")
    version = sys.version_info
    
    if version.major < 3 or (version.major == 3 and version.minor < 8):
        print(f"❌ Python 3.8+ required. You have {version.major}.{version.minor}")
        return False
    
    print(f"✅ Python {version.major}.{version.minor} detected")
    return True

def install_dependencies():
    """Install Python dependencies"""
    print_header("Installing Dependencies")
    
    try:
        print("📦 Installing Flask, Flask-CORS, python-dotenv...")
        subprocess.check_call([
            sys.executable, "-m", "pip", "install", 
            "-r", "requirements.txt"
        ])
        print("✅ Dependencies installed successfully!")
        return True
    except subprocess.CalledProcessError:
        print("❌ Failed to install dependencies")
        return False

def setup_env_file():
    """Guide user through .env setup"""
    print_header("Configure Email Settings")
    
    env_path = Path(".env")
    
    # Check if .env exists
    if env_path.exists():
        response = input("⚠️  .env file already exists. Overwrite? (y/n): ").lower()
        if response != "y":
            print("⏭️  Skipping .env setup")
            return True
    
    print("""
📧 Email Configuration Setup
    
This backend sends contact form submissions via Gmail SMTP.
You'll need:
1. Gmail account
2. 2-Factor Authentication enabled
3. App Password generated

Follow these steps:

1️⃣  Enable 2-Step Verification:
   Go to: https://myaccount.google.com/security
   Click: 2-Step Verification
   
2️⃣  Generate App Password:
   Go to: https://myaccount.google.com/apppasswords
   Select: Mail & Windows Computer
   Copy the 16-character password

3️⃣  Enter your credentials below:
    """)
    
    email = input("📧 Enter your Gmail address: ").strip()
    app_password = input("🔑 Enter your 16-character App Password: ").strip()
    
    # Create .env content
    env_content = f"""# Portfolio Contact Form Environment Variables
PORTFOLIO_EMAIL={email}
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME={email}
SMTP_PASSWORD={app_password}
FLASK_ENV=development
FLASK_DEBUG=True
"""
    
    try:
        with open(env_path, "w") as f:
            f.write(env_content)
        print(f"\n✅ .env file created successfully!")
        print(f"📁 Location: {env_path.absolute()}")
        return True
    except IOError as e:
        print(f"❌ Failed to create .env: {e}")
        return False

def test_setup():
    """Test if the setup is working"""
    print_header("Testing Setup")
    
    print("🧪 Testing email configuration...")
    
    try:
        # Try importing the modules
        import flask
        import flask_cors
        import dotenv
        
        print("✅ All required modules imported successfully")
        
        # Check if .env exists and has credentials
        if not Path(".env").exists():
            print("⚠️  .env file not found. Please run setup again.")
            return False
        
        from dotenv import load_dotenv
        load_dotenv()
        
        smtp_username = os.getenv("SMTP_USERNAME")
        smtp_password = os.getenv("SMTP_PASSWORD")
        
        if not smtp_username or not smtp_password:
            print("⚠️  SMTP credentials not configured in .env")
            return False
        
        print("✅ SMTP credentials configured")
        
        if smtp_password == "your_gmail_app_password_here":
            print("⚠️  Please update the Gmail App Password in .env")
            return False
        
        print("✅ All checks passed!")
        return True
        
    except ImportError as e:
        print(f"❌ Missing module: {e}")
        return False
    except Exception as e:
        print(f"❌ Test failed: {e}")
        return False

def print_next_steps():
    """Print next steps"""
    print_header("Next Steps")
    
    print("""
🎉 Setup complete! Next steps:

1️⃣  Start the backend server:
   python contact_form.py

2️⃣  In another terminal, start the frontend:
   npm run dev

3️⃣  Open http://localhost:8080 in your browser

4️⃣  Fill out the contact form to test it!

📚 For more details, see: CONTACT_FORM_SETUP.md

⚠️  Important:
   - Keep the .env file SECRET
   - Don't commit .env to Git
   - Add .env to .gitignore if not already there

Happy coding! 🚀
    """)

def main():
    """Main setup flow"""
    print("""
╔════════════════════════════════════════════╗
║  Portfolio Contact Form Setup              ║
║  Aashish Bagmar                            ║
╚════════════════════════════════════════════╝
    """)
    
    # Check Python version
    if not check_python_version():
        sys.exit(1)
    
    # Install dependencies
    if not install_dependencies():
        sys.exit(1)
    
    # Setup .env
    if not setup_env_file():
        sys.exit(1)
    
    # Test setup
    if not test_setup():
        print("\n⚠️  Some tests failed. Please review the errors above.")
        sys.exit(1)
    
    # Print next steps
    print_next_steps()

if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n⏹️  Setup cancelled by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n❌ Setup failed: {e}")
        sys.exit(1)
