
import './App.css';
import { useFormik } from 'formik';

function isEmailValid(email) {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return emailRegex.test(email);
}

function App() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: ''
    },
    onSubmit: values => {
      console.log('form:', values)
      if (!values.email || !values.password) {
        // Display an error message if either the username or password is empty
        alert("Username and password are required");
      } else if (!isEmailValid(values.email)) {
        // Display an error message if the username is not in email format
        alert("Username should be an email");
      } else {
        // Display a success message if both validations pass
        alert("Login Successful");
      }
    },
    validate: values => {
      let errors = {}
      if (!values.email) {
        errors.email = "Field required";
      } else if (!isEmailValid(values.email)) {
        errors.email = "Username should be an email";
      }
      if (!values.password) errors.password = "Field required";
      return errors;
    }
  })
  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <div>Email</div>
        <input id="email" type="text" onChange={formik.handleChange} value={formik.values.email}></input>
        {formik.errors.email ? <div style={{color: 'red'}}>{formik.errors.email}</div>: null}
        <div>Password</div>
        <input id="password" type="text" onChange={formik.handleChange} value={formik.values.password}></input>
        {formik.errors.password ? <div style={{color: 'red'}}>{formik.errors.password}</div>: null}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
