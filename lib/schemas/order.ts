import * as Yup from "yup"
export const shippingSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  cost: Yup.number().required("Shipping cost is required"),
});
