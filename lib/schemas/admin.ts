import * as Yup from "yup"
export const newAdminSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  email: Yup.string().email("Enter valid email address").required("Email address is required"),
});