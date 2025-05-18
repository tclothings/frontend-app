import * as Yup from "yup";
const addressSchema = Yup.object().shape({
  address: Yup.string().required("Select a valid address"),
  additionalDetails: Yup.string(),
  postalCode: Yup.string().matches(
    /^\d{6}$/,
    "Enter a valid 6-digit Nigerian postal code"
  ),
  latitude: Yup.string(),
  longitude: Yup.string(),
  area: Yup.string(),
  city: Yup.string(),
  state: Yup.string(),
  country: Yup.string(),
  phone: Yup.string().matches(
    /^0(7[01]|8[01]|9[01])\d{8}$/,
    "Enter a valid Nigerian phone number"
  ),
});

const userInfoSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  // phoneNumber: Yup.string().required("Phone number is required"),
  // dateOfBirth: Yup.string().required("Date of Birth"),
});

const changePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .required("Old password is required")
    .min(6, "Password should be 6 characters or more")
    .label("Password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password should contain at least one uppercase, lowercase, number and special character"
    ),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required")
    .min(6, "Password should be 6 characters or more")
    .label("Password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password should contain at least one uppercase, lowercase, number and special character"
    ),
  newPassword: Yup.string()
    .required("New password is required")
    .min(6, "Password should be 6 characters or more")
    .label("Password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password should contain at least one uppercase, lowercase, number and special character"
    ),
});

export { addressSchema, userInfoSchema, changePasswordSchema };
