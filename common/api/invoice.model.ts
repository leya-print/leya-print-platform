import { Address } from './address.model';

export interface Invoice {
    sender: {
        address: Address,
        vatIdent: string,
    };
    recipient: {
        address: Address,
    };
    invoiceNo: string,
    customerReference?: string,
    date: string;
}