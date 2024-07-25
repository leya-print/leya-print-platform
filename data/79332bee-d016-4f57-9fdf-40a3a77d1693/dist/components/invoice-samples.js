const maxHardware = {
  address: {
    company: 'Max Hardware Ltd.',
    street1: 'Industry Park 128-48',
    zipCode: '654321',
    city: 'Industry City',
  },
  vatIdent: 'DE293401223',
  phone: '+1 (636) 555-0113',
  email: 'leya-print@code-better.it',
  web: 'https://leya-print.net-root.de',
  bankDetails: {
    name: 'Black-List-Bank',
    iban: 'GB78BARCO0201530093459',
    bic: 'BLCKUS203DS',
  }
};
const customer = {
  address: {
    firstName: 'Sample',
    lastName: 'Customer',
    street1: 'Mainstreet 5a',
    zipCode: '123456',
    city: 'Small Town',
  },
};
const invoiceSamples = {
  'invoice-001': {
    invoiceNo: '239045001',
    customerReference: 'project: leya-print\nwork-item: invoice-sample',
    sender: maxHardware,
    recipient: customer,
    date: '2022-07-08T15:55:34.315Z',
    positions: [
      {
        title: 'Big Hammer',
        quantity: 1,
        unit: 'pcs',
        pricePerUnit: 99,
        vatPercent: 8.91,
      },
      {
        title: 'Screws 80mm',
        quantity: 100,
        unit: 'pcs',
        pricePerUnit: .02,
        vatPercent: 8.91,
      },
    ],
  },
};

export { invoiceSamples as i };
