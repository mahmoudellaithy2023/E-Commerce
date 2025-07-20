import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { TokenContext } from "../../Context/Token.context";

export default function Login() {
  const passRegex = /^[A-Z][A-Za-z0-9]{5,}$/;
  const [error, setError] = useState(null);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useContext(TokenContext);
  const validationSchema = object({
    email: string().email("email must be valid").required("email is required"),
    password: string()
      .required("password is required")
      .matches(
        passRegex,
        "password must be start capital letter and min char is 5 char"
      ),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: sendLogin,
    validationSchema,
  });
  async function sendLogin(values) {
    const loadingToast = toast.loading("loading...");
    setLoadingBtn(true);
    try {
      setError(null);
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);
      if (data.message == "success") {
        toast.success("success");
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setTimeout(() => {
          navigate("/Home");
        }, 3000);
      }
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(loadingToast);
      setLoadingBtn(false);
    }
  }

  return (
    <div className="py-40 space-y-6">
      {error && <p className="text-3xl text-red-500">{error}</p>}
      <h2 className="text-3xl text-mainColor">Login Now:</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="">Email:</label>
          <input
            type="email"
            className="input  bg-slate-100 w-full"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.email && formik.touched.email && (
            <p className="text-red-500 text-md my-5 font-semibold">
              {formik.errors.email}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="">Password:</label>
          <input
            type="password"
            className="input  bg-slate-100 w-full"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.password && formik.touched.password && (
            <p className="text-red-500 text-md my-5 font-semibold">
              {formik.errors.password}
            </p>
          )}
        </div>
        <div className="flex justify-between items-center">
          <button type="submit" className="btn">
            {loadingBtn ? <i class="fa-solid fa-spinner fa-spin"></i> : "Login"}
          </button>
          <Link to="/forgetPassword" className="text-blue-500">
            Forget Password ?
          </Link>
        </div>
      </form>
    </div>
  );
}
