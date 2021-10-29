import * as yup from "yup";

const registerSchema = yup.object().shape({
  name: yup.string().min(2).required(),
  surname: yup.string().min(2).required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
});

export { registerSchema };
