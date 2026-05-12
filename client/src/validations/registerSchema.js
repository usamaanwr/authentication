import * as Yup from "yup";

export const registerSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .min(3, "Full name must be at least 3 characters!")
    .max(20, "Full name must be less than 20 characters!")
    .required("Full name is required!"),

  username: Yup.string()
    .trim()
    .min(3, "Username must be at least 3 characters!")
    .max(20, "Username must be less than 20 characters!")
    .matches(/^[a-zA-Z0-9]+$/, "Username can only contain letters and numbers!")
    .required("Username is required!"),

  email: Yup.string()
    .email("Please enter a valid email!")
    .matches(/\.(com|net)$/, "Email must end with .com or .net!")
    .required("Email is required!"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters!")
    .max(10, "Password must be less than 10 characters!")
    .required("Password is required!"),
});
