import { Product, Variant } from "./Product";

export type Order = {
    coordinates: {
        latitude: number;
        longitude: number;
    };
    createdAt: string;
    deliveryFee: number;
    deliveryOption: string;
    eventDate: string;
    fullAddress: string;
    purchaseId: string;
    purchaseItems: {
        boughtPrice: number;
        note: string;
        product: Product;
        purchaseItemId: bigint;
        quantity: number;
        variant: Variant;
    }[];
    status: string;
    transactions: {
        accountId: string | null;
        amount: number;
        createdAt: string;
        expiresAt: string;
        finalizesAt: string;
        paymentType: string;
        paymentUrl: string;
        purchaseId: string | null;
        reference: string | null;
        status: string;
        transactionId: bigint;
    }[];
}
