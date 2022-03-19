import * as yup from "yup";

export const INPUT_SCHEMA = yup.object({
  eventName: yup
    .string()
    .min(2, "Very few symbols!")
    .max(18, "Too much symbols!")
    .required("Field musn`t be empty!"),
});
