import { useDispatch, useSelector } from 'react-redux';

import {selectCartItemCount, selectIsCartOpen} from '../../store/cart/cart.selector';
import {setIsCartOpen} from '../../store/cart/cart.action'

import {ShoppingIcon, CartIconContainer, ItemCount} from './cart-icon.styles'

const CartIcon = () => {

    // const { isCartOpen, setIsCartOpen } = useContext(CartContext);
    // const { cartItemCount } = useContext(CartContext);
    const dispatch = useDispatch();

    const cartItemCount = useSelector(selectCartItemCount);
    const isCartOpen = useSelector(selectIsCartOpen)

    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));
    return (
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon />
            <ItemCount>{cartItemCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon