const http = require('http');
const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 3000;

async function runVerification() {
  const screenshotDir = path.resolve(__dirname, '..', 'public', 'images', 'demo', 'total-fence');
  const artifactDir = 'C:\\Users\\ZHULL\\.gemini\\antigravity-ide\\brain\\fa5f91d0-150b-422d-b7e5-fbd1620e2049';

  console.log('[Puppeteer] Launching Chrome...');
  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--window-size=1280,900']
  });

  try {
    const page = await browser.newPage();
    const targetUrl = `http://localhost:${PORT}/preview/total-fence/`;
    console.log(`[Puppeteer] Navigating to ${targetUrl}`);
    await page.goto(targetUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await new Promise(r => setTimeout(r, 2500));

    await page.setViewport({ width: 1280, height: 900 });

    // 1. Capture Desktop Hero & Trust Indicators
    const heroShotPath = path.join(screenshotDir, 'screenshot-desktop-hero.png');
    await page.screenshot({ path: heroShotPath });
    fs.copyFileSync(heroShotPath, path.join(artifactDir, 'screenshot-desktop-hero.png'));
    console.log(`[Screenshot] Saved desktop hero screenshot`);

    // Check Header Link Single-line Metrics at 1280px
    const headerMetrics1280 = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('.desktop-nav .header-nav-link'));
      return links.map(link => {
        const rect = link.getBoundingClientRect();
        return {
          text: link.innerText,
          height: rect.height,
          isSingleLine: rect.height < 36
        };
      });
    });
    console.log('[Verify] 1280px Header Nav Metrics:', JSON.stringify(headerMetrics1280, null, 2));

    // Capture explicit header screenshot at 1280px
    const headerElement = await page.$('header');
    if (headerElement) {
      const headerShotPath = path.join(screenshotDir, 'screenshot-desktop-header.png');
      await headerElement.screenshot({ path: headerShotPath });
      fs.copyFileSync(headerShotPath, path.join(artifactDir, 'screenshot-desktop-header.png'));
      console.log(`[Screenshot] Saved desktop header screenshot`);
    }

    // Also test at 1100px (Medium laptop viewport)
    await page.setViewport({ width: 1100, height: 800 });
    await new Promise(r => setTimeout(r, 400));
    const headerMetrics1100 = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('.desktop-nav .header-nav-link'));
      return links.map(link => {
        const rect = link.getBoundingClientRect();
        return {
          text: link.innerText,
          height: rect.height,
          isSingleLine: rect.height < 36
        };
      });
    });
    console.log('[Verify] 1100px Laptop Header Nav Metrics:', JSON.stringify(headerMetrics1100, null, 2));
    if (headerElement) {
      const laptopHeaderShotPath = path.join(screenshotDir, 'screenshot-laptop-header.png');
      await headerElement.screenshot({ path: laptopHeaderShotPath });
      fs.copyFileSync(laptopHeaderShotPath, path.join(artifactDir, 'screenshot-laptop-header.png'));
      console.log(`[Screenshot] Saved laptop header screenshot`);
    }

    // Reset back to 1280px for the rest of tests
    await page.setViewport({ width: 1280, height: 900 });
    await new Promise(r => setTimeout(r, 300));

    // 2. Capture Material Cards Section (Screenshot 3 area)
    await page.evaluate(() => {
      const el = document.getElementById('materials');
      if (el) el.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 600));

    const materialsShotPath = path.join(screenshotDir, 'screenshot-material-cards.png');
    await page.screenshot({ path: materialsShotPath });
    fs.copyFileSync(materialsShotPath, path.join(artifactDir, 'screenshot-material-cards.png'));
    console.log(`[Screenshot] Saved material cards screenshot`);

    // 3. Capture Good Neighbor Program Section (Screenshot 4 area)
    await page.evaluate(() => {
      const el = document.getElementById('neighbor-program');
      if (el) el.scrollIntoView();
    });
    await new Promise(r => setTimeout(r, 600));

    const neighborShotPath = path.join(screenshotDir, 'screenshot-good-neighbor.png');
    await page.screenshot({ path: neighborShotPath });
    fs.copyFileSync(neighborShotPath, path.join(artifactDir, 'screenshot-good-neighbor.png'));
    console.log(`[Screenshot] Saved Good Neighbor Co-Op screenshot`);

    // 4. Scroll back to top & open Cost Estimator Modal
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 400));

    console.log('[Interaction] Opening Cost Estimator Modal...');
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll('button'));
      const estBtn = buttons.find(b => b.innerText.includes('Estimate Fence Cost Online'));
      if (estBtn) estBtn.click();
    });
    await new Promise(r => setTimeout(r, 600));

    const estModalShotPath = path.join(screenshotDir, 'screenshot-estimator-modal.png');
    await page.screenshot({ path: estModalShotPath });
    fs.copyFileSync(estModalShotPath, path.join(artifactDir, 'screenshot-estimator-modal.png'));
    console.log(`[Screenshot] Saved Estimator Modal screenshot`);

    // Close Modal
    await page.evaluate(() => {
      const closeBtn = document.querySelector('button[aria-label="Close modal"]');
      if (closeBtn) closeBtn.click();
    });
    await new Promise(r => setTimeout(r, 400));

    // 5. Test Mobile Viewport (375x812)
    console.log('[Viewport Test] Testing Mobile Responsiveness (375x812)...');
    await page.setViewport({ width: 375, height: 812, isMobile: true, hasTouch: true });
    await new Promise(r => setTimeout(r, 600));

    const mobileMetrics = await page.evaluate(() => {
      const scrollWidth = document.documentElement.scrollWidth;
      const innerWidth = window.innerWidth;
      const stickyBar = document.querySelector('.mobile-sticky-bar');
      const heroIntro = document.querySelector('.hero-intro');
      const heroVisual = document.querySelector('.hero-visual');
      const heroActions = document.querySelector('.hero-actions');
      const heroTrust = document.querySelector('.hero-trust');

      const introRect = heroIntro ? heroIntro.getBoundingClientRect() : null;
      const visualRect = heroVisual ? heroVisual.getBoundingClientRect() : null;
      const actionsRect = heroActions ? heroActions.getBoundingClientRect() : null;
      const trustRect = heroTrust ? heroTrust.getBoundingClientRect() : null;

      const desktopHeaderActions = document.querySelector('.desktop-header-actions');
      const desktopNav = document.querySelector('.desktop-nav');
      const hamburger = document.querySelector('.mobile-hamburger');

      return {
        scrollWidth,
        innerWidth,
        hasHorizontalScroll: scrollWidth > innerWidth,
        hasStickyMobileBar: !!stickyBar,
        stickyBarContent: stickyBar ? stickyBar.innerText.replace(/\n/g, ' ') : null,
        headerCleanliness: {
          desktopNavHidden: desktopNav ? window.getComputedStyle(desktopNav).display === 'none' : true,
          desktopHeaderActionsHidden: desktopHeaderActions ? window.getComputedStyle(desktopHeaderActions).display === 'none' : true,
          hamburgerVisible: hamburger ? window.getComputedStyle(hamburger).display !== 'none' : false
        },
        heroMobileOrdering: {
          introTop: introRect ? introRect.top : 0,
          visualTop: visualRect ? visualRect.top : 0,
          actionsTop: actionsRect ? actionsRect.top : 0,
          trustTop: trustRect ? trustRect.top : 0,
          isVisualAboveActions: visualRect && actionsRect ? visualRect.top < actionsRect.top : false
        }
      };
    });
    console.log('[Verify] Mobile Metrics & Order:', JSON.stringify(mobileMetrics, null, 2));

    const mobileShotPath = path.join(screenshotDir, 'screenshot-mobile-view.png');
    await page.screenshot({ path: mobileShotPath });
    fs.copyFileSync(mobileShotPath, path.join(artifactDir, 'screenshot-mobile-view.png'));
    console.log(`[Screenshot] Saved Mobile View screenshot`);

    // 6. Test Mobile Hamburger Drawer Interaction
    console.log('[Interaction] Testing Mobile Hamburger Drawer...');
    await page.evaluate(() => {
      const hamburger = document.querySelector('.mobile-hamburger');
      if (hamburger) hamburger.click();
    });
    await new Promise(r => setTimeout(r, 500));

    const drawerShotPath = path.join(screenshotDir, 'screenshot-mobile-drawer.png');
    await page.screenshot({ path: drawerShotPath });
    fs.copyFileSync(drawerShotPath, path.join(artifactDir, 'screenshot-mobile-drawer.png'));
    console.log(`[Screenshot] Saved Mobile Drawer screenshot`);

    // Close Hamburger Drawer
    await page.evaluate(() => {
      const hamburger = document.querySelector('.mobile-hamburger');
      if (hamburger) hamburger.click();
    });
    await new Promise(r => setTimeout(r, 400));

    // Capture Scrolled Mobile Hero showing image and 2 buttons together
    await page.evaluate(() => window.scrollBy(0, 360));
    await new Promise(r => setTimeout(r, 400));
    const mobileHeroButtonsPath = path.join(screenshotDir, 'screenshot-mobile-hero-buttons.png');
    await page.screenshot({ path: mobileHeroButtonsPath });
    fs.copyFileSync(mobileHeroButtonsPath, path.join(artifactDir, 'screenshot-mobile-hero-buttons.png'));
    console.log(`[Screenshot] Saved Mobile Hero Buttons screenshot`);
    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise(r => setTimeout(r, 300));

    // 7. Test Mobile Floating "Book Free Measure" Button Interaction
    console.log('[Interaction] Testing Mobile Sticky "Book Free Measure" Button...');
    await page.evaluate(() => {
      const stickyBar = document.querySelector('.mobile-sticky-bar');
      if (stickyBar) {
        const bookBtn = Array.from(stickyBar.querySelectorAll('button')).find(b => b.innerText.includes('Book Free Measure'));
        if (bookBtn) bookBtn.click();
      }
    });
    await new Promise(r => setTimeout(r, 600));

    const mobileBookingModalPath = path.join(screenshotDir, 'screenshot-mobile-booking-modal.png');
    await page.screenshot({ path: mobileBookingModalPath });
    fs.copyFileSync(mobileBookingModalPath, path.join(artifactDir, 'screenshot-mobile-booking-modal.png'));
    console.log(`[Screenshot] Saved Mobile Booking Modal screenshot`);

    console.log('\n========================================');
    console.log('✅ ALL VERIFICATIONS & SCREENSHOTS COMPLETED!');
    console.log('========================================');
  } catch (err) {
    console.error('❌ Verification failed:', err);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
}

runVerification();
