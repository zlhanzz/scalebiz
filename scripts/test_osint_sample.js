const puppeteer = require('puppeteer-core');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function cleanUrl(rawUrl) {
  try {
    let url = rawUrl;
    const ruMatch = rawUrl.match(/\/RU=([^/]+)/);
    if (ruMatch) url = decodeURIComponent(ruMatch[1]);
    const u = new URL(url);
    return `${u.origin}${u.pathname}`.replace(/\/+$/, '');
  } catch {
    return rawUrl;
  }
}

function isValidFbPage(url) {
  if (!url || !url.includes('facebook.com')) return false;
  const invalidPaths = [
    '/marketplace', '/login', '/recover', '/help', '/groups',
    '/events', '/watch', '/share', '/search', '/photo', '/posts',
    '/policies', '/privacy', '/terms'
  ];
  return !invalidPaths.some(p => url.toLowerCase().includes(p)) && url.split('/').filter(Boolean).length >= 2;
}

function isValidIgProfile(url) {
  if (!url || !url.includes('instagram.com')) return false;
  const invalidPaths = ['/p/', '/explore', '/tags', '/reel', '/stories', '/accounts', '/about'];
  return !invalidPaths.some(p => url.toLowerCase().includes(p)) && url.split('/').filter(Boolean).length >= 2;
}

async function searchYahoo(page, query) {
  const url = `https://search.yahoo.com/search?p=${encodeURIComponent(query)}`;
  try {
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 12000 });
    return await page.evaluate(() => {
      const items = [];
      document.querySelectorAll('#web ol li, .compList li').forEach(li => {
        const a = li.querySelector('h3 a, a.d-ib, a[href]');
        const p = li.querySelector('.compText, p');
        if (a && a.href) items.push({ href: a.href, title: a.innerText, snippet: p?.innerText || '' });
      });
      return items;
    });
  } catch {
    return [];
  }
}

async function testAuthenticShops() {
  const authenticShops = [
    "Salon Of Essence",
    "Salina Paris Salon",
    "Anthony Paul Salon",
    "Good Looks Barber Shop",
    "Kallista For Hair",
    "LOVEJOY NATURAL HAIR SALON",
    "House of Masters Grooming Lounge",
    "Total Fence of WNY",
    "Burks basement waterproofing",
    "Wishful Inking Tattoos"
  ];

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36');

  for (const shop of authenticShops) {
    console.log(`\n=================== ${shop} ===================`);
    // CORRECT QUERY: Quote only the business name, city unquoted!
    const query = `"${shop}" Buffalo NY`;
    const res = await searchYahoo(page, query);
    let fb = null;
    let ig = null;
    let email = null;
    let yelp = null;

    res.forEach(r => {
      const clean = cleanUrl(r.href);
      const text = `${r.title} ${r.snippet} ${clean}`;

      const em = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
      if (em && !email && !em[0].includes('yahoo.com') && !em[0].includes('example.com')) email = em[0];

      if (!fb && isValidFbPage(clean)) fb = clean;
      if (!ig && isValidIgProfile(clean)) ig = clean;
      if (!yelp && clean.includes('yelp.com/biz')) yelp = clean;
    });

    // If still missing both FB and IG, do social dork
    if (!fb && !ig) {
      const qSocial = `"${shop}" Buffalo (facebook OR instagram)`;
      const resSocial = await searchYahoo(page, qSocial);
      resSocial.forEach(r => {
        const clean = cleanUrl(r.href);
        const text = `${r.title} ${r.snippet} ${clean}`;
        const em = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
        if (em && !email && !em[0].includes('yahoo.com')) email = em[0];
        if (!fb && isValidFbPage(clean)) fb = clean;
        if (!ig && isValidIgProfile(clean)) ig = clean;
      });
    }

    let directDm = '-';
    if (ig) {
      const handle = ig.split('/').filter(Boolean).pop();
      directDm = `https://ig.me/m/${handle}`;
    } else if (fb) {
      const slug = fb.split('/').filter(Boolean).pop();
      directDm = `https://m.me/${slug}`;
    }

    console.log(`   📌 FB Page   : ${fb || '-'}`);
    console.log(`   📌 IG Profile: ${ig || '-'}`);
    console.log(`   📌 Email     : ${email || '-'}`);
    console.log(`   📌 Yelp      : ${yelp || '-'}`);
    console.log(`   💬 Direct DM : ${directDm}`);

    await new Promise(r => setTimeout(r, 600));
  }

  await browser.close();
}

testAuthenticShops();
