# Carousel Image Configuration Guide

## How to Add Your Own Images to the Hero Carousel

The hero carousel is located in `src/components/HeroCarousel.tsx`. Follow these steps to customize it with your own product images.

### Option 1: Using External Image URLs (Easiest)

1. Open `src/components/HeroCarousel.tsx`
2. Find the `slides` array (around line 19)
3. Replace the image URLs in the `image` field with your own URLs:

```typescript
const slides: CarouselSlide[] = [
  {
    id: 1,
    image: 'YOUR_IMAGE_URL_HERE',  // Replace with your image URL
    title: 'Premium Bracelet Collection',
    description: 'Handcrafted with love and care'
  },
  // ... more slides
];
```

### Finding Image URLs

**From Google Images:**
1. Go to google.com/images
2. Search for "bracelet" or "jewelry"
3. Right-click the image → "Copy image address"
4. Paste it in the carousel configuration

**From Free Image Sites:**
- **Unsplash**: https://unsplash.com (search "bracelet")
- **Pexels**: https://www.pexels.com (search for jewelry/bracelets)
- **Pixabay**: https://pixabay.com (free jewelry images)

**Recommended Image Sizes:**
- Width: 1200px
- Height: 600px
- Format: JPG or WebP (faster)

### Option 2: Using Local Images

1. Place your images in the `public/` folder
2. Update the image path:

```typescript
image: '/images/bracelet1.jpg',  // Image from public folder
```

### Carousel Features

The carousel includes:
- **Auto-play**: Changes slides every 5 seconds
- **Navigation arrows**: Click to move between slides
- **Dot indicators**: Click to jump to specific slide
- **Pause/Play button**: Top-right corner
- **Responsive**: Works on mobile, tablet, and desktop

### Example: Adding 5 Slides

```typescript
const slides: CarouselSlide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&h=600&fit=crop',
    title: 'Premium Collection',
    description: 'Handcrafted with love'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1526762338901-f59e36eb5fa9?w=1200&h=600&fit=crop',
    title: 'Elegant Designs',
    description: 'Perfect for any occasion'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1515562141207-6461a4ee7ee0?w=1200&h=600&fit=crop',
    title: 'Unique Styles',
    description: 'Express your personality'
  },
  // Add more slides following the same pattern
];
```

### Customizing Slide Text

Change the title and description for each slide:

```typescript
{
  id: 1,
  image: 'YOUR_IMAGE_URL',
  title: 'Your Custom Title',      // Max 50 characters recommended
  description: 'Your description'   // Max 50 characters recommended
}
```

### Auto-play Settings

Edit the carousel timing (in milliseconds):

```typescript
// Change from 5000 (5 seconds) to your desired time
useEffect(() => {
  if (!isAutoPlay) return;
  
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, 5000);  // Change this number (e.g., 3000 for 3 seconds)
  
  return () => clearInterval(interval);
}, [isAutoPlay, slides.length]);
```

### Troubleshooting

**Images not loading?**
- Check the URL is correct
- Ensure the domain allows external linking
- Try an image from unsplash.com instead

**Carousel not showing?**
- Make sure `HeroCarousel.tsx` is imported in `HeroSection.tsx`
- Check browser console for errors (F12)

**Want to disable auto-play?**
- Change `const [isAutoPlay, setIsAutoPlay] = useState(true);` to `useState(false);`

### Next Steps

After updating carousel images, test on different devices:
1. Desktop (full size)
2. Tablet (iPad size)
3. Mobile (phone size)

Your carousel is now fully responsive!
