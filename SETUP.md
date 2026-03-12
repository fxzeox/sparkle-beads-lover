# 📋 Setup Guide - Sparkle Beat

Complete step-by-step guide to get Sparkle Beat running on your computer.

## 🎯 What You'll Need

1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
   - Choose LTS version
   - Install and verify: `node -v` and `npm -v`

2. **Code Editor** - [VS Code](https://code.visualstudio.com/) (recommended)

3. **Database** - MongoDB Atlas Free Account
   - [Sign up here](https://www.mongodb.com/cloud/atlas)
   - Free tier: 512 MB storage

4. **Image Storage** - Cloudinary Free Account
   - [Sign up here](https://cloudinary.com/users/register/free)
   - Free tier: 25 GB storage

5. **Git** (optional) - [Download](https://git-scm.com/)
   - For version control and GitHub backup

---

## 📝 Step-by-Step Setup

### Step 1: Prepare Your Computer

#### On Windows:
1. Download Node.js LTS from [nodejs.org](https://nodejs.org/)
2. Run the installer
3. Accept default options
4. Restart your computer
5. Open Command Prompt and type: `node -v` (should show version)

#### On Mac:
1. Download Node.js LTS
2. Run the installer
3. Open Terminal and type: `node -v`

#### On Linux:
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
```

### Step 2: Get the Project

Choose one of these options:

**Option A: Download as ZIP**
1. Download the Sparkle Beat project folder
2. Extract to your desired location
3. Open folder in VS Code

**Option B: Clone from GitHub** (if you have git)
```bash
git clone https://github.com/yourusername/sparkle-beat.git
cd sparkle-beat
```

### Step 3: Install Dependencies

Open terminal/command prompt in your project folder and run:

```bash
npm install
```

This downloads all required packages. Wait for it to finish (usually 1-2 minutes).

### Step 4: Set Up MongoDB

**Why MongoDB?** Database to store your products.

1. **Create Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up with email or Google
   - Verify your email

2. **Create Organization & Project**
   - Follow MongoDB's setup wizard
   - Create an organization
   - Create a project named "sparkle-beat"

3. **Create a Cluster**
   - Click "Create Cluster"
   - Choose "**Free Tier**" (M0)
   - Select "**AWS**" as provider
   - Choose closest **region** to you
   - Click "Create Cluster"
   - Wait 1-2 minutes for cluster to be ready

4. **Get Connection String**
   - Click "**Connect**" button
   - Choose "**Drivers**" option
   - Select "**Node.js**" driver
   - Copy the connection string
   - It looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sparkle-beat?retryWrites=true&w=majority`

5. **Save Database Credentials**
   - Note the username you created
   - Note the password you created
   - Replace them in the connection string

6. **Network Access**
   - Go to **Network Access** → **Add IP Address**
   - Click "**Allow access from anywhere**" (safe for free tier)
   - This allows Vercel servers to connect later

### Step 5: Set Up Cloudinary

**Why Cloudinary?** Free image hosting service for product images.

1. **Create Account**
   - Go to [Cloudinary](https://cloudinary.com/users/register/free)
   - Sign up with email or Google
   - Verify email

2. **Get API Credentials**
   - Go to [Cloudinary Dashboard](https://cloudinary.com/console/settings/api-keys)
   - You'll see your **Cloud Name** (highlighted at top)
   - Copy your **Cloud Name**
   - Scroll down to see **API Key** and **API Secret**
   - Copy both

3. **Create Upload Preset** (optional but recommended)
   - Go to **Settings** → **Upload**
   - Scroll to **Upload presets** section
   - Click **Add upload preset**
   - Name it: `sparkle-beat-upload`
   - Set **Mode** to: **Unsigned** (allows uploads without API secret)
   - Click **Create**
   - Note the preset name

### Step 6: Create Environment File

1. In your project folder, find `.env.local` file
2. Open it in VS Code
3. Fill in your credentials:

```env
# MongoDB (from Step 4)
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sparkle-beat?retryWrites=true&w=majority

# Cloudinary (from Step 5)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=sparkle-beat-upload

# Admin Login Credentials
ADMIN_PASSWORD=choose_a_strong_password
NEXT_PUBLIC_ADMIN_EMAIL=admin@example.com
NEXT_PUBLIC_ADMIN_PASSWORD=choose_a_strong_password
```

**Important**: 
- Replace `username` and `password` in MongoDB URI with your actual credentials
- Replace `your-cloud-name` with your Cloudinary cloud name
- Use strong passwords for admin credentials
- Don't share this file with anyone!

### Step 7: Run Development Server

In terminal, run:

```bash
npm run dev
```

You should see:
```
> Local:        http://localhost:3000
```

### Step 8: Test Your Setup

1. Open web browser
2. Go to `http://localhost:3000`
3. You should see Sparkle Beat home page
4. Try admin login: `http://localhost:3000/admin/login`
5. Use credentials from `.env.local`

### Step 9: Add Your First Product

1. Go to `http://localhost:3000/admin/login`
2. Enter admin credentials
3. Click **"+ Add New Bracelet"**
4. Fill in:
   - **Product Name**: e.g., "Golden Bracelet"
   - **Price**: e.g., "1200"
   - **Description**: e.g., "Beautiful golden design"
   - **WhatsApp**: e.g., "+923001234567"
   - **Image**: Click to upload a bracelet image
5. Click **"Add Product"**
6. Go back to home page and see your product!

---

## 🎯 Common Issues & Solutions

### "Cannot find module" error?
```bash
npm install
```
Then restart the dev server.

### Port 3000 already in use?
Use a different port:
```bash
npm run dev -- -p 3001
```

### MongoDB connection fails?
1. Check connection string in `.env.local`
2. Verify username and password are correct
3. Go to MongoDB Atlas → Network Access
4. Confirm "Allow access from anywhere" is enabled

### Image upload fails?
1. Check Cloudinary credentials in `.env.local`
2. Verify cloud name is correct
3. Check upload preset exists and is "Unsigned"
4. Restart dev server after changing credentials

### Admin login doesn't work?
1. Clear browser cookies (Settings → Privacy → Clear cookies)
2. Try in incognito/private window
3. Verify credentials in `.env.local`
4. Restart dev server

### Page shows "No products available"?
1. Check MongoDB is connected (see console logs)
2. Try adding a product through admin panel
3. Refresh the page

---

## 🚀 Next Steps

After successful setup:

1. ✅ Customize your product details
2. ✅ Upload your bracelet images
3. ✅ Set your WhatsApp number
4. ✅ Test the ordering process
5. ✅ Deploy to Vercel (see [DEPLOYMENT.md](DEPLOYMENT.md))
6. ✅ Share with customers!

---

## 📚 Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Run production build locally
npm start

# Check for errors
npm run lint

# Format code
npx prettier --write .
```

---

## 🆘 Need Help?

1. **Check the README.md** - Has general project info
2. **Check DEPLOYMENT.md** - For deployment help
3. **Check console** - Browser console (F12) for errors
4. **Check .env.local** - Verify all credentials are set
5. **Restart dev server** - Many issues are fixed by restarting

---

## ✨ You're Ready!

Your Sparkle Beat setup is complete. Start adding products and get ready to sell! 🎉

For detailed deployment guide, see [DEPLOYMENT.md](DEPLOYMENT.md).
