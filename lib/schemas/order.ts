import * as Yup from "yup"
export const shippingSchema = Yup.object().shape({
  lga: Yup.string(),
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  cost: Yup.number().required("Shipping cost is required"),
});


export const orderStatusSchema = Yup.object().shape({
  status: Yup.string().required("Order status is required"),
  paymentStatus: Yup.string().required("Payment status is required"),
});

export const checkoutSchema = Yup.object().shape({
  customerNotes: Yup.string().defined()
});

export type CheckoutSchema = Yup.InferType<typeof checkoutSchema>;

// {
//   "cartId": "507f1f77bcf86cd799439011",
//   "shippingCostId": "507f1f77bcf86cd799439011",
//   "deliveryAddressId": "507f1f77bcf86cd799439011",
//   "items": [
//     {
//       "product": "507f1f77bcf86cd799439011",
//       "quantity": 2
//     }
//   ],
//   "customerNotes": "Please leave the package at the front door",
//   "callbackUrl": "https://example.com/callback"
// }