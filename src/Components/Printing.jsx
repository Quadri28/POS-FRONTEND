import React from "react";

export const Printing = React.forwardRef((props, ref)=>{
    const {cart, totalAmount} = props;
    return(
        <div ref={ref} className="p-5">
            <h2 className="text-center mb-3">Transaction Details:</h2>
             <table className='table table-dark table-hover table-responsive'>
                    <thead>
                        <tr className='text-center'>
                            <td>#</td>
                            <td>Name</td>
                            <td>Price</td>
                            <td>Qty</td>
                            <td>Total Amount</td>
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
                                    </tr>
                                )
                            }) : ''
                            } 
                    
                    </tbody>

                </table>
            <h2 className='px-2'>Total Amount: ₦{totalAmount}</h2>
        </div>
    )
})