export type Product = {
    productId: bigint
    name: string
    tagline: string
    description: string
    available: boolean
    category: "CAKE" | "PASTRY" | "PASTA" | "PIE" | "OTHER"
    variants: Variant[]
    images: string[]
}

export type Variant = {
    variantId: bigint
    price: number
    type: string
    minQuantity: number
    maxQuantity: number
}