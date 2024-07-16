import * as yup from 'yup';

let categorySchema = yup.object({
  name: yup.string("Name must be string !").required("Please fill !"),
  image: yup.string("Image must be string !").url("This field must be url!"),
});

export default categorySchema;