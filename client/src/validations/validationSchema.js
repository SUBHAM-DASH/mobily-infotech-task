// src/validation/validationSchemas.js
import * as Yup from "yup";

export const registerValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

export const taskValidationSchema = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .max(100, "Title can't be longer than 100 characters"),
  description: Yup.string()
    .required("Description is required")
    .max(500, "Description can't be longer than 500 characters"),
  dueDate: Yup.date()
    .required("Due date is required")
    .nullable()
    .min(new Date(), "Due date can't be in the past"),
});
