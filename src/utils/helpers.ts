export const filterProduct = (keyword: string, product: Product[]) => {
    const filteredProduct: Product[] = [];
    product.map((item) => {
        if (item.name.toLowerCase().indexOf(keyword) > -1) {
            filteredProduct.push(item);
        }
    });

    return filteredProduct;
};

export const sortProduct = (key: string, product: Product[]) => {
    const [type, by] = key.split("-");
    if (by == "stock" && type == "asc") {
        return product.sort((a, b) => a.stock - b.stock);
    } else if (by == "stock" && type == "desc") {
        return product.sort((a, b) => b.stock - a.stock);
    } else if (by == "price" && type == "asc") {
        return product.sort((a, b) => a.price - b.price);
    } else if (by == "price" && type == "desc") {
        return product.sort((a, b) => b.price - a.price);
    }
};
