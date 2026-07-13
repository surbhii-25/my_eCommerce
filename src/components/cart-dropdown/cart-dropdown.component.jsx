import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router';
import Button from '../button/button.component'
import CartItem from '../cart-item/cart-item.component'
import {selectCartItems} from '../../store/cart/cart.selector'
import {CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles'

const CartDropdown = () => {
    const cartItems = useSelector(selectCartItems);
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