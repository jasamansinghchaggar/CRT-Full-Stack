import { object, string } from "yup";
import { Formik } from "formik";

const registerSchema = object({
  email: string().email().required(),
  password: string().min(6, "must be at least 6 characters long").required(),
  name: string()
    .min(3, "must be 3 character long")
    .max(20, "must be 20 characters only")
    .required(),
  role: string().oneOf(
    ["admin", "manager", "team_lead", "employee"],
    "invalid role",
  ),
});

const RegisterForm = () => {
  const handleSubmitRegister = async (values) => {
    const response = await fetch("http://localhost:8080/api/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      alert("Registration failed!");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);

    alert("Registration successfull!");
  };
  return (
    <Formik
      initialValues={{ name: "", email: "", password: "", role: "employee" }}
      validationSchema={registerSchema}
      onSubmit={handleSubmitRegister}
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
          <h1 className="form_heading">Register Form</h1>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.name}
            required
          />
          {errors.name && touched.name && <span>{errors.name}</span>}
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            required
          />
          {errors.email && touched.email && <span>{errors.email}</span>}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            required
          />
          {errors.password && touched.password && (
            <span>{errors.password}</span>
          )}
          <select
            name="role"
            id="role"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.role}
            required
          >
            <option value="employee">Employee</option>
            <option value="team-lead">Team Lead</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
          {errors.role && touched.role && <span>{errors.role}</span>}

          <button type="submit">Register</button>
        </form>
      )}
    </Formik>
  );
};

export default RegisterForm;
