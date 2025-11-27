import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import { TokenContext } from "../../Context/Token.context";
import { useNavigate, Link } from "react-router-dom";
import { object, string } from "yup";
import toast from "react-hot-toast";

export default function Login() {
  const passRegex = /^[A-Z][A-Za-z0-9]{5,}$/;
  const { setToken } = useContext(TokenContext);
  const navigate = useNavigate();
  const [loadingBtn, setLoadingBtn] = useState(false);

  const validationSchema = object({
    email: string().email("Email must be valid").required("Email is required"),
    password: string()
      .required("Password is required")
      .matches(
        passRegex,
        "Password must start with capital letter and min 6 chars"
      ),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: sendLogin,
    validationSchema,
  });

  async function sendLogin(values) {
    setLoadingBtn(true);
    const loadingToast = toast.loading("Logging in...");
    try {
      const { data } = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      if (data.message === "success") {
        toast.success("Login successful!");
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setTimeout(() => navigate("/Home"), 1500);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoadingBtn(false);
      toast.dismiss(loadingToast);
    }
  }

  return (
    <div className="container mx-auto py-20 max-w-md space-y-6">
      <h2 className="text-3xl text-mainColor font-semibold text-center">
        Login Now
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            placeholder="Email"
            name="email"
            className="input w-full"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email && (
            <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
          )}
        </div>

        <div>
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="input w-full"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.password}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={loadingBtn}
          className="btn w-full hover:scale-105 transition-transform"
        >
          {loadingBtn ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            "Login"
          )}
        </button>

        <div className="text-right">
          <Link to="/forgetPassword" className="text-blue-500 hover:underline">
            Forget Password?
          </Link>
        </div>
      </form>
    </div>
  );
}
