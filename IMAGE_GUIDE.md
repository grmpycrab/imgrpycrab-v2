# Image Replacement Guide

## Instructions

Your portrait images should be placed in:

```
public/images/
├── profile-photo.webp       (Your real photograph)
└── profile-cartoon.webp     (Your cartoon illustration)
```

## Current Status

✓ Project structure is ready
✓ Animation system is configured
✓ Placeholder images are in place for testing

## How to Replace

1. Export/save your images as:
   - **profile-photo.webp** - Your real photo (recommended: 600x800px or square)
   - **profile-cartoon.webp** - Your cartoon illustration (same dimensions)

2. Place them in: `public/images/`

3. The application will automatically use them. No code changes needed!

## Image Recommendations

- **Format**: WebP (best compression) or PNG/JPG
- **Size**: 500-800px width (component will scale responsively)
- **Aspect Ratio**: Square (1:1) works best for the tear animation
- **Quality**: High resolution for crisp display

## Testing

Once you add the images:

1. The dev server auto-refreshes
2. Your photos will appear immediately in the hero section
3. Scroll to see the paper tear animation

## Notes

- Don't rename the files; they must be exactly as specified above
- Both images should have similar dimensions for best animation effect
- The tear animation works better with square or nearly-square portraits
