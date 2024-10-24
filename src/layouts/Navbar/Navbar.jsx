import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({tap, setTap, products, cart, setToken}) {
    return ( 
    <div className="navbar-container">

        <Link to={'/home'}>
        <button className={'btn ' + (tap === 'home' ? 'btn-primary' :'btn-outline-primary')} onClick={() => setTap('home')}>Home</button>
        </Link>

        <Link to={'/calculator'}>
        <button className={'btn ' + (tap === 'calculator' ? 'btn-primary' :'btn-outline-primary')} onClick={() => setTap('calculator')}>Calculator</button>
        </Link>

        <Link to={'/animation'}>
        <button className={'btn ' + (tap === 'animation' ? 'btn-primary' :'btn-outline-primary')} onClick={() => setTap('animation')}>Animation</button>
        </Link>

        <Link to={'/component'}>
        <button className={'btn ' + (tap === 'component' ? 'btn-primary' :'btn-outline-primary')} onClick={() => setTap('component')}>Component</button>
        </Link>


        <Link to={'/todo'}>
        <button className={'btn ' + (tap === 'todo' ? 'btn-primary' :'btn-outline-primary')} onClick={() => setTap('todo')}>Todo</button>
        </Link>

        <Link to={'/product'}>
        <button className={'btn ' + (tap === 'product' ? 'btn-primary' :'btn-outline-primary')} onClick={() => setTap('product')}>Product({products.length})</button>
        </Link>


        <Link to={'/cart'}>
        <button className={'btn ' + (tap === 'cart' ? 'btn-primary' :'btn-outline-primary')} onClick={() => setTap('cart')} style={{position: 'relative'}}>
            Cart
            { cart.length > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
           {cart.length < 10 ? cart.length : '10+'}
            <span className="visually-hidden">unread messages</span>
            </span>
            )}
            </button>
        </Link>

        <button className="btn btn-outline-danger" style={{marginLeft: '1rem'}} onClick={() => {setToken(' ')}}>Logout</button>


    </div>
     );
}

export default Navbar;