# ⚡ Quick Start Guide

Get Sparkle Beat running in **5 minutes**!

## Prerequisites
- Node.js v18+ installed
- MongoDB Atlas free account
- Cloudinary free account

## 🚀 Quick Setup

### 1. Install & Run (2 minutes)
```bash
npm install
npm run dev
```

Go to: http://localhost:3000

### 2. Configure Environment (2 minutes)

Edit `.env.local`:
```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/sparkle-beat?retryWrites=true&w=majority

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

ADMIN_PASSWORD=your_secure_password
NEXT_PUBLIC_ADMIN_EMAIL=admin@example.com
NEXT_PUBLIC_ADMIN_PASSWORD=your_admin_password
```

### 3. Access Admin (1 minute)

Go to: http://localhost:3000/admin/login

Add your first product!

## 📺 Project Structure

```
src/
├── app/
│   ├── page.tsx                # Home page 🏠
│   ├── admin/
│   │   ├── page.tsx            # Dashboard 📊
│   │   └── login/page.tsx       # Login 🔐
│   └── api/products/route.ts    # API 🔌
├── components/
│   ├── ProductCard.tsx         # Beautiful cards 💅
│   └── ProductForm.tsx         # Product form 📝
├── lib/
│   └── mongodb.ts             # Database 🗄️
└── models/
    └── Product.ts             # Schema 📋
```

## 🎯 Features

✅ Beautiful product showcase
✅ Mobile responsive  
✅ Admin dashboard
✅ Image uploads
✅ WhatsApp ordering
✅ Animated UI

## 📚 Need Help?

- **Setup questions**: See [SETUP.md](SETUP.md)
- **Deployment help**: See [DEPLOYMENT.md](DEPLOYMENT.md)
- **Full docs**: See [README.md](README.md)

---

**Ready to go live?** See [DEPLOYMENT.md](DEPLOYMENT.md) for free deployment on Vercel!

---

Made with ❤️ for beautiful bracelet businesses ✨
