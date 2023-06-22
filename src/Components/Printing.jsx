import React from "react";

export const Printing = React.forwardRef((props, ref) => {
  const { cart, totalAmount, subTotal, status, cash } = props;
  return (
    <div ref={ref} className="p-5">
        <div>
            <h2 className="text-center my-3">{ JSON.parse(localStorage.getItem('user')).store}</h2>
            <h5 className="text-center mb-5">
                {JSON.parse(localStorage.getItem('user')).address}
                </h5>
        </div>
      <div>
        <h3
          className="text-center pb-2"
          style={{ borderBottom: "dashed 2px #ddd" }}
        >
          **Payment Receipt**
        </h3>
        <p>
          <b>Retail</b>
        </p>
        <p>Terminal#</p>
        <p>CHK#</p>
        <p>Server: {JSON.parse(localStorage.getItem('user')).first_name} {JSON.parse(localStorage.getItem('user')).last_name}</p>
        <p>Created: {new Date().toUTCString()} </p>
      </div>

      <table className="table table-hover table-responsive table-borderless">
        <thead>
          <tr
            className="text-center"
            style={{
              borderTop: "dashed 2px #ddd",
              borderBottom: "dashed 2px #ddd",
            }}
          >
            <td>Item</td>
            <td>Qty</td>
            <td>Price</td>
          </tr>
        </thead>
        <tbody>
          {cart
            ? cart.map((cartProduct) => {
                return (
                  <tr key={cartProduct.id} className="text-center">
                    <td> {cartProduct.name.slice(0, 10)}...</td>
                    <td>{cartProduct.quantity}</td>
                    <td>₦{cartProduct.price}</td>
                  </tr>
                );
              })
            : ""}
        </tbody>
      </table>
      {cash ? (
        <div className="">
          <div style={{ fontSize: "18px" }}>
            <p>
              <b
                className="p-2"
                style={{
                  borderTop: "dashed 2px #ddd",
                  borderBottom: "dashed 2px #ddd",
                }}
              >
                SubTotal: ₦{subTotal}
              </b>
            </p>
            <div>
              <b>Tax:</b> <b> ₦{totalAmount - subTotal}</b>
            </div>
            <div>
              <b>Total Amount: </b>
              <b> ₦{totalAmount}</b>            
            </div>
            <div>
              <b>Payment Method: {status}</b>
            </div>
          </div>
          <div className="row">
            <div className="justify-content-around">
              <b>Tend: </b>
              <b> ₦{cash}</b>
            </div>
            <div className="justify-content-around">
              <b>Change Due: </b>
              <b> ₦{cash - totalAmount}</b>
              <b>{status}</b>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="row justify-content-around">
            <div className="w-100">
              <b>SubTotal:</b> <b> ₦{subTotal}</b>
            </div>
            <div className="w-100">
              <b>Tax: </b>
              <b> ₦{totalAmount - subTotal}</b>
            </div>
            <div className="w-100">
              <b>Total Amount: </b>
              <b>₦{totalAmount}</b>
            </div>
          </div>
        </div>
      )}

      <h2 className="text-uppercase text-center mt-5">
        Item Sold {cart.length}
      </h2>
      <p className="text-center mt-3" style={{ fontSize: "18px" }}>
        Thanks for your patronage.
      </p>
      <p className="mt-5 text-center">
        Powered by Asude, A product of Hoffenheim.
      </p>
    </div>
  );
});
