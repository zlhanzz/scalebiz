const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/ZHULL/.gemini/antigravity-ide/brain/fa5f91d0-150b-422d-b7e5-fbd1620e2049/.user_uploaded/';
const outDir = path.join(__dirname, '../public/images/demo/total-fence');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function processAssets() {
  console.log('🛠️ Processing Total Fence real assets...');

  // 1. Official Logo (500x500)
  await sharp(path.join(srcDir, 'media_1790522573329.png'))
    .resize(400, 400)
    .png({ quality: 95 })
    .toFile(path.join(outDir, 'logo.png'));
  console.log('✓ logo.png created');

  // Also create a transparent/cropped wordmark version if needed
  await sharp(path.join(srcDir, 'media_1790522573329.png'))
    .extract({ left: 40, top: 180, width: 420, height: 140 })
    .resize(600, null)
    .png({ quality: 95 })
    .toFile(path.join(outDir, 'logo-wordmark.png'));
  console.log('✓ logo-wordmark.png created');

  // 2. Vinyl Privacy Fence Project (1024x768)
  await sharp(path.join(srcDir, 'media_1790522635850.jpg'))
    .resize(1200, 900, { fit: 'cover' })
    .jpeg({ quality: 88 })
    .toFile(path.join(outDir, 'vinyl-privacy-gazebo.jpg'));
  console.log('✓ vinyl-privacy-gazebo.jpg created');

  // Close-up crop of Vinyl fence panels
  await sharp(path.join(srcDir, 'media_1790522635850.jpg'))
    .extract({ left: 100, top: 380, width: 500, height: 350 })
    .resize(800, 600, { fit: 'cover' })
    .jpeg({ quality: 90 })
    .toFile(path.join(outDir, 'vinyl-fence-detail.jpg'));
  console.log('✓ vinyl-fence-detail.jpg created');

  // 3. Black Chain Link Fence Project (1024x768)
  await sharp(path.join(srcDir, 'media_1790522669581.jpg'))
    .resize(1200, 900, { fit: 'cover' })
    .jpeg({ quality: 88 })
    .toFile(path.join(outDir, 'black-chain-link-estate.jpg'));
  console.log('✓ black-chain-link-estate.jpg created');

  // Close-up of Chain link corner & gate line
  await sharp(path.join(srcDir, 'media_1790522669581.jpg'))
    .extract({ left: 300, top: 350, width: 500, height: 380 })
    .resize(800, 600, { fit: 'cover' })
    .jpeg({ quality: 90 })
    .toFile(path.join(outDir, 'chain-link-detail.jpg'));
  console.log('✓ chain-link-detail.jpg created');

  // 4. Testimonial Review card extract (576x1024)
  // Extract the review body: "Total Fence came and installed a fence for my neighbor and I..."
  await sharp(path.join(srcDir, 'media_1790522725263.png'))
    .extract({ left: 20, top: 150, width: 536, height: 420 })
    .resize(600, null)
    .png({ quality: 92 })
    .toFile(path.join(outDir, 'review-email-proof.png'));
  console.log('✓ review-email-proof.png created');

  // 5. Facebook Profile verification snippet (1024x508)
  await sharp(path.join(srcDir, 'media_1790522786307.png'))
    .extract({ left: 30, top: 180, width: 700, height: 320 })
    .resize(600, null)
    .png({ quality: 90 })
    .toFile(path.join(outDir, 'fb-services-proof.png'));
  console.log('✓ fb-services-proof.png created');

  console.log('🎉 All Total Fence assets generated in public/images/demo/total-fence/');
}

processAssets();
