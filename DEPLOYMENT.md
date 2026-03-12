# 🚀 Deployment Guide - Sparkle Beat

This guide will help you deploy your Sparkle Beat bracelet shop to Vercel for free!

## Prerequisites

- GitHub account (free)
- Vercel account (free)
- Project pushed to GitHub

## Step 1: Push Code to GitHub

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial Sparkle Beat setup"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/sparkle-beat.git

# Push to main branch
git branch -M main
git push -u origin main
```

## Step 2: Deploy to Vercel

### Option 1: Using Vercel Dashboard (Recommended)

1. Go to [Vercel.com](https://vercel.com)
2. Sign up with GitHub (or log in if you have an account)
3. Click **Add New** → **Project**
4. Import your GitHub repository
5. Click **Import**

### Option 2: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## Step 3: Add Environment Variables to Vercel

1. In Vercel dashboard, go to your project
2. Click **Settings** → **Environment Variables**
3. Add each variable from your `.env.local`:

```
MONGODB_URI = mongodb+srv://username:password@cluster.mongodb.net/sparkle-beat?retryWrites=true&w=majority
CLOUDINARY_CLOUD_NAME = your_cloud_name
CLOUDINARY_API_KEY = your_api_key
CLOUDINARY_API_SECRET = your_api_secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME = your_cloud_name
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET = your_upload_preset
ADMIN_PASSWORD = your_secure_password
NEXT_PUBLIC_ADMIN_EMAIL = admin@example.com
NEXT_PUBLIC_ADMIN_PASSWORD = your_admin_password
```

4. Click each variable and select **Production** as the environment
5. Save and redeploy

## Step 4: Redeploy

1. Click **Deployments** tab
2. Click the latest deployment
3. Click **Redeploy**

Or push a new commit to main:
```bash
git commit -m "Update" --allow-empty
git push
```

## Step 5: Verify Deployment

1. You should see a congratulations message
2. Click the domain link (yourproject.vercel.app)
3. Your site is now live! 🎉

## Custom Domain (Optional)

1. In Vercel, go to **Settings** → **Domains**
2. Add your custom domain
3. Update DNS settings with your registrar
4. Vercel will provide DNS records to add

## Monitoring Your Deployment

### View Logs
- Go to **Deployments** tab
- Click a deployment to see build logs

### Check Analytics
- Click **Analytics** tab to see traffic and performance

### Environment Variables Update
- Update variables in **Settings** → **Environment Variables**
- Changes automatically trigger a redeploy

## Troubleshooting Deployment

### Build Failed?
1. Check the build logs in Vercel
2. Verify all environment variables are set
3. Ensure `.env.local` is NOT in git (check `.gitignore`)

### Products Not Loading?
1. Verify MongoDB connection string is correct
2. Check MongoDB Atlas allows Vercel's IP
   - Go to MongoDB Atlas → Network Access
   - Add "0.0.0.0/0" to allow all IPs (or set specific Vercel IPs)

### Images Not Uploading?
1. Verify Cloudinary credentials in Vercel env vars
2. Check upload preset exists and is "Unsigned"
3. Verify `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is correct

### Admin Login Not Working?
1. Verify `NEXT_PUBLIC_ADMIN_EMAIL` and `NEXT_PUBLIC_ADMIN_PASSWORD` in Vercel
2. Clear browser cache/cookies
3. Try in incognito mode

## Auto-Redeployment

Vercel automatically redeploys when you push to main branch:

```bash
# Make changes locally
git add .
git commit -m "Update bracelets"
git push origin main

# Your site will automatically redeploy!
```

## Performance Optimization

1. **Image Optimization**: Upload optimized images to Cloudinary
2. **Database**: Use MongoDB indexes for faster queries
3. **CDN**: Vercel automatically serves assets from CDN
4. **Caching**: Consider adding cache headers

## Costs

- **Vercel**: Free tier includes:
  - 100 GB bandwidth per month
  - Unlimited deployments
  - Automatic HTTPS
  
- **MongoDB**: Free tier includes:
  - 512 MB storage
  - Auto-pausing after 15 days of inactivity
  
- **Cloudinary**: Free tier includes:
  - 25 GB storage
  - 25 GB monthly bandwidth
  - 300 transformations/month

**Total Cost**: $0/month on free tiers!

## Updating Your Site

### Add New Products
1. Go to admin dashboard: yourdomain.com/admin/login
2. Log in with your admin credentials
3. Click "Add New Bracelet"
4. Upload image and fill details
5. Click "Add Product"

### Update Product
1. Go to admin dashboard
2. Click "Edit" on a product
3. Update details
4. Click "Update Product"

### Delete Product
1. Go to admin dashboard
2. Click "Delete" on a product
3. Confirm deletion

## Next Steps

- [ ] Set up GitHub repository
- [ ] Push code to GitHub
- [ ] Create Vercel account
- [ ] Import project to Vercel
- [ ] Add environment variables
- [ ] Trigger redeploy
- [ ] Visit your live website
- [ ] Add first products
- [ ] Share with friends! 🎉

## Getting Help

If deployment fails:
1. Check Vercel deployment logs
2. Verify MongoDB Atlas is accessible
3. Verify Cloudinary credentials
4. Check browser console for JavaScript errors
5. Review environment variables one more time

## Success!

Your Sparkle Beat website is now live and ready to take orders! 🌟

---

For more help: Check the main [README.md](README.md) or Vercel docs at [vercel.com/docs](https://vercel.com/docs)
