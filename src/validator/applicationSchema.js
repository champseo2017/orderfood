import { object, array, string, number, date, boolean, ref } from "yup";

const schemaAddUserAdmin = object().shape({
  user_email: string()
    .required("The email field is required.")
    .email("Must be a valid email"),
  user_name: string()
    .required("The username field is required.")
    .max(30, `Maximum 30 characters`)
    .min(5, `Username is too short - should be 5 chars minimum.`),
  user_password: string()
    .required("The password field is required.")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character."
    ),
  user_passconfirmation: string()
    .required("The confirm password field is required.")
    .oneOf([ref("user_password"), null], "Passwords must match"),
  user_role: string().required("The user role field is required."),
});

export const validateApplication = object({ addUser: schemaAddUserAdmin });