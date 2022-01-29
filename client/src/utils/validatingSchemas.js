import * as yup from 'yup';

export const INPUT_SCHEMA = yup.object({
  eventName: yup
    .string()
    .min(2, 'Very few symbols!')
    .max(15, 'Too much symbols!')
    .required('Field musn`t be empty!')
  // day: yup
  //   .number()
  //   .min(1, 'Too small non-existent value')
  //   .max(31, 'Too big non-existent value'),
  // month: yup
  //   .number()
  //   .min(1, 'Too small non-existent value')
  //   .max(12, 'Too big non-existent value'),
  // year: yup
  //   .number()
  //   .min(2022, 'Too small non-existent value')
  //   .max(2050, 'Too big non-existent value')
});
