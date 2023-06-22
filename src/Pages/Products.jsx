import React,{useEffect, useRef, useState} from 'react'
import MainLayout from '../Components/MainLayout'
import { toast } from 'react-toastify';
import { Printing } from '../Components/Printing';
import { useReactToPrint } from 'react-to-print';
import axios from '../Components/axios';
import { QrReader } from 'react-qr-reader';

const url = '/items'
const Products = () => {
const [loading, setLoading] = useState(true)
const [products, setProducts] = useState([]);
const [cart, setCart] = useState([]);
const [totalAmount, setTotalAmount] =useState(0)
const [subTotal, setSubTotal] =useState(0)
const [status, setStatus] = useState('');
const [cash, setCash]= useState('');
const [errMsg, setErrMsg] = useState('')

    const fetchProducts = async ()=>{
        const savedUser = localStorage.getItem('user')
        await axios(url, 
            {headers:{
            Authorization: `Bearer ${JSON.parse(savedUser).token}`
        }})
         .then((response) => {
          const products=   response?.data?.data
          setLoading(false)
          setProducts(products)
          setErrMsg('')
         })
         .catch( (error) => {
        const errorMsg= error.message
         setErrMsg(error.response.data.message)
     })
     }
     const toastOptions ={
        autoClose: 400,
        pauseOnHover:true
     }
     const addToCart = (product)=>{
        if (product.quantity > 0){
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
                    subTotal: cartItem.price,
                    totalAmount: (parseInt(cartItem.price) + parseInt(cartItem.price * product.tax/100)) * (cartItem.quantity + 1)
                    }
                    newCart.push(newItem)
                }else{
                    newCart.push(cartItem)
                }
            });
            setCart(newCart)
            toast(`Added ${newItem.name} to cart`, toastOptions )
        }else{
            let addingProducts ={
                ...product,
                quantity:1,
                subTotal: product.price,
                totalAmount: parseInt(product.price) + parseInt(product.price * product.tax/100)
            }
            setCart([...cart, addingProducts])
            toast(`Added ${product.name} to cart`, toastOptions )
        }
     } else{
        toast('Item out of stock')
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

    const getItemFromCart = (cart)=>{
        return cart.map((cartItem)=>({
            item_id: cartItem.id,
            quantity: cartItem.quantity,
            price: cartItem.price,
            amount: totalAmount,
            tax: cartItem.tax
        }))
    }

    const handlePrint = ()=>{
        if (status){
        handlePrinter()
        const savedUser = localStorage.getItem('user')
        const url = '/orders'
        const payload={
            user_id : JSON.parse(savedUser).user_id,
            amount: totalAmount,
            item_sales: getItemFromCart(cart),
            order_channels: [{"channel": status, "amount": totalAmount}],
        };
        axios.post(url, payload, { headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${JSON.parse(savedUser).token}`
        },
      })
    } else{
        toast('Payment method is required')
     }
    }
    useEffect(()=>{
        fetchProducts();
    }, [])

    useEffect(()=>{
    let newTotalAmount = 0;
    let newSubTotal=0;
    cart.forEach(icart =>{
        newTotalAmount = newTotalAmount + parseInt(icart.totalAmount);
        newSubTotal= newSubTotal +  parseInt(icart.subTotal)
    });
    setTotalAmount(newTotalAmount)
    setSubTotal(newSubTotal)
    }, [cart])

  return (
    <MainLayout>
        {loading ? <p>Loading...</p> : 
       
        <div className='row justify-content-between mx-auto g-4 my-5'>
            { errMsg? 
             <p className='text-danger text-center'>{errMsg}</p>: 
            
            <div className='col-lg-7 row justify-content-center g-4 gap-4'>
            { products.map((product)=>{
                return <div key={product.id} className="border pos-item col-sm-6 col-md-4 col-lg-3" 
                onClick={()=>addToCart(product)} >
                    <p className='my-2' style={{fontSize:'12px', height:'55px'}}>{product.name}</p>
                    <img src={product.image_url} alt={product.name} style={{height: '200px'}} 
                    className="img-fluid my-2 w-100"/>
                    <div className='d-flex justify-content-between'>
                        <b>₦{product.price}</b>
                        <b>Qty: {product.quantity}</b>
                        </div>
                    </div>
            }) }
       
            </div>
            }
            <div className='col-lg-5'>
                <div style={{display: 'none'}}>
                <Printing cart={cart} cash={cash} totalAmount={totalAmount} 
                 ref={componentRef} status={status} subTotal={subTotal}/>
                </div>
            <div className='table-responsive bg-dark '>
                <table className='table table-responsive text-white'>
                    <thead>
                        <tr className='text-center'>
                            <td>Name</td>
                            <td>Price</td>
                            <td>Qty</td>
                            <td>Total Amount</td>
                            <td>Action</td>
                            <td>Payment Method</td>
                        </tr>
                    </thead>
                    <tbody>
                            {cart ? cart.map((cartProduct)=>{
                                return(
                                    <tr key={cartProduct.id} className='border text-center'>
                                        <td>{cartProduct.name.slice(0, 10)}...</td>
                                        <td>₦{cartProduct.price}</td>
                                        <td>{cartProduct.quantity}</td>
                                        <td>₦{cartProduct.totalAmount}</td>
                                        <td>
                                            <button  className='btn btn-danger btn-sm' onClick={()=>
                                                removeProduct(cartProduct)}>
                                                Remove</button> 
                                            </td>
                                            <td>{status}</td>
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
                    <div className='row gap-3 mx-3 justify-content-center'>
                    <button className='btn btn-danger col-md-5' type="button" 
                    data-bs-toggle="modal" data-bs-target="#exampleModal">
                        Choose Payment Method
                        </button>
                    
                        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog">
                <div className="modal-content">
                    <div className='modal-header'>
                    <h4 className="modal-title" id="exampleModalLabel">Choose a Payment Method</h4>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                
                </div>
                <div className="modal-body row w-50 mx-auto g-3 mt-3">
                    <button className="btn btn-lg btn-danger" onClick={()=>setStatus('Card')}>
                        Debit Card
                    </button>
                    <button className="btn btn-primary btn-lg" onClick={()=>setStatus('Cash')}>
                        Cash
                        </button>
                     </div>        
                 </div>
                        </div>
                        </div>

                    <button className="btn btn-primary col-md-5" onClick={handlePrint}> Pay Now</button>
                    </div>
                </div> : <p className='text-capitalize text-danger'>Please add items to the cart</p>
                }

                {
                 status === 'Cash' && totalAmount !=0? 
                 <div className='mt-4'>
                 <h2>Get the customer's balance:</h2>
                 <label htmlFor="cash">Amount given by the customer: </label>
                 <input type="number" required name='cash' value={cash} onChange={(e)=>setCash(e.target.value)} />
                { cash && totalAmount <= cash?
                 <p>Customer's change: <b>₦{cash - totalAmount}</b></p>
                 : 
                 <p className='text-danger'>Require more money or some items should be dropped</p>
                }
                 </div>        
                 :''
                }
               
                <QrReader
                onResult={(result, error) => {
                  if (!!result) {
                    addToCart(product)
                  }
                  if (!!error) {
                    console.info(error);
                  }
                }}
                className='w-100 mt-4 h-25 bg-dark'
              />
            </div>
        </div>
        }
    </MainLayout>
  )
}
export default Products