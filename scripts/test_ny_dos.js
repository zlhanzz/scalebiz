async function testNYCorp() {
  try {
    const url = 'https://data.ny.gov/resource/n9v6-gdp6.json?$limit=3';
    console.log('Querying NY DOS:', url);
    const res = await fetch(url);
    console.log('Status:', res.status);
    const data = await res.json();
    console.log('Fields:', Object.keys(data[0]));
    console.log('Sample Corp:', JSON.stringify(data[0], null, 2));
  } catch (e) {
    console.log('Error:', e.message);
  }
}
testNYCorp();
