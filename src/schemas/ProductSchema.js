import * as yup from 'yup';

let productSchema = yup.object({
  image: yup.string("Image must be string !").required("Please fill !").url("This field must be url!"),
  name: yup.string("Name must be string !").required("Please fill !"),
  description: yup.string("Name must be string !").required("Please fill !"),
  price:  yup.number().required("Please fill !").positive().integer(),
  discount:yup.number().required("Please fill !").positive().integer(),
});

export default productSchema;