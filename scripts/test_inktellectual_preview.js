const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 3000;

async function runVerification() {
  const screenshotDir = path.resolve(__dirname, '..', 'public', 'images', 'demo', 'inktellectual');
  const artifactDir = 'C:\\Users\\ZHULL\\.gemini\\antigravity-ide\\brain\\fa5f91d0-150b-422d-b7e5-fbd1620e2049';

  console.log('[Puppeteer] Launching Chrome...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,900']
  });

  try {
    const page = await browser.newPage();
    const targetUrl = `http://localhost:${PORT}/preview/inktellectual/`;
    console.log(`[Puppeteer] Navigating to ${targetUrl}`);
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2500));

    await page.setViewport({ width: 1280, height: 900 });

    // 1. Capture Desktop Hero
    const heroShotPath = path.join(screenshotDir, 'screenshot-desktop-hero.png');
    await page.screenshot({ path: heroShotPath });
    fs.copyFileSync(heroShotPath, path.join(artifactDir, 'screenshot-inktellectual-desktop-hero.png'));
    console.log(`[Screenshot] Saved desktop hero screenshot`);

    // 2. Check Header Link Metrics at 1280px
    const headerMetrics = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('.desktop-nav-menu .nav-link'));
      return links.map(link => {
        const rect = link.getBoundingClientRect();
        return {
          text: link.innerText,
          height: rect.height,
          isSingleLine: rect.height < 36
        };
      });
    });
    console.log('[Verify] 1280px Header Nav Metrics:', JSON.stringify(headerMetrics, null, 2));

    // Capture explicit header
    const headerElement = await page.$('header');
    if (headerElement) {
      const headerShotPath = path.join(screenshotDir, 'screenshot-desktop-header.png');
      await headerElement.screenshot({ path: headerShotPath });
      fs.copyFileSync(headerShotPath, path.join(artifactDir, 'screenshot-inktellectual-desktop-header.png'));
      console.log(`[Screenshot] Saved desktop header screenshot`);
    }

    // 3. Scroll down to Resident Artists section and capture
    await page.evaluate(() => {
      const el = document.getElementById('artists');
      if (el) el.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 800));
    const artistsShotPath = path.join(screenshotDir, 'screenshot-artists-roster.png');
    await page.screenshot({ path: artistsShotPath });
    fs.copyFileSync(artistsShotPath, path.join(artifactDir, 'screenshot-inktellectual-artists.png'));
    console.log(`[Screenshot] Saved resident artists roster screenshot`);

    // 4. Test opening Estimator Modal
    console.log('[Test] Testing Estimator Modal...');
    await page.evaluate(() => {
      // Find button that says "Estimate Tattoo"
      const buttons = Array.from(document.querySelectorAll('button'));
      const estBtn = buttons.find(b => b.textContent && b.textContent.includes('Estimate'));
      if (estBtn) estBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    const estimatorShotPath = path.join(screenshotDir, 'screenshot-estimator-modal.png');
    await page.screenshot({ path: estimatorShotPath });
    fs.copyFileSync(estimatorShotPath, path.join(artifactDir, 'screenshot-inktellectual-estimator.png'));
    console.log(`[Screenshot] Saved estimator modal screenshot`);

    // Close estimator modal
    await page.evaluate(() => {
      const closeBtn = document.querySelector('button[aria-label="Close modal"]');
      if (closeBtn) closeBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));

    // 5. Test opening Booking Modal & File Upload
    console.log('[Test] Testing Booking Modal with Reference Photo Upload...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const bookBtn = buttons.find(b => b.textContent && b.textContent.includes('Consultation Desk'));
      if (bookBtn) bookBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    // Upload a test reference image file
    const sampleImagePath = path.join(screenshotDir, 'work-dragon-beast.jpg');
    console.log(`[Test] Attaching reference photo from: ${sampleImagePath}`);
    const fileInput = await page.$('input[type="file"]');
    if (fileInput) {
      await fileInput.uploadFile(sampleImagePath);
      await new Promise(r => setTimeout(r, 1200));
    }

    const bookingShotPath = path.join(screenshotDir, 'screenshot-booking-upload.png');
    await page.screenshot({ path: bookingShotPath });
    fs.copyFileSync(bookingShotPath, path.join(artifactDir, 'screenshot-inktellectual-booking-upload.png'));
    console.log(`[Screenshot] Saved booking modal with uploaded reference screenshot`);

    // Proceed to Step 2
    console.log('[Test] Proceeding to Step 2 & Submitting Form...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const nextBtn = buttons.find(b => b.textContent && b.textContent.includes('Continue to Date'));
      if (nextBtn) nextBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));

    // Fill in Step 2 fields
    await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input'));
      const dateInput = inputs.find(i => i.type === 'date');
      if (dateInput) dateInput.value = '2026-10-05';
      const textInputs = inputs.filter(i => i.type === 'text' || i.type === 'tel' || i.type === 'email');
      if (textInputs[0]) textInputs[0].value = 'Alex Rivers';
      if (textInputs[1]) textInputs[1].value = '(716) 555-0199';
      if (textInputs[2]) textInputs[2].value = 'alex.rivers@buffalostate.edu';

      // Trigger change events
      inputs.forEach(i => i.dispatchEvent(new Event('input', { bubbles: true })));
      inputs.forEach(i => i.dispatchEvent(new Event('change', { bubbles: true })));

      // Submit form
      const form = document.querySelector('form');
      if (form) form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });
    await new Promise(r => setTimeout(r, 1000));

    const confirmedTicketShotPath = path.join(screenshotDir, 'screenshot-booking-ticket.png');
    await page.screenshot({ path: confirmedTicketShotPath });
    fs.copyFileSync(confirmedTicketShotPath, path.join(artifactDir, 'screenshot-inktellectual-booking-ticket.png'));
    console.log(`[Screenshot] Saved confirmed consultation ticket with reference photo screenshot`);

    // Close booking modal
    await page.evaluate(() => {
      const doneBtn = Array.from(document.querySelectorAll('button')).find(b => b.textContent === 'Done');
      if (doneBtn) doneBtn.click();
      const closeBtn = document.querySelector('button[aria-label="Close"]');
      if (closeBtn) closeBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));

    // 6. Test opening Buff State Student Voucher Modal
    console.log('[Test] Testing Student Voucher Modal...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const voucherBtn = buttons.find(b => b.textContent && b.textContent.includes('Claim $20 Pass'));
      if (voucherBtn) voucherBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    const voucherShotPath = path.join(screenshotDir, 'screenshot-voucher-modal.png');
    await page.screenshot({ path: voucherShotPath });
    fs.copyFileSync(voucherShotPath, path.join(artifactDir, 'screenshot-inktellectual-voucher.png'));
    console.log(`[Screenshot] Saved voucher modal screenshot`);

    // Close voucher modal
    await page.evaluate(() => {
      const closeBtn = document.querySelector('button[aria-label="Close"]');
      if (closeBtn) closeBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));

    // 7. Mobile Viewport Test (375px width, iPhone SE / X standard)
    console.log('[Test] Testing Mobile Viewport (375x812)...');
    await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 600));

    // Check horizontal overflow
    const mobileMetrics = await page.evaluate(() => {
      const root = document.documentElement;
      const body = document.body;
      const stickyBar = document.querySelector('.mobile-sticky-bar');
      const stickyDisplay = stickyBar ? window.getComputedStyle(stickyBar).display : 'none';
      return {
        clientWidth: root.clientWidth,
        scrollWidth: root.scrollWidth,
        hasHorizontalOverflow: root.scrollWidth > root.clientWidth,
        stickyBarVisible: stickyDisplay !== 'none'
      };
    });
    console.log('[Verify] Mobile 375px Metrics:', JSON.stringify(mobileMetrics, null, 2));

    const mobileHeroShotPath = path.join(screenshotDir, 'screenshot-mobile-view.png');
    await page.screenshot({ path: mobileHeroShotPath });
    fs.copyFileSync(mobileHeroShotPath, path.join(artifactDir, 'screenshot-inktellectual-mobile-view.png'));
    console.log(`[Screenshot] Saved mobile view screenshot`);

    // Capture mobile hero flow (scrolled to show photo above reviews)
    await page.evaluate(() => window.scrollTo(0, 520));
    await new Promise(r => setTimeout(r, 400));
    const mobileHeroFlowPath = path.join(screenshotDir, 'screenshot-mobile-hero-flow.png');
    await page.screenshot({ path: mobileHeroFlowPath });
    fs.copyFileSync(mobileHeroFlowPath, path.join(artifactDir, 'screenshot-inktellectual-mobile-hero-flow.png'));
    console.log(`[Screenshot] Saved mobile hero flow screenshot`);

    // Capture mobile student special
    console.log('[Test] Scrolling to Student Special on Mobile...');
    await page.evaluate(() => {
      const el = document.getElementById('student-special');
      if (el) el.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 600));
    const mobileStudentShotPath = path.join(screenshotDir, 'screenshot-mobile-student.png');
    await page.screenshot({ path: mobileStudentShotPath });
    fs.copyFileSync(mobileStudentShotPath, path.join(artifactDir, 'screenshot-inktellectual-mobile-student.png'));
    console.log(`[Screenshot] Saved mobile student special screenshot`);

    // Test mobile drawer
    console.log('[Test] Opening Mobile Drawer...');
    await page.evaluate(() => {
      window.scrollTo(0, 0);
      const menuBtn = document.querySelector('.mobile-menu-btn');
      if (menuBtn) menuBtn.click();
    });
    await new Promise(r => setTimeout(r, 500));

    const mobileDrawerShotPath = path.join(screenshotDir, 'screenshot-mobile-drawer.png');
    await page.screenshot({ path: mobileDrawerShotPath });
    fs.copyFileSync(mobileDrawerShotPath, path.join(artifactDir, 'screenshot-inktellectual-mobile-drawer.png'));
    console.log(`[Screenshot] Saved mobile drawer screenshot`);

    console.log('\n[SUCCESS] All Inktellectual Tattoo preview checks and screenshots completed!');
  } catch (err) {
    console.error('[Puppeteer Error]', err);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

runVerification();
