const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const srcDir = 'C:/Users/ZHULL/.gemini/antigravity-ide/brain/7b3a35e4-167e-4bef-873c-489721e019b2/.user_uploaded/';
const outDir = path.join(__dirname, '../public/images/demo/fh-land');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function processImages() {
  console.log('Extracting FH Land Services assets...');

  // 1. Logo
  await sharp(path.join(srcDir, 'media_1790480000099.png'))
    .trim()
    .resize(600, null, { withoutEnlargement: true })
    .png({ quality: 95 })
    .toFile(path.join(outDir, 'logo.png'));
  console.log('✓ logo.png created');

  // 2. Team Member / Story Photo from Facebook post
  // In media_1790480190182.png (1024x495), the vertical photo is on the left
  await sharp(path.join(srcDir, 'media_1790480190182.png'))
    .extract({ left: 150, top: 0, width: 370, height: 495 })
    .jpeg({ quality: 90 })
    .toFile(path.join(outDir, 'team-story.jpg'));
  console.log('✓ team-story.jpg created');

  // 3. Project Photos from media_1790480087702.png (1024x391, 5 columns x 2 rows)
  // Each card width is roughly ~190-200px, height ~185-190px
  // Grid layout analysis:
  // Col 0: 42 to 230
  // Col 1: 234 to 422
  // Col 2: 428 to 616
  // Col 3: 622 to 810
  // Col 4: 816 to 1004
  // Row 0: 18 to 192
  // Row 1: 202 to 376

  const grid1 = path.join(srcDir, 'media_1790480087702.png');
  const cropList1 = [
    { name: 'mulch-estate-1.jpg', left: 42, top: 18, width: 188, height: 174 },
    { name: 'mulch-estate-2.jpg', left: 234, top: 18, width: 188, height: 174 },
    { name: 'lawn-sign.jpg', left: 428, top: 18, width: 188, height: 174 },
    { name: 'curved-bed-edging.jpg', left: 622, top: 202, width: 188, height: 174 },
    { name: 'flowering-tree-mulch.jpg', left: 816, top: 202, width: 188, height: 174 }
  ];

  for (const c of cropList1) {
    await sharp(grid1)
      .extract(c)
      .resize(600, 500, { fit: 'cover' })
      .jpeg({ quality: 88 })
      .toFile(path.join(outDir, c.name));
    console.log(`✓ ${c.name} created`);
  }

  // 4. Project Photos from media_1790480128148.jpg (1024x418, 5 columns x 2 rows)
  const grid2 = path.join(srcDir, 'media_1790480128148.jpg');
  const cropList2 = [
    { name: 'lawn-striping-estate.jpg', left: 428, top: 215, width: 188, height: 185 },
    { name: 'sidewalk-striping.jpg', left: 622, top: 215, width: 188, height: 185 },
    { name: 'large-turf-stripes.jpg', left: 816, top: 215, width: 188, height: 185 },
    { name: 'brick-manor-lawn.jpg', left: 428, top: 28, width: 188, height: 185 },
    { name: 'commercial-mower.jpg', left: 42, top: 28, width: 188, height: 185 }
  ];

  for (const c of cropList2) {
    await sharp(grid2)
      .extract(c)
      .resize(600, 500, { fit: 'cover' })
      .jpeg({ quality: 88 })
      .toFile(path.join(outDir, c.name));
    console.log(`✓ ${c.name} created`);
  }

  // 5. Generate a high-res Hero Image for FH Land Services
  // Using curved-bed-edging or mulch-estate-1 as hero, or sharp compositing
  await sharp(path.join(outDir, 'mulch-estate-2.jpg'))
    .resize(1200, 750, { fit: 'cover' })
    .jpeg({ quality: 92 })
    .toFile(path.join(outDir, 'hero-landscape.jpg'));
  console.log('✓ hero-landscape.jpg created');

  console.log('All FH Land Services assets extracted successfully!');
}

processImages().catch(err => {
  console.error('Error processing images:', err);
});
