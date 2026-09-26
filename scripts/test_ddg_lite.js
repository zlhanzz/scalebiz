async function testDDGLite() {
  const business = "Sandy's Barber Stylist For Men";
  const query = `"${business}" Lockport NY`;
  const url = `https://lite.duckduckgo.com/lite/`;
  
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    },
    body: `q=${encodeURIComponent(query)}`
  });

  const html = await res.text();
  console.log('DDG Lite status:', res.status, 'HTML length:', html.length);
  
  // Extract links
  const linkMatches = [...html.matchAll(/class=["']result-link["'][^>]*href=["']([^"']+)["']/g)].map(m => m[1]);
  console.log('Result links:', linkMatches);

  // Extract all hrefs
  const allHrefs = [...html.matchAll(/href=["'](https?:\/\/[^"']+)["']/g)].map(m => m[1]);
  const externalHrefs = allHrefs.filter(h => !h.includes('duckduckgo.com'));
  console.log('External hrefs count:', externalHrefs.length);
  externalHrefs.slice(0, 15).forEach((h, i) => console.log(`[${i+1}] ${h}`));
}

testDDGLite();
