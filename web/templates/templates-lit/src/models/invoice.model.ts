import {Address} from './address.model';

export interface InvoicePosition {
  title: string;
  quantity: number;
  unit: string;
  pricePerUnit: number;
  vatPercent: number;
}

export interface Invoice {
  sender: {
    address: Address;
    vatIdent: string;
    phone: string;
    email: string;
    web: string;
    bankDetails: {
      name: string;
      iban: string;
      bic: string;
    };
  };
  recipient: {
    address: Address;
  };
  invoiceNo: string;
  customerReference?: string;
  date: string;
  positions: InvoicePosition[];
}
