import * as Yup from "yup";
export const FormSchemaValidator: any = Yup.object().shape({
  full_name: Yup.string()
    .required("Full name is required")
    .matches(/^[a-zA-Z]+$/, "Invalid full name format"),
  contact_number: Yup.string()
    .required("Contact number is required")
    .matches(
      /^(\d{10}|\d{3}-\d{3}-\d{4}|\(\d{3}\) \d{3}-\d{4})$/,
      "Invalid phone number format"
    ),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format"),
  day: Yup.string().required("Day is required"),
  month: Yup.string().required("Month is required"),
  year: Yup.string().required("Year is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      "Invalid password format"
    ),
  confirm_password: Yup.string().oneOf(
    [Yup.ref("password"), undefined],
    "Passwords must match"
  ),
});
