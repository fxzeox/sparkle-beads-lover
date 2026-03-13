# ✨ Sparkle Beat - Bracelet Shop Website

A beautiful, modern e-commerce website for a bracelet business built with Next.js, MongoDB, and Cloudinary. Features a stunning storefront and powerful admin dashboard for managing products.

## 🚀 Features

### Customer Features
- 🎨 Beautiful, responsive product showcase
- 📱 Mobile-friendly design
- 🔗 Direct WhatsApp ordering integration
- 💅 Animated product cards with hover effects
- ⚡ Fast loading and performance

### Admin Features
- 📊 Simple admin dashboard
- ➕ Add, edit, and delete products
- 🖼️ Image upload to Cloudinary
- 🔐 Secure authentication
- 📈 No database coding required

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+ with React
- **Styling**: Tailwind CSS with animations
- **Backend**: Next.js API Routes
- **Database**: MongoDB Atlas (Free Tier)
- **Image Storage**: Cloudinary (Free Plan)
- **Deployment**: Vercel (Free Tier)
- **Language**: TypeScript

## 📋 Prerequisites

Before you begin, you'll need:

1. **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
2. **MongoDB Atlas Account** - [Sign up free](https://www.mongodb.com/cloud/atlas)
3. **Cloudinary Account** - [Sign up free](https://cloudinary.com/users/register/free)
4. **Git** (for version control and Vercel deployment)

## ⚙️ Setup Instructions

### 1. Project Already Created!

The project files are ready to go in your workspace.

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and log in
3. Create a new cluster (select M0 Free Tier)
4. In the cluster, go to **Connect** → **Drivers**
5. Copy the connection string: `mongodb+srv://username:password@cluster.mongodb.net/sparkle-beat?retryWrites=true&w=majority`
6. Replace `username` and `password` with your actual credentials

### 4. Setup Cloudinary

1. Go to [Cloudinary](https://cloudinary.com/)
2. Sign up for free
3. Go to **Settings** → **API Keys**
4. Copy your **Cloud Name**, **API Key**, and **API Secret**
5. Create an **Upload Preset**:
   - Go to **Settings** → **Upload**
   - Click **Add upload preset**
   - Set Mode to "Unsigned" (or "Signed" for more security)
   - Save and copy the preset name

### 5. Configure Environment Variables

Copy `.env.example` to `.env.local` and replace the placeholder values with your credentials:

```env
# MongoDB
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/sparkle-beat?retryWrites=true&w=majority

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_upload_preset

# Admin Credentials (change these!)
ADMIN_PASSWORD=your_secure_password_here
NEXT_PUBLIC_ADMIN_EMAIL=admin@example.com
NEXT_PUBLIC_ADMIN_PASSWORD=your_admin_password
```

**⚠️ Security Note**: 
- Change the default admin credentials
- `NEXT_PUBLIC_*` variables are visible in browser (safe for public data)
- Never commit `.env.local` to git

### 6. Run Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### 7. Access Admin Dashboard

- Go to: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- Email: (value from `NEXT_PUBLIC_ADMIN_EMAIL`)
- Password: (value from `NEXT_PUBLIC_ADMIN_PASSWORD`)

## 📁 Project Structure

```
sparkle-beat/
├── src/
│   ├── app/
│   │   ├── page.tsx                 # Home page with products
│   │   ├── admin/
│   │   │   ├── page.tsx             # Admin dashboard
│   │   │   └── login/
│   │   │       └── page.tsx         # Admin login page
│   │   └── api/
│   │       └── products/
│   │           └── route.ts         # Product API endpoints
│   ├── components/
│   │   ├── ProductCard.tsx          # Beautiful product card component
│   │   └── ProductForm.tsx          # Product form modal
│   ├── lib/
│   │   └── mongodb.ts              # MongoDB connection helper
│   ├── models/
│   │   └── Product.ts              # Product database schema
│   └── types/
│       └── index.ts                 # TypeScript interfaces
├── public/                           # Static files
├── .env.local                        # Environment variables (not in git)
├── .env.example                      # Example env variables
├── tailwind.config.ts               # Tailwind CSS configuration
├── tsconfig.json                    # TypeScript configuration
└── package.json                     # Project dependencies
```

## 🎯 API Endpoints

### Products

**Get all products**
```
GET /api/products
```

**Add product** (Requires auth header)
```
POST /api/products
Authorization: Bearer {ADMIN_PASSWORD}
Body: {
  "name": "Golden Bracelet",
  "price": 1200,
  "image": "cloudinary-url",
  "whatsapp": "+923001234567",
  "description": "Beautiful golden bracelet"
}
```

**Delete product** (Requires auth header)
```
DELETE /api/products?id={productId}
Authorization: Bearer {ADMIN_PASSWORD}
```

**Update product** (Requires auth header)
```
PUT /api/products?id={productId}
Authorization: Bearer {ADMIN_PASSWORD}
Body: { /* updated fields */ }
```

## 🌐 Deployment to Vercel

### Before You Deploy

1. Copy `.env.example` to `.env.local` for local testing.
2. Confirm `npm run build` works locally.
3. Make sure your MongoDB Atlas IP/network settings allow Vercel to connect.
4. Make sure your Cloudinary upload preset is valid.

### Option 1: Using Vercel CLI

```bash
npm i -g vercel
vercel --prod
```

### Option 2: Using GitHub

1. Push code to GitHub repository
2. Go to [Vercel](https://vercel.com)
3. Import your GitHub repo
4. Framework preset: `Next.js`
5. Add all environment variables from `.env.example`
6. Deploy

### Post-Deployment

After deployment, add environment variables in Vercel:
1. Go to Project Settings → Environment Variables
2. Add all variables from `.env.example`
3. Use the same values for `Production`, `Preview`, and `Development` if needed
4. Redeploy for changes to take effect

### Required Vercel Environment Variables

```env
MONGODB_URI=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
ADMIN_PASSWORD=
NEXT_PUBLIC_ADMIN_EMAIL=
NEXT_PUBLIC_ADMIN_PASSWORD=
```

### Vercel Notes

- No custom `vercel.json` is required for this project.
- Keep the repository private if you want; Vercel supports private repos.
- Do not commit `.env.local`.
- If product images do not load after deploy, verify `res.cloudinary.com` is still allowed in `next.config.ts`.

## 🎨 Customization

### Change Brand Name

Replace "Sparkle Beat" in:
- `src/app/page.tsx`
- `src/app/admin/login/page.tsx`
- `src/app/admin/page.tsx`

### Change Colors

Edit the gradient colors in components (from purple-600 to pink-600):
- Update Tailwind color classes
- Modify gradient patterns in components

### Change WhatsApp Format

Edit the WhatsApp link format in `src/components/ProductCard.tsx`:
```typescript
const whatsappLink = `https://wa.me/${product.whatsapp}?text=Your custom message`;
```

## 🔒 Security Considerations

1. **Admin Authentication**: Currently uses simple password-based auth. For production, consider:
   - OAuth 2.0 / NextAuth.js
   - JWT tokens
   - Multi-factor authentication

2. **API Protection**: Add rate limiting for production

3. **Image Security**: Use Cloudinary's security features

## 🐛 Troubleshooting

### Products not loading?
- Check MongoDB connection in `.env.local`
- Verify database has data
- Check browser console for errors

### Images not uploading?
- Verify Cloudinary credentials
- Check upload preset is set to "Unsigned"
- Ensure NEXT_PUBLIC variables are set

### Admin login fails?
- Check credentials match `.env.local`
- Verify `NEXT_PUBLIC_ADMIN_EMAIL` and `NEXT_PUBLIC_ADMIN_PASSWORD`
- Clear browser localStorage

### Deployment fails?
- Ensure all environment variables are set in Vercel
- Check Node.js version matches (v18+)
- Review deployment logs in Vercel dashboard

## 📱 Mobile Optimization

The website is fully responsive and mobile-optimized:
- Touch-friendly buttons
- Responsive grid layout
- Mobile navigation
- Fast loading on slow connections

## 🚀 Performance Tips

1. Optimize product images before uploading
2. Use Cloudinary's transformations for resizing
3. Consider caching for better performance
4. Monitor Vercel analytics

## 📚 Useful Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel Deployment](https://vercel.com/docs)

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review environment variables
3. Check browser console for errors
4. Review Vercel deployment logs

---

**Made with ❤️ for beautiful bracelet businesses** ✨

Happy selling! 🎉

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
