import React from 'react'
import { Card, Button } from "react-bootstrap";
import { useDispatch ,useSelector} from 'react-redux';
import Rating from '../filter/Rating';
import './singleProduct.css'

function SingleProduct({ prod }) {
    const dispatch = useDispatch();
    const { cart } = useSelector((cart) => ({ ...cart }));
    return (
        <div className="products">
            <Card>
                <Card.Img variant="top" src={prod.image} alt={prod.name} />
                <Card.Body>
                    <Card.Title>{prod.title}</Card.Title>
                    <Card.Subtitle style={{ paddingBottom: 10 }}>
                        <span>₹ {prod.price}</span>
                    </Card.Subtitle>
                    <Rating rating={prod.rating.rate} />
                    <div className='cart_buttons'>
                        {cart.cart.some((p) => p.id === prod.id) ? (
                            <Button
                                variant="danger"
                                onClick={() =>
                                    dispatch({
                                        type: "REMOVE_FROM_CART",
                                        payload: prod,
                                    })
                                }
                            >
                                Remove from Cart
                            </Button>
                        ) : (
                            <Button
                                onClick={() =>
                                    dispatch({
                                        type: "ADD_TO_CART",
                                        payload: prod,
                                    })
                                }
                            >
                                Add to Cart
                            </Button>
                        )}
                    </div>

                </Card.Body>

            </Card>
        </div>
    )
}

export default SingleProduct