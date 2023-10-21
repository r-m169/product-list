export class LocalStorage {
    static getProducts() {
        const getProductsFromLocalStorage = JSON.parse(localStorage.getItem('products')) || [];
        return getProductsFromLocalStorage;
    }
    static addProduct(product) {
        const getProductsFromStorage = LocalStorage.getProducts();
        getProductsFromStorage.push(product);
        localStorage.setItem('products', JSON.stringify(getProductsFromStorage))
        return getProductsFromStorage;

    }
    static removeProduct(index) {
        const products = LocalStorage.getProducts();
        if (isValid(index, products)) {
            const updatedProducts = products.filter((_, i) => i !== index);
            localStorage.setItem('products', JSON.stringify(updatedProducts));
        }
        function isValid(index, array) {
            index >= 0 && index < array.length
        }
    }
}