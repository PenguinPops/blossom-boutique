import Cookies from 'js-cookie';

// Cart utility functions
const CART_COOKIE_KEY = 'cart';

interface CartItem {
  productId: number;
  quantity: number;
  productName: string;
  productPrice: number;
  image: string;
}

// Retrieve the cart from the cookie
export const getCart = (): CartItem[] => {
  const cart = Cookies.get(CART_COOKIE_KEY);
  return cart ? JSON.parse(cart) : [];
};

// Save the cart to the cookie
export const saveCart = (cart: CartItem[]) => {
  Cookies.set(CART_COOKIE_KEY, JSON.stringify(cart), { expires: 7 }); // Cookie expires in 7 days
};

// Add an item to the cart
export const addToCart = (item: CartItem) => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex((cartItem) => cartItem.productId === item.productId);

  if (existingItemIndex >= 0) {
    // If item already exists, update the quantity
    cart[existingItemIndex].quantity += item.quantity;
  } else {
    // Otherwise, add new item
    cart.push(item);
  }

  saveCart(cart);
};

// Remove an item from the cart
export const removeFromCart = (productId: number) => {
  const cart = getCart().filter(item => item.productId !== productId);
  saveCart(cart);
};

// Clear the cart
export const clearCart = () => {
  Cookies.remove(CART_COOKIE_KEY);
};
