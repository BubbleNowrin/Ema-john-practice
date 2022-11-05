import { getStoredCart } from "../utilities/fakedb";

export const productsAndCartData = async () => {

    //get products
    const productsData = await fetch('http://localhost:5000/products');
    const { products } = await productsData.json();


    //get Cart
    const savedCart = getStoredCart();
    // console.log('savedCart', savedCart);
    const initialCart = [];
    for (const id in savedCart) {
        const addedProducts = products.find(product => product._id === id);
        // console.log(id, addedProducts);
        if (addedProducts) {
            const quantity = savedCart[id];
            addedProducts.quantity = quantity;
            initialCart.push(addedProducts);
        }
    }

    return { products, initialCart };

}