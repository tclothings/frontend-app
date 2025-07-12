import * as Yup from "yup";

const registerSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required").label("Email"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password should be 6 characters or more")
    .label("Password"),
  // .matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
  //   "Password should contain at least one uppercase, lowercase, number and special character"
  // )
  firstName: Yup.string().required("First name is required").label("firstName"),
  lastName: Yup.string().required("Last name is required").label("lastName"),
});


const loginSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required").label("Email"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password should be 6 characters or more")
    .label("Password")
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    //   "Password should contain at least one uppercase, lowercase, number and special character"
    // )
    ,
  // fullName: Yup.string(),
});
const emailSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
});

const passwordSchema = Yup.object().shape({
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Confirm password is required")
    .min(6, "Password should be 6 characters or more")
    .label("Password")
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    //   "Password should contain at least one uppercase, lowercase, number and special character"
    // )
    ,
  newPassword: Yup.string()
    .required("New password is required")
    .min(6, "Password should be 6 characters or more")
    .label("Password")
    // .matches(
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
    //   "Password should contain at least one uppercase, lowercase, number and special character"
    // )
    ,
});
export { registerSchema, loginSchema, emailSchema, passwordSchema };
