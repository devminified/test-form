import Button from "../components/Button";
import DatePicker from "../components/DatePicker";
import Input from "../components/Input/Input";
import { FormSchemaValidator } from "../validation";
import { useFormik } from "formik";
import "./home.scss";
import { toast } from "react-toastify";
const Home = () => {
  const formik = useFormik<TForm>({
    initialValues: {
      full_name: "",
      contact_number: "",
      email: "",
      day: "",
      month: "",
      year: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: FormSchemaValidator,
    onSubmit: (values) => {
      console.log(values);
    },
  });
  const {
    values,

    setValues,
    handleChange,
    handleBlur,
    handleSubmit,
    errors,
    touched,
    // tslint:disable-next-line: react-hooks-nesting
  } = formik;
  console.log("🚀 ~ file: Home.tsx:34 ~ Home ~ errors:", errors);
  return (
    <div className="form-wrap">
      <h1>Create User Account</h1>
      <div className="fields-area">
        <Input
          type="text"
          label="Full Name"
          name="fullName"
          Cplaceholder="Full Name"
          materialDesign
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.full_name}
          error={errors.full_name}
          validations={[{ noSpace: true }]}
        />
        <Input
          type="number"
          label="Contact Number"
          name="contact_number"
          Cplaceholder="Contact Number"
          materialDesign
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.contact_number}
          error={errors.contact_number}
          validations={[{ noSpace: true }]}
        />
        <DatePicker formik={formik} />
        <Input
          type="email"
          label="Email Address"
          name="email"
          Cplaceholder="Email Address"
          materialDesign
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.email}
          error={errors.email}
          validations={[{ noSpace: true }]}
        />
        <Input
          type="password"
          label="Password"
          name="password"
          Cplaceholder="Password"
          materialDesign
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.password}
          error={errors.password}
          validations={[{ noSpace: true }]}
        />
        <Input
          type="password"
          label="Confirm Password"
          name="confirm_password"
          Cplaceholder="Confirm Password"
          materialDesign
          onChange={handleChange}
          onBlur={handleBlur}
          touched={touched.confirm_password}
          error={errors.confirm_password}
          validations={[{ noSpace: true }]}
        />
      </div>

      <div className="action-btns">
        <Button outline>Cancel</Button>
        <Button
          onClick={() => {
            handleSubmit();
            toast.success("User account successfully created. ");
            toast.error("There was an error creating the account.");
          }}
          variant="primary"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Home;
