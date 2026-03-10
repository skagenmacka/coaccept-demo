import 'dotenv/config';

const defaultHeaders = {
  'Authorization': `Bearer ${process.env.COACCEPT_SK}`,
  'Content-Type': 'application/json'
};

(async () => {
  // create invoice
  const createRes = await fetch(`${process.env.COACCEPT_API_URL}/invoices`, {
    method: 'POST',
    headers: defaultHeaders
  });

  if (!createRes.ok || createRes.status !== 201) {
    console.error(createRes.statusText);
    return;
  }

  const invoice = await createRes.json();
  console.log(invoice);

  // add article to invoice
  const addRes = await fetch(`${process.env.COACCEPT_API_URL}/invoices/${invoice.data.id}/rows`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({
      name: 'Rent',
      price: 100000, // 1000,00 SEK
      vat: 0,         // 0% 

      quantity: 1 // optional
    })
  });

  if (!addRes.ok || addRes.status !== 200) {
    console.error(addRes.statusText);
    return;
  }

  const articleAdded = await addRes.json();
  console.log(articleAdded);

  // send invoice
  const sendRes = await fetch(`${process.env.COACCEPT_API_URL}/invoices/${invoice.data.id}/email`, {
    method: 'POST',
    headers: defaultHeaders
  });

  if (!sendRes.ok || sendRes.status !== 200) {
    console.error(sendRes.statusText);
    return;
  }

  const send = await sendRes.json();
  console.log(send);
})();

