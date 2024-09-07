interface Product {
    id: string;
    name: string;
    image_url: string;
    price: number;
    stock: number;
}

interface ProductState {
    products: Product[];
    selectedProduct: Product;
}
