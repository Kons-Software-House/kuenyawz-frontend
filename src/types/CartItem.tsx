import { Product } from "./Product";

export type CartItem = {
    cartItemId: bigint;
    note: string;
    product: Product;
    quantity: number;
    selectedVariantId: bigint;
}