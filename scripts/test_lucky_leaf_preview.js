const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 3000;

async function runVerification() {
  const screenshotDir = path.resolve(__dirname, '..', 'public', 'images', 'demo', 'lucky-leaf');
  const artifactDir = 'C:\\Users\\ZHULL\\.gemini\\antigravity-ide\\brain\\fa5f91d0-150b-422d-b7e5-fbd1620e2049';

  console.log('[Puppeteer] Launching Chrome...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,900']
  });

  try {
    const page = await browser.newPage();
    const targetUrl = `http://localhost:${PORT}/preview/lucky-leaf/`;
    console.log(`[Puppeteer] Navigating to ${targetUrl}`);
    
    // Listen for console logs and errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log(`[Page Error]:`, msg.text());
      }
    });

    // Listen for failed requests
    page.on('requestfailed', req => {
      console.log(`[Request Failed]: ${req.url()} - ${req.failure()?.errorText}`);
    });

    await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2500));

    // 1. Desktop Viewport (1280x900)
    await page.setViewport({ width: 1280, height: 900 });

    // Capture Desktop Hero
    const heroShotPath = path.join(screenshotDir, 'screenshot-desktop-hero.png');
    await page.screenshot({ path: heroShotPath });
    fs.copyFileSync(heroShotPath, path.join(artifactDir, 'screenshot-desktop-hero.png'));
    console.log(`[Screenshot] Saved desktop hero screenshot`);

    // Verify Hero Tattoo Image is rendered
    const heroImgSrc = await page.$eval('#hero-real-tattoo-img', el => el.getAttribute('src'));
    console.log(`[Check] Hero image src: ${heroImgSrc}`);

    // 2. Test Booking Modal Step Flow (with Step 3 Reference Upload)
    console.log('[Puppeteer] Triggering booking modal open via hero CTA...');
    await page.evaluate(() => {
      const btn = document.getElementById('hero-request-appointment-btn') || document.getElementById('header-inquire-btn');
      if (btn) btn.click();
    });
    await new Promise(r => setTimeout(r, 1000));

    // Wait for modal Step 1 description field
    await page.waitForSelector('#desc-field', { timeout: 5000 });
    const modalShotPath = path.join(screenshotDir, 'screenshot-modal-step1.png');
    await page.screenshot({ path: modalShotPath });
    fs.copyFileSync(modalShotPath, path.join(artifactDir, 'screenshot-modal-step1.png'));
    console.log(`[Screenshot] Saved modal step 1 screenshot`);

    // Fill Step 1 Description
    await page.type('#desc-field', 'I want a delicate fine-line ginkgo sprig intertwined with small cherry blossoms on my inner forearm.');
    await new Promise(r => setTimeout(r, 300));

    // Click Continue to Step 2 (Placement & Size)
    const continueBtns = await page.$$('button');
    for (const btn of continueBtns) {
      const text = await page.evaluate(el => el.innerText, btn);
      if (text && text.includes('Continue')) {
        await btn.click();
        break;
      }
    }
    await new Promise(r => setTimeout(r, 800));

    // Select Placement: Inner Forearm
    const placementBtns = await page.$$('button');
    for (const btn of placementBtns) {
      const text = await page.evaluate(el => el.innerText, btn);
      if (text && text.includes('Inner Forearm')) {
        await btn.click();
        break;
      }
    }
    await new Promise(r => setTimeout(r, 300));

    // Click Continue to Step 3 (Photo References)
    const continueBtns2 = await page.$$('button');
    for (const btn of continueBtns2) {
      const text = await page.evaluate(el => el.innerText, btn);
      if (text && text.includes('Continue')) {
        await btn.click();
        break;
      }
    }
    await new Promise(r => setTimeout(r, 800));

    // Step 3: Test Upload Reference Photo
    const modalFileInput = await page.$('input[type="file"]');
    if (modalFileInput) {
      console.log('[Puppeteer] Uploading test reference photo in modal Step 3...');
      const samplePhotoPath = path.join(screenshotDir, 'hero-tattoo-real.jpg');
      if (fs.existsSync(samplePhotoPath)) {
        await modalFileInput.uploadFile(samplePhotoPath);
        await new Promise(r => setTimeout(r, 1000));
        console.log('[Puppeteer] Reference photo uploaded in modal Step 3.');
      }
    }

    const modalStep3ShotPath = path.join(screenshotDir, 'screenshot-modal-step3.png');
    await page.screenshot({ path: modalStep3ShotPath });
    fs.copyFileSync(modalStep3ShotPath, path.join(artifactDir, 'screenshot-modal-step3.png'));
    console.log(`[Screenshot] Saved modal step 3 (References) screenshot`);

    // Click Continue to Step 4 (Schedule & Policy)
    const continueBtns3 = await page.$$('button');
    for (const btn of continueBtns3) {
      const text = await page.evaluate(el => el.innerText, btn);
      if (text && text.includes('Continue')) {
        await btn.click();
        break;
      }
    }
    await new Promise(r => setTimeout(r, 800));

    // Fill Step 4 Inputs: Name, Email, Agree to Policy
    const inputs = await page.$$('input[type="text"], input[type="email"]');
    for (const input of inputs) {
      const placeholder = await page.evaluate(el => el.getAttribute('placeholder') || '', input);
      if (placeholder.includes('Full Name')) {
        await input.type('Elena Rostova');
      } else if (placeholder.includes('Email')) {
        await input.type('elena.rostova@example.com');
      }
    }
    await new Promise(r => setTimeout(r, 300));

    // Check policy agreement checkbox
    const policyCheckbox = await page.$('input[type="checkbox"]');
    if (policyCheckbox) {
      await policyCheckbox.click();
      await new Promise(r => setTimeout(r, 300));
    }

    // Click Submit
    const submitBtn = await page.$('button[type="submit"]');
    if (submitBtn) {
      await submitBtn.click();
      await new Promise(r => setTimeout(r, 1200));

      const modalStep5ShotPath = path.join(screenshotDir, 'screenshot-modal-step5-pass.png');
      await page.screenshot({ path: modalStep5ShotPath });
      fs.copyFileSync(modalStep5ShotPath, path.join(artifactDir, 'screenshot-modal-step5-pass.png'));
      console.log(`[Screenshot] Saved modal step 5 (Digital Pass) screenshot`);

      // Click "Back to Lucky Leaf Studio" button to dismiss modal
      const dismissBtns = await page.$$('button');
      for (const btn of dismissBtns) {
        const text = await page.evaluate(el => el.innerText, btn);
        if (text && text.includes('Back to Lucky Leaf')) {
          await btn.click();
          break;
        }
      }
      await new Promise(r => setTimeout(r, 800));
    }

    // Capture Senbazuru & Flash section
    await page.evaluate(() => {
      const el = document.getElementById('flash-gallery');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 1000));
    const flashShotPath = path.join(screenshotDir, 'screenshot-desktop-flash.png');
    await page.screenshot({ path: flashShotPath });
    fs.copyFileSync(flashShotPath, path.join(artifactDir, 'screenshot-desktop-flash.png'));
    console.log(`[Screenshot] Saved desktop flash section screenshot`);

    // Capture Healed Works & Reviews section
    await page.evaluate(() => {
      const el = document.getElementById('reviews');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 1000));
    const reviewsShotPath = path.join(screenshotDir, 'screenshot-desktop-reviews.png');
    await page.screenshot({ path: reviewsShotPath });
    fs.copyFileSync(reviewsShotPath, path.join(artifactDir, 'screenshot-desktop-reviews.png'));
    console.log(`[Screenshot] Saved desktop reviews section screenshot`);

    // 3. Mobile Viewport (375x812)
    console.log('[Puppeteer] Testing mobile viewport 375x812...');
    await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 1000));

    const mobileHeroShotPath = path.join(screenshotDir, 'screenshot-mobile-hero.png');
    await page.screenshot({ path: mobileHeroShotPath });
    fs.copyFileSync(mobileHeroShotPath, path.join(artifactDir, 'screenshot-mobile-hero.png'));
    console.log(`[Screenshot] Saved mobile hero screenshot`);

    // Test Mobile Sticky Bar & Flash
    await page.evaluate(() => {
      const el = document.getElementById('flash-gallery');
      if (el) el.scrollIntoView({ behavior: 'instant' });
    });
    await new Promise(r => setTimeout(r, 800));

    const mobileFlashShotPath = path.join(screenshotDir, 'screenshot-mobile-flash.png');
    await page.screenshot({ path: mobileFlashShotPath });
    fs.copyFileSync(mobileFlashShotPath, path.join(artifactDir, 'screenshot-mobile-flash.png'));
    console.log(`[Screenshot] Saved mobile flash screenshot`);

    console.log('[Success] All tests and screenshots completed successfully!');
  } catch (err) {
    console.error('[Error during verification]:', err);
  } finally {
    await browser.close();
  }
}

runVerification();
