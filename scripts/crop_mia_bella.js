const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const UPLOAD_DIR = 'C:\\Users\\ZHULL\\.gemini\\antigravity-ide\\brain\\7b3a35e4-167e-4bef-873c-489721e019b2\\.user_uploaded';
const OUTPUT_DIR = path.join(__dirname, '..', 'public', 'images', 'demo', 'mia-bella');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function processImages() {
  console.log('Processing Mia Bella images...');

  // 1. Logo Pinup
  const logoSrc = path.join(UPLOAD_DIR, 'media_1790496175757.png');
  if (fs.existsSync(logoSrc)) {
    await sharp(logoSrc)
      .resize({ width: 800, withoutEnlargement: true })
      .jpeg({ quality: 92 })
      .toFile(path.join(OUTPUT_DIR, 'logo-pinup.jpg'));
    
    // Also save as PNG
    fs.copyFileSync(logoSrc, path.join(OUTPUT_DIR, 'logo-pinup.png'));
    console.log('Processed logo-pinup.jpg & logo-pinup.png');
  }

  // 2. Electric Blue Hair
  const electricBlueSrc = path.join(UPLOAD_DIR, 'media_1790496273839.jpg');
  if (fs.existsSync(electricBlueSrc)) {
    await sharp(electricBlueSrc)
      .resize({ width: 900, withoutEnlargement: true })
      .jpeg({ quality: 90 })
      .toFile(path.join(OUTPUT_DIR, 'electric-blue-hair.jpg'));
    console.log('Processed electric-blue-hair.jpg');
  }

  // 3. Metallic Steel Blue Layers
  const metallicBlueSrc = path.join(UPLOAD_DIR, 'media_1790496316856.jpg');
  if (fs.existsSync(metallicBlueSrc)) {
    await sharp(metallicBlueSrc)
      .resize({ width: 900, withoutEnlargement: true })
      .jpeg({ quality: 90 })
      .toFile(path.join(OUTPUT_DIR, 'metallic-blue-layers.jpg'));
    console.log('Processed metallic-blue-layers.jpg');
  }

  // 4. Rainbow Peekaboo Prism
  const rainbowSrc = path.join(UPLOAD_DIR, 'media_1790496368575.jpg');
  if (fs.existsSync(rainbowSrc)) {
    await sharp(rainbowSrc)
      .resize({ width: 900, withoutEnlargement: true })
      .jpeg({ quality: 90 })
      .toFile(path.join(OUTPUT_DIR, 'rainbow-peekaboo-prism.jpg'));
    console.log('Processed rainbow-peekaboo-prism.jpg');
  }

  // 5. Bio text info
  const bioSrc = path.join(UPLOAD_DIR, 'media_1790496413304.png');
  if (fs.existsSync(bioSrc)) {
    fs.copyFileSync(bioSrc, path.join(OUTPUT_DIR, 'bio-reference.png'));
    console.log('Copied bio-reference.png');
  }

  console.log('All Mia Bella images successfully processed into:', OUTPUT_DIR);
}

processImages().catch(err => {
  console.error('Error processing images:', err);
  process.exit(1);
});
