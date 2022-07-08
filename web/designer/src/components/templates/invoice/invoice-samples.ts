import { Invoice } from '@leya-print/common-api';

const maxHardware: Invoice['sender'] = {
  address: {
    company: 'Max Hardware Ltd.',
    street1: 'Industry Park 128-48',
    zipCode: '654321',
    city: 'Industry City',
  },
  vatIdent: 'DE293401223',
}

const customer: Invoice['recipient'] = {
  address: {
    firstName: 'Sample',
    lastName: 'Customer',
    street1: 'Mainstreet 5a',
    zipCode: '123456',
    city: 'Small Town',
  },
}


export const invoiceSamples: { [id: string]: Invoice } = {
  'invoice-001': {
    invoiceNo: '239045001',
    customerReference: 'project: leya-print\nwork-item: invoice-sample',
    sender: maxHardware,
    recipient: customer,
    date: '2022-07-08T15:55:34.315Z',
  },
}
