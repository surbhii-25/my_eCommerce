import { createContext, useReducer} from 'react';

import {createAction} from '../utils/reducer/reducer.utils'

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (cartItem) => cartItem.id === productToAdd.id
    );

    if(existingCartItem){
        return cartItems.map((cartItem)=>
            cartItem.id === productToAdd.id
                ? {...cartItem, quantity: cartItem.quantity+1}
                : cartItem
        );
    }

    return [...cartItems, {...productToAdd, quantity: 1}];
};

const removeCartItem = (cartItems, productToRemove) =>{

    const existingCartItem = cartItems.find(
        (cartItem)=> cartItem.id === productToRemove.id
    )

    if(existingCartItem.quantity===1){
        return cartItems.filter((cartItem)=>cartItem.id !== productToRemove.id)
    }

    if(existingCartItem){
        return cartItems.map((cartItem)=>
                cartItem.id === productToRemove.id
                    ? {...cartItem, quantity: cartItem.quantity-1}
                : cartItem
        )
    }
}

const clearCartItem = (cartItems, cartItemToClear)=>{
    return cartItems.filter((cartItem)=> cartItem.id !== cartItemToClear.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartItemCount: 0, 
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartTotal: 0,
});

const CART_ACTION_TYPES = {
    SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
    SET_CART_ITEMS: 'SET_CART_ITEMS'
};

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartItemCount: 0, 
    cartTotal: 0,
}

const cartReducer = (state, action)=>{
    const {type, payload} = action;

    switch(type){
        case CART_ACTION_TYPES.SET_CART_ITEMS:
            return{
                ...state,
                ...payload,
            };
        case CART_ACTION_TYPES.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen: payload,
            };
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
};



export const CartProvider = ({children}) => {
    // const [isCartOpen, setIsCartOpen] = useState(false);
    const [{cartItems,isCartOpen, cartItemCount, cartTotal}, dispatch] = useReducer(
        cartReducer,
        INITIAL_STATE
    );

    const updateCartItemsReducer = (newCartItems) => {
        const newCartItemCount = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity,0
        );

        const newCartTotal = newCartItems.reduce(
            (total, cartItem) => total + cartItem.quantity * cartItem.price,
            0
        );

        // const payload = {
        //     cartItems,
        //     cartItemCount: newCartItemCount,
        //     cartTotal: newCartTotal,
        // };

        dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS,{
                cartItems: newCartItems,
                cartTotal: newCartTotal,
                cartItemCount: newCartItemCount,
            }
        ));
    };

    const addItemToCart = (productToAdd) => {
        const newCartItems= addCartItem(cartItems, productToAdd);
        updateCartItemsReducer(newCartItems);
    }

    const removeItemFromCart = (productToRemove)=>{
        const newCartItems= removeCartItem(cartItems, productToRemove);
        updateCartItemsReducer(newCartItems);
    }

    const clearItemFromCart = (cartItemToClear)=>{
        const newCartItems= clearCartItem(cartItems, cartItemToClear);
        updateCartItemsReducer(newCartItems);
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
    }

    const value = {isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartItemCount, removeItemFromCart, clearItemFromCart, cartTotal};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}