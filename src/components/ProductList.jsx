import React, { useEffect } from 'react'
import Navbar from './Navbar'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../features/ShopCart/productSlice';
import { addToCart } from '../features/ShopCart/cartSlice';

function ProductList() {
    const {items:products, status} = useSelector((state)=>state.products);
    const dispatch = useDispatch();
    useEffect(()=>{
        if(status==='idle'){
            dispatch(fetchProducts())
        }
    },[status]);
    if(status==='loading') return <p>Product is loading....</p>
    if(status==='failed') return <p>Failed to load products, please try again</p>
  return (
    <>
      <Navbar/>
      <div className="product-list">
        {products.map((product)=>(<div className="product-card" key={product.id}>
            <img src={product.image} alt={product.title} />
            <h2>{product.title.length > 20 ? `${product.title.slice(0,20)}...`:product.title}</h2>
            <p>Price: ${product.price.toFixed(2)}</p>
            <button onClick={()=>dispatch(addToCart(product))}>Add to Cart</button>
        </div>))}       
      </div>     
    </>
  )
}

export default ProductList
