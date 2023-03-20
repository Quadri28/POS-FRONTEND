import React,{useContext, useEffect, useRef, useState} from 'react'
import MainLayout from '../Components/MainLayout'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Printing } from '../Components/Printing';
import { useReactToPrint } from 'react-to-print';
import { UserContext } from '../Components/Context';
import { Navigate } from 'react-router-dom';


const url = 'https://fakestoreapi.com/products'
const Products = () => {
const [loading, setLoading] = useState(true)
const [products, setProducts] = useState([]);
const [cart, setCart] = useState([]);
const [totalAmount, setTotalAmount] =useState(0)


    const fetchProducts = async ()=>{
        await axios.get(url)
         .then((response) => {
          const products=   response.data
          console.log(products)
          setLoading(false)
          setProducts(products)
         })
         .catch( (error) => {
            const errorMsg= error.message
         console.log(errorMsg)
     })
     }

     const toastOptions ={
        autoClose: 400,
        pauseOnHover:true
     }

     const addToCart = (product)=>{
        let findProductInCart = cart.find(i => {
            return i.id === product.id;
        })
        if (findProductInCart) {
            let newCart =[];
            let newItem;

            cart.forEach(cartItem =>{
                if(cartItem.id === product.id){
                 newItem={
                    ...cartItem,
                    quantity: cartItem.quantity +1,
                    totalAmount: cartItem.price * (cartItem.quantity + 1)
                    }
                    newCart.push(newItem)
                }else{
                    newCart.push(cartItem)
                }
            });

            setCart(newCart)
            toast(`Added ${newItem.title} to cart`, toastOptions )
        }else{
            let addingProducts ={
                ...product,
                quantity:1,
                totalAmount: product.price
            }
            setCart([...cart, addingProducts])
            toast(`Added ${product.title} to cart`, toastOptions )

        }
    }

    const removeProduct= (product) =>{
       const newCart= cart.filter((removed) => removed.id !== product.id);
       setCart(newCart);
    }
    const componentRef = useRef();

    const handlePrinter = useReactToPrint({
        content: ()=> componentRef.current,
    })

    const handlePrint = ()=>{
        handlePrinter()
    }

    useEffect(()=>{
        fetchProducts();
    }, [])

    useEffect(()=>{
    let newTotalAmount = 0;
    cart.forEach(icart =>{
        newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
    });
    setTotalAmount(newTotalAmount)
    }, [cart])

    const {token} = useContext(UserContext)

    if (!token) {
        return <Navigate to='/'/>
    }else{
  return (
    <MainLayout>
        {loading ? <p>Loading...</p> : 
        <div className='row justify-content-between gap-2 g-4 my-5'>
            <div className='col-lg-7 row justify-content-center g-4 gap-4'>
            {products.map((product)=>{
                return <div key={product.id} className="border pos-item col-sm-6 col-md-4 col-lg-3" 
                onClick={()=>addToCart(product)} >
                    <p className='my-2' style={{fontSize:'12px', height:'55px'}}>{product.title}</p>
                    <img src={product.image} alt={product.title} style={{height: '200px'}} 
                    className="img-fluid my-2 w-100"/>
                        <b>₦{product.price}</b>
                    </div>
            })}
            </div>
            <div className='col-lg-5'>
                <div style={{display: 'none'}}>
                <Printing cart={cart} totalAmount={totalAmount} ref={componentRef}/>
                </div>
            <div className='table-responsive bg-dark'>
                <table className='table table-dark table-hover table-responsive'>
                    <thead>
                        <tr className='text-center'>
                            <td>#</td>
                            <td>Name</td>
                            <td>Price</td>
                            <td>Qty</td>
                            <td>Total Amount</td>
                            <td>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                            {cart ? cart.map((cartProduct)=>{
                                return(
                                    <tr key={cartProduct.id} className='border text-center'>
                                        <td>{cartProduct.id}</td>
                                        <td>{cartProduct.title.slice(0, 10)}...</td>
                                        <td>₦{cartProduct.price}</td>
                                        <td>{cartProduct.quantity}</td>
                                        <td>₦{cartProduct.totalAmount}</td>
                                        <td>
                                            <button  className='btn btn-danger btn-sm' onClick={()=>
                                                removeProduct(cartProduct)}>
                                                Remove</button> 
                                            </td>
                                    </tr>
                                )
                            }) : 'No item in the cart'
                            } 
                    
                    </tbody>

                </table>
            <h2 className='text-white px-2'>Total Amount: ₦{totalAmount}</h2>
            
                </div>
                { totalAmount !==0 ?
                <div className='mt-3'>
                    <button onClick={handlePrint} className="btn btn-primary">Pay Now</button>
                </div> : 'Please add a product to cart'
                }
            </div>
        </div>
        }
        
    </MainLayout>
  )}
}

export default Products