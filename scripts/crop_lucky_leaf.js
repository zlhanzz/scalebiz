const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function processImages() {
  const offeringDir = path.resolve(__dirname, '..', 'leads', 'OFFERING');
  const userUploadedDir = 'C:\\Users\\ZHULL\\.gemini\\antigravity-ide\\brain\\fa5f91d0-150b-422d-b7e5-fbd1620e2049\\.user_uploaded';
  const outputDir = path.resolve(__dirname, '..', 'public', 'images', 'demo', 'lucky-leaf');

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.log('[Sharp] Processing Lucky Leaf Tattoo assets...');

  // 1. Logo Ginkgo Leaf
  const logoSrc = path.join(userUploadedDir, 'media_1790537403234.png');
  if (fs.existsSync(logoSrc)) {
    await sharp(logoSrc)
      .resize(400, 400, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
      .png()
      .toFile(path.join(outputDir, 'logo-ginkgo.png'));
    console.log('[Sharp] Created logo-ginkgo.png');
  }

  // 2. Real Client Work: Dagger with Cherry Blossoms
  const daggerSrc = path.join(offeringDir, 'Screenshot 2026-09-28 041208.png');
  if (fs.existsSync(daggerSrc)) {
    await sharp(daggerSrc)
      .jpeg({ quality: 90 })
      .toFile(path.join(outputDir, 'work-dagger-cherry.jpg'));
    console.log('[Sharp] Created work-dagger-cherry.jpg');
  }

  // 3. Process Flash Art Pieces
  const flashMap = [
    { file: 'Screenshot 2026-09-28 040944.png', name: 'flash-butterfly-omamori.jpg', crop: { top: 80, bottom: 80 } },
    { file: 'Screenshot 2026-09-28 041053.png', name: 'flash-goldfish-pair.jpg', crop: { top: 80, bottom: 80 } },
    { file: 'Screenshot 2026-09-28 041103.png', name: 'flash-peony.jpg', crop: { top: 80, bottom: 80 } },
    { file: 'Screenshot 2026-09-28 041111.png', name: 'flash-geisha-masks.jpg', crop: { top: 80, bottom: 80 } },
    { file: 'Screenshot 2026-09-28 041124.png', name: 'flash-bluejay.jpg', crop: { top: 80, bottom: 80 } },
    { file: 'Screenshot 2026-09-28 041135.png', name: 'flash-flowing-goldfish.jpg', crop: { top: 80, bottom: 80 } },
  ];

  for (const item of flashMap) {
    const src = path.join(offeringDir, item.file);
    if (fs.existsSync(src)) {
      const meta = await sharp(src).metadata();
      const cropHeight = meta.height - 180;
      await sharp(src)
        .extract({ left: 20, top: 90, width: meta.width - 40, height: cropHeight })
        .resize(600, 800, { fit: 'cover', position: 'center' })
        .jpeg({ quality: 90 })
        .toFile(path.join(outputDir, item.name));
      console.log(`[Sharp] Created ${item.name}`);
    }
  }

  // 4. Crop the 8 individual portfolio works from media_1790540060824.jpg (4 columns x 2 rows)
  const gridSrc = path.join(userUploadedDir, 'media_1790540060824.jpg');
  if (fs.existsSync(gridSrc)) {
    const meta = await sharp(gridSrc).metadata();
    console.log(`[Sharp] Portfolio grid dimensions: ${meta.width}x${meta.height}`);
    const colW = Math.floor(meta.width / 4);
    const rowH = Math.floor(meta.height / 2);

    const portfolioCrops = [
      // Row 0
      { name: 'work-moth.jpg', x: 0, y: 0, title: 'Botanical Moth with Delicate Shading' },
      { name: 'work-lily-valley.jpg', x: colW, y: 0, title: 'Fine-Line Lily of the Valley Clavicle' },
      { name: 'hero-storefront-leaf.jpg', x: colW * 2, y: 0, title: 'Lucky Leaf Hertel Ave Storefront & Ginkgo' },
      { name: 'work-cherry-blossom.jpg', x: colW * 3, y: 0, title: 'Delicate Cherry Blossom Shoulder Piece' },
      // Row 1
      { name: 'work-daffodil.jpg', x: 0, y: rowH, title: 'Botanical Daffodils & Micro Stippling' },
      { name: 'work-ginkgo-tattoo.jpg', x: colW, y: rowH, title: 'Lucky Leaf Ginkgo Icon Tattoo' },
      { name: 'work-tulip.jpg', x: colW * 2, y: rowH, title: 'Minimalist Fine-Line Tulip' },
      { name: 'work-foliage-sleeve.jpg', x: colW * 3, y: rowH, title: 'Organic Botanical Vines & Leaves' }
    ];

    for (const p of portfolioCrops) {
      await sharp(gridSrc)
        .extract({ left: p.x, top: p.y, width: colW, height: rowH })
        .resize(500, 600, { fit: 'cover' })
        .jpeg({ quality: 92 })
        .toFile(path.join(outputDir, p.name));
      console.log(`[Sharp] Extracted ${p.name}`);
    }
  }

  // 5. Google Review Proof
  const reviewProofSrc = path.join(userUploadedDir, 'media_1790540129308.png');
  if (fs.existsSync(reviewProofSrc)) {
    await sharp(reviewProofSrc)
      .png()
      .toFile(path.join(outputDir, 'google-reviews-proof.png'));
    console.log('[Sharp] Created google-reviews-proof.png');
  }

  console.log('[SUCCESS] All Lucky Leaf Tattoo assets processed successfully!');
}

processImages().catch(err => {
  console.error('[Error processing images]', err);
  process.exit(1);
});
