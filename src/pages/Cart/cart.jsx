import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import "./cart.css";


function Cart({ cart, setCart }) {
    return (
    
    <div className="cart-container">
         <div className="cart-items-container">
            {cart.map((carts) => {
                return (
                    <Card style={{ width: '18rem' }} key={carts.id}>
                    <Card.Img variant="top" src={carts.thumbnailUrl} />
                    <Card.Body>
                    <Card.Title>{carts.title}</Card.Title>
                    <Card.Text><b>${carts.price}</b></Card.Text>
                     <Button variant="outline-danger" onClick={() => setCart(cart.filter((c) => c.id !== carts.id))}>Remove from Carts</Button>
                    </Card.Body>
                    </Card>
                )
            })}


            </div>
            <h4>Items: {cart.length} item - Total Price: ${cart.reduce((prev, cart) => {return prev + cart.price}, 0 ).toFixed(2)}</h4>
            <button>Checkout</button>
    </div>

    );
}

export default Cart;