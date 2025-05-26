import * as Yup from "yup";
const addressSchema = Yup.object().shape({
  address: Yup.string().required("Select a valid address"),
  additionalDetails: Yup.string(),
  isDefault: Yup.boolean(),
  // postalCode: Yup.string().matches(
  //   /^\d{6}$/,
  //   "Enter a valid 6-digit Nigerian postal code"
  // ),
  latitude: Yup.string(),
  longitude: Yup.string(),
  lga: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  street: Yup.string(),
  country: Yup.string(),
  phoneNumber: Yup.string().matches(
    /^(0(70|71|80|81|90|91)\d{8})|(\+234(70|71|80|81|90|91)\d{8})$/,
    "Enter a valid Nigerian phone number"
  ),
});

const userInfoSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phoneNumber: Yup.string().matches(
    /^0(7[01]|8[01]|9[01])\d{8}$/,
    "Enter a valid Nigerian phone number"
  ),
  profilePicture: Yup.string(),
});

const changePasswordSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required("Current password is required")
    .min(6, "Password should be 6 characters or more")
    .label("Password")
  //   .matches(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  //     "Password should contain at least one uppercase, lowercase, number and special character"
  // )
  ,
  newPassword: Yup.string()
    .required("New password is required")
    .min(6, "Password should be 6 characters or more")
    .label("Password")
  //   .matches(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  //     "Password should contain at least one uppercase, lowercase, number and special character"
  // )
  ,
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required")
    .min(6, "Password should be 6 characters or more")
    .label("Password")
  //   .matches(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  //     "Password should contain at least one uppercase, lowercase, number and special character"
  // )
  ,
});

export { addressSchema, userInfoSchema, changePasswordSchema };
