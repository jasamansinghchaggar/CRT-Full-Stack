import { object, string } from "yup";
import { Formik } from "formik";

const loginSchema = object({
  email: string().email().required(),
  password: string().min(6, "must be at least 6 characters long").required(),
});

const LoginForm = () => {
  const handleSubmitLogin = async (values) => {
    const response = await fetch("http://localhost:8080/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: values.email, password: values.password }),
    });

    if (!response.ok) {
      alert("Login failed!");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);

    alert("Login successfull!");
  };

  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginSchema}
      onSubmit={handleSubmitLogin}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form className="form" onSubmit={handleSubmit} method="post">
          <h1 className="form_heading">Login Form</h1>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            // value={loginEmail}
            // onChange={(e) => setLoginEmail(e.target.value)}
            required
          />
          {errors.email && touched.email && errors.email}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            // value={loginPassword}
            // onChange={(e) => setLoginPassword(e.target.value)}
            required
          />
          {errors.password && touched.password && errors.password}
          <button type="submit">Login</button>
        </form>
      )}
    </Formik>
  );
};

export default LoginForm;
