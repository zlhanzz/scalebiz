const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const UPLOAD_DIR = 'C:/Users/ZHULL/.gemini/antigravity-ide/brain/fa5f91d0-150b-422d-b7e5-fbd1620e2049/.user_uploaded';
const OUT_DIR = path.resolve(__dirname, '..', 'public', 'images', 'demo', 'inktellectual');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

async function run() {
  console.log('Processing Inktellectual Tattoo assets...');

  // 1. Logo
  const logoFile = path.join(UPLOAD_DIR, 'media_1790530907281.png');
  await sharp(logoFile)
    .extract({ left: 130, top: 75, width: 764, height: 380 })
    .toFile(path.join(OUT_DIR, 'logo.png'));
  console.log('✓ Extracted logo.png');

  await sharp(logoFile)
    .extract({ left: 370, top: 80, width: 284, height: 160 })
    .toFile(path.join(OUT_DIR, 'logo-mark.png'));
  console.log('✓ Extracted logo-mark.png');

  // 2. Storefront and Team
  const teamFile = path.join(UPLOAD_DIR, 'media_1790530985610.jpg');
  await sharp(teamFile)
    .resize(1024, 768)
    .jpeg({ quality: 90 })
    .toFile(path.join(OUT_DIR, 'storefront-team.jpg'));
  console.log('✓ Saved storefront-team.jpg');

  await sharp(teamFile)
    .extract({ left: 0, top: 140, width: 1024, height: 380 })
    .jpeg({ quality: 90 })
    .toFile(path.join(OUT_DIR, 'storefront-sign.jpg'));
  console.log('✓ Saved storefront-sign.jpg');

  // 3. Student Special Promo Graphic
  const promoFile = path.join(UPLOAD_DIR, 'media_1790531465013.png');
  await sharp(promoFile)
    .extract({ left: 45, top: 15, width: 550, height: 470 })
    .jpeg({ quality: 90 })
    .toFile(path.join(OUT_DIR, 'buff-state-special.jpg'));
  console.log('✓ Saved buff-state-special.jpg');

  // 4. Portfolio Works (10 pieces in 2 rows of 5)
  const portfolioFile = path.join(UPLOAD_DIR, 'media_1790531532821.png');
  const works = [
    // Row 1
    { name: 'work-scarab.jpg', left: 15, top: 0, width: 195, height: 200, title: 'Sacred Scarab Fine-Line', style: 'Fine-Line Geometric' },
    { name: 'work-winged-cross.jpg', left: 218, top: 0, width: 195, height: 200, title: 'Winged Cross Backpiece', style: 'Black & Grey Custom' },
    { name: 'work-skull-clock-eye.jpg', left: 420, top: 0, width: 195, height: 200, title: 'Blue Eye & Skull Clock', style: 'Color Realism' },
    { name: 'work-floral-spine.jpg', left: 620, top: 0, width: 195, height: 200, title: 'Peony Spine Anatomy', style: 'Botanical Fine-Line' },
    { name: 'work-batman-joker.jpg', left: 825, top: 0, width: 185, height: 200, title: 'Dual Batman & Joker', style: 'Illustrative Color' },
    // Row 2
    { name: 'work-galaxy-hourglass.jpg', left: 15, top: 205, width: 195, height: 200, title: 'Cosmic Crystal Hourglass', style: 'Neo-Traditional Color' },
    { name: 'work-moon-chrysanthemum.jpg', left: 218, top: 205, width: 195, height: 200, title: 'Celestial Moon Thigh Piece', style: 'Black & Grey Botanical' },
    { name: 'work-beetlejuice.jpg', left: 420, top: 205, width: 195, height: 200, title: 'Strange & Unusual Banner', style: 'Lettering & Dark Art' },
    { name: 'work-medusa.jpg', left: 620, top: 205, width: 195, height: 200, title: 'Greek Myth Medusa', style: 'Mythology Illustrative' },
    { name: 'work-dragon-beast.jpg', left: 825, top: 205, width: 185, height: 200, title: 'Red-Eye Japanese Beast', style: 'Japanese Neo-Trad' }
  ];

  for (const w of works) {
    await sharp(portfolioFile)
      .extract({ left: w.left, top: w.top, width: w.width, height: w.height })
      .jpeg({ quality: 90 })
      .toFile(path.join(OUT_DIR, w.name));
    console.log(`✓ Saved ${w.name}`);
  }

  // 5. Artist Portraits & Works from media_1790531402377.jpg
  const rosterFile = path.join(UPLOAD_DIR, 'media_1790531402377.jpg');
  // Kobi
  await sharp(rosterFile)
    .extract({ left: 245, top: 55, width: 175, height: 200 })
    .jpeg({ quality: 90 })
    .toFile(path.join(OUT_DIR, 'artist-kobi.jpg'));
  console.log('✓ Saved artist-kobi.jpg');

  // Brandi Vogt
  await sharp(rosterFile)
    .extract({ left: 495, top: 90, width: 170, height: 180 })
    .jpeg({ quality: 90 })
    .toFile(path.join(OUT_DIR, 'artist-brandi.jpg'));
  console.log('✓ Saved artist-brandi.jpg');

  // Mikey Hollywould
  await sharp(rosterFile)
    .extract({ left: 745, top: 55, width: 165, height: 180 })
    .jpeg({ quality: 90 })
    .toFile(path.join(OUT_DIR, 'artist-mikey.jpg'));
  console.log('✓ Saved artist-mikey.jpg');

  // Spyder
  await sharp(rosterFile)
    .extract({ left: 5, top: 590 > 551 ? 360 : 360, width: 165, height: 185 })
    .jpeg({ quality: 90 })
    .toFile(path.join(OUT_DIR, 'artist-spyder.jpg'));
  console.log('✓ Saved artist-spyder.jpg');

  // Dave Pantano
  await sharp(rosterFile)
    .extract({ left: 245, top: 720 > 551 ? 360 : 360, width: 185, height: 185 })
    .jpeg({ quality: 90 })
    .toFile(path.join(OUT_DIR, 'artist-dave.jpg'));
  console.log('✓ Saved artist-dave.jpg');

  // Dominic Soto
  await sharp(rosterFile)
    .extract({ left: 810, top: 360, width: 175, height: 185 })
    .jpeg({ quality: 90 })
    .toFile(path.join(OUT_DIR, 'artist-dominic.jpg'));
  console.log('✓ Saved artist-dominic.jpg');

  // Hummingbird watercolor
  await sharp(rosterFile)
    .extract({ left: 495, top: 590 > 551 ? 360 : 360, width: 165, height: 185 })
    .jpeg({ quality: 90 })
    .toFile(path.join(OUT_DIR, 'work-hummingbird.jpg'));
  console.log('✓ Saved work-hummingbird.jpg');

  console.log('All Inktellectual assets cropped successfully!');
}

run().catch(err => {
  console.error('Error cropping assets:', err);
  process.exit(1);
});
