import * as Yup from "yup"
export const categorySchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  is_active: Yup.bool(),
});

export const productSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required"),
  salePrice: Yup.number().required("Sales price is required"),
  quantity: Yup.number().required("Quantity is required"),
  materials: Yup.string(),
  productImage: Yup.string().required("Product image is required"),
  isActive: Yup.bool().required(),
  isFeatured: Yup.bool(),
  category: Yup.string().required("Category is required"),
  size: Yup.string(),
  media: Yup.array().of(
    Yup.object({
      mediaType: Yup.string().required("Media type is required"),
      url: Yup.string().required("Media url is required"),
      altText: Yup.string().required("Media url is required"),
    })
  ),
});