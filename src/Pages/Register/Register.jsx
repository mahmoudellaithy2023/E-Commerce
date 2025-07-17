import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { object, ref, string } from "yup";

export default function Register() {
  const passRegex = /^[A-Z][A-Za-z0-9]{5,}$/;
  const phoneRegex = /^(\+2){0,1}01[0125][0-9]{8}$/;
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validationSchema = object({
    name: string()
      .min(3, "min char must be 3 char")
      .max(20, "max char must be 20 char")
      .required("name is Required"),
    email: string().required("email is required").email("must be valid email"),
    password: string()
      .required("password is required")
      .matches(
        passRegex,
        "password must be start capital letter and min char is 5 char"
      ),
    rePassword: string()
      .required("rePassword is required")
      .matches(passRegex)
      .oneOf([ref("password")]),
    phone: string()
      .required("phone is required")
      .matches(phoneRegex, "phone must be egyptian"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    onSubmit: sendRegister,
    validationSchema,
  });

  async function sendRegister(values) {
    const loadingToast = toast.loading("loading....");
    setLoading(true);
    try {
      setError(null);
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
        method: "Post",
        data: values,
      };
      const { data } = await axios.request(options);
      toast.success("success");
      setTimeout(() => {
        navigate("/Login");
      }, 3000);
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(loadingToast);
      setLoading(false);
    }
  }

  return (
    <>
      <h2 className="text-2xl text-mainColor py-6">Register Now:</h2>
      {error && <p className="text-3xl text-red-500">{error}</p>}
      <form onSubmit={formik.handleSubmit} className=" space-y-5">
        <div>
          <label htmlFor="">User Name:</label>
          <input
            type="text"
            className="input  bg-slate-100 w-full"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.name && formik.touched.name && (
            <p className="text-red-500 text-md my-5 font-semibold">
              {formik.errors.name}
            </p>
          )}
        </div>
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
          <label htmlFor="">Password</label>
          <input
            type="password"
            className="input bg-slate-100 w-full"
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
        <div>
          <label htmlFor="">Re-Password</label>
          <input
            type="password"
            className="input  bg-slate-100 w-full"
            name="rePassword"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.rePassword && formik.touched.rePassword && (
            <p className="text-red-500 text-md my-5 font-semibold">
              {formik.errors.rePassword}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="">Phone</label>
          <input
            type="text"
            className="input  bg-slate-100 w-full "
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.phone && formik.touched.phone && (
            <p className="text-red-500 text-md  my-5 font-semibold">
              {formik.errors.phone}
            </p>
          )}
        </div>

        <div>
          <button disabled={loading} type="submit" className="btn mb-15">
            {loading ? <i class="fa-solid fa-spinner fa-spin"></i> : "Register"}
          </button>
        </div>
      </form>
    </>
  );
}
