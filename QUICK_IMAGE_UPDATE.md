# Quick Start: Customize Your Carousel Images

## ⚡ In 3 Easy Steps

### Step 1: Find Your Images
Go to one of these free sites and search for "bracelet" or "jewelry":
- **Unsplash**: https://unsplash.com
- **Pexels**: https://www.pexels.com  
- **Pixabay**: https://pixabay.com
- **Google Images**: google.com/images

Right-click image → "Copy image address"

### Step 2: Edit the Carousel
Open: `src/components/HeroCarousel.tsx`

Find this section (around line 19):
```typescript
const slides: CarouselSlide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&h=600&fit=crop',
    title: 'Premium Bracelet Collection',
    description: 'Handcrafted with love and care'
  },
```

Replace the `image` URL with yours:
```typescript
image: 'https://YOUR-IMAGE-URL-HERE',
```

### Step 3: Save & Refresh
Save the file and refresh your browser to see changes!

---

## 🎨 What You Get

- ✅ Auto-playing carousel (changes every 5 seconds)
- ✅ Next/Previous buttons
- ✅ Dot indicators (click to jump to slide)
- ✅ Pause/Play button
- ✅ Works on mobile, tablet, desktop
- ✅ Professional animations

---

## 💡 Complete Example

Here's a full working carousel with 3 images:

```typescript
const slides: CarouselSlide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&h=600&fit=crop',
    title: 'Premium Bracelets',
    description: 'Handcrafted collection'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1526762338901-f59e36eb5fa9?w=1200&h=600&fit=crop',
    title: 'Elegant Designs',
    description: 'For special occasions'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1515562141207-6461a4ee7ee0?w=1200&h=600&fit=crop',
    title: 'Unique Styles',
    description: 'Express yourself'
  }
];
```

---

## 🌟 Image URL Tips

**Best size**: 1200px width × 600px height
**Format**: JPG (smaller) or WebP (faster)

When using Unsplash, add this to URL:
- `?w=1200&h=600&fit=crop` = proper size

---

## ✅ What Changed in Your Site

| Feature | Before | After |
|---------|--------|-------|
| Hero Section | Placeholder | **Beautiful Auto-Carousel** |
| Heading Size | Extra Large (6xl) | **Modern (4xl)** |
| Product Cards | Large | **Compact & Clean** |
| Navigation | Heavy | **Elegant** |
| Overall Feel | Outdated | **Modern E-Commerce** |

---

## 🚀 Test It Out

After saving:
1. Open your site in a browser
2. See carousel at top with auto-playing images
3. Click arrows to move slides
4. Click dots to jump to specific slide
5. Click play/pause button

Done! 🎉

---

### Questions?
See detailed guide in: `CAROUSEL_GUIDE.md` or `MODERN_UI_UPDATE.md`
