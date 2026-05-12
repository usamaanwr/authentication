import * as Yup from "yup"

export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email!")
    .matches(/\.(com|net)$/, "Email must end with .com or .net!")
    .required("Email is required!"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters!")
    .max(10, "Password must be less than 10 characters!")
    .required("Password is required!"),
})