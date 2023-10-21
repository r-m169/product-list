import { LocalStorage } from "./localstorage.js";
import { ProductItem } from "./productItem.js";

document.addEventListener('DOMContentLoaded', () => {
    const productInput = document.getElementById('product-input');
    const priceInput = document.getElementById('price-input');
    const addButton = document.getElementById('add-button');
    const productListContainer = document.querySelector('.grid-item-4');
    const totalPrice = document.querySelector('.grid-item-8');
    const products = LocalStorage.getProducts();

    function updateProductList(){
        productListContainer.innerHTML = '';
        for(let i = 0 ; i<products.length;i++){
            const product = products[i];
            productListContainer.innerHTML += renderProduct(product,i);
        }
        updateTotalPrice();
    }
    function renderProduct(product,index){
        return `
        <div class="mini-list-container">
            <div class="grid-item">${product.name}</div>
            <div class="grid-item">${product.price}</div>
            <button class="remove-button" data-index="${index}">x</button>
        </div>
    `;
    }
    function updateTotalPrice(){
        let total = 0;
        for(const product of products){
            total+=parseFloat(product.price);
        }
        totalPrice.textContent = `Total Price : ${total}`;
    }
    addButton.addEventListener('click', () => {
        const name = productInput.value;
        const price = priceInput.value;

        if (name && price) {
            const product = new ProductItem(name, price);
            products.push(product);
            LocalStorage.addProduct(product);

            updateProductList();
            productInput.value = '';
            priceInput.value = '';
        }
    });

    productListContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-button')) {
            const index = e.target.getAttribute('data-index');
            if (index !== null) {
                LocalStorage.removeProduct(index);

                products.splice(index, 1);
                updateProductList();
            }
        }
    });

    updateProductList();
});

// console.log(localStorage.removeItem('products'))