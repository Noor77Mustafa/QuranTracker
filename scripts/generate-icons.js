import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Icon sizes needed for app stores
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Create a simple PNG icon generator using Canvas API (for Node.js)
// Note: This is a simplified version - in production, you'd use a proper image library
const generateIcon = (size) => {
  const svgContent = `<svg width="${size}" height="${size}" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="backgroundGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#00ACC1;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#0097A7;stop-opacity:1" />
      </linearGradient>
      <linearGradient id="bookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#43A047;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#2E7D32;stop-opacity:1" />
      </linearGradient>
    </defs>
    
    <!-- Background Circle -->
    <circle cx="256" cy="256" r="240" fill="url(#backgroundGradient)" stroke="#FFFFFF" stroke-width="8"/>
    
    <!-- Book Cover -->
    <rect x="156" y="120" width="200" height="272" rx="16" fill="url(#bookGradient)" stroke="#FFFFFF" stroke-width="4"/>
    
    <!-- Book Spine -->
    <rect x="156" y="120" width="24" height="272" rx="12" fill="#1B5E20"/>
    
    <!-- Arabic Calligraphy Style Text -->
    <text x="256" y="220" font-family="serif" font-size="28" font-weight="bold" text-anchor="middle" fill="#FFFFFF">القرآن</text>
    
    <!-- English Text -->
    <text x="256" y="280" font-family="sans-serif" font-size="24" font-weight="600" text-anchor="middle" fill="#FFFFFF">Quran</text>
    
    <!-- Decorative Elements -->
    <circle cx="256" cy="320" r="4" fill="#FFB300"/>
    <circle cx="240" cy="320" r="2" fill="#FFB300"/>
    <circle cx="272" cy="320" r="2" fill="#FFB300"/>
    
    <!-- Progress Arc -->
    <path d="M 200 360 A 56 56 0 0 1 312 360" stroke="#FFB300" stroke-width="6" fill="none" stroke-linecap="round"/>
  </svg>`;
  
  return svgContent;
};

// Create icons directory if it doesn't exist
const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate all icon sizes
iconSizes.forEach(size => {
  const svgContent = generateIcon(size);
  const filename = `icon-${size}x${size}.svg`;
  const filepath = path.join(publicDir, filename);
  
  fs.writeFileSync(filepath, svgContent);
  console.log(`Generated ${filename}`);
});

console.log('All icons generated successfully!');
console.log('Note: For production, convert SVG icons to PNG format using a proper image processing tool.');