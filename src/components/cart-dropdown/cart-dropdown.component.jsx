import {useContext} from 'react';
import { useNavigate } from 'react-router';
import Button from '../button/button.component'
import { CartContext } from '../../contexts/cart.context'
import CartItem from '../cart-item/cart-item.component'
import {CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles'

const CartDropdown = () => {
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

    const goToCheckoutHandler =()=>{navigate('/checkout');}
    return(
        <CartDropdownContainer>
            <CartItems />
            {cartItems.length ? (
                cartItems.map((cartItem)=>(
                    <CartItem key = {cartItem.id} cartItem={cartItem} />
                ))):(
                    <EmptyMessage>Your Cart is Empty</EmptyMessage>
                )}
            <Button onClick={goToCheckoutHandler}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown