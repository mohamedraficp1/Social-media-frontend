import React,{useState,useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux';
import axios from 'axios'
import './marketPlace.css'
import SingleProduct from '../singleProduct/singleProduct';
import Filters from '../filter/Filter';

function MarketPlaces() {
  const [products, setProducts]= useState([])
  const dispatch = useDispatch();
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const res = await axios(`https://fakestoreapi.com/products/`);
        setProducts(res.data);
        // localStorage.setItem("cart", JSON.stringify(res.data));
        dispatch ({ type: "INITAL", payload: res.data })
      } catch (err) {
        console.log(err);
      }
    };
    getAllProducts();
    
  }, []);
  console.log(products)

  const { cart } = useSelector((cart) => ({ ...cart }));
  console.log(cart)
  return (
    <div className="marketplace_home">
      <Filters />
      <div className="productContainer">
        {products.map((prod) => (
          <SingleProduct  prod={prod} key={prod.id}/>
        ))}
      </div>
    </div>
    
  )
}

export default MarketPlaces