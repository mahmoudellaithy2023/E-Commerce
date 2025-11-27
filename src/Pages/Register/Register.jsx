import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { object, string, ref } from "yup";

export default function Register() {
  const passRegex = /^[A-Z][A-Za-z0-9]{5,}$/;
  const phoneRegex = /^(\+2){0,1}01[0125][0-9]{8}$/;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const validationSchema = object({
    name: string()
      .matches(/^[A-Za-z][A-Za-z0-9_]{2,19}$/, "3-20 chars, start with letter")
      .required("Name is required"),
    email: string().email("Invalid email").required("Email is required"),
    password: string()
      .matches(passRegex, "Capital start, min 6 chars")
      .required("Password is required"),
    rePassword: string()
      .oneOf([ref("password")], "Passwords must match")
      .required("Confirm password"),
    phone: string()
      .matches(phoneRegex, "Must be Egyptian")
      .required("Phone is required"),
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
    setLoading(true);
    const loadingToast = toast.loading("Registering...");
    try {
      await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        values
      );
      toast.success("Registered successfully!");
      setTimeout(() => navigate("/Login"), 1500);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
      toast.dismiss(loadingToast);
    }
  }

  return (
    <div className="container mx-auto py-16 max-w-md space-y-6">
      <h2 className="text-3xl text-mainColor font-semibold text-center">
        Register Now
      </h2>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="input w-full"
          value={formik.values.name}
          onChange={formik.handleChange}
        />
        {formik.touched.name && formik.errors.name && (
          <p className="text-red-500 text-sm">{formik.errors.name}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          name="email"
          className="input w-full"
          value={formik.values.email}
          onChange={formik.handleChange}
        />
        {formik.touched.email && formik.errors.email && (
          <p className="text-red-500 text-sm">{formik.errors.email}</p>
        )}

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            className="input w-full pr-10"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <span
            className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            <i
              className={`fa-solid ${showPassword ? "fa-eye-slash" : "fa-eye"}`}
            ></i>
          </span>
          {formik.touched.password && formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}
        </div>

        <div className="relative">
          <input
            type={showRePassword ? "text" : "password"}
            placeholder="Confirm Password"
            name="rePassword"
            className="input w-full pr-10"
            value={formik.values.rePassword}
            onChange={formik.handleChange}
          />
          <span
            className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
            onClick={() => setShowRePassword(!showRePassword)}
          >
            <i
              className={`fa-solid ${
                showRePassword ? "fa-eye-slash" : "fa-eye"
              }`}
            ></i>
          </span>
          {formik.touched.rePassword && formik.errors.rePassword && (
            <p className="text-red-500 text-sm">{formik.errors.rePassword}</p>
          )}
        </div>

        <input
          type="text"
          placeholder="Phone"
          name="phone"
          className="input w-full"
          value={formik.values.phone}
          onChange={formik.handleChange}
        />
        {formik.touched.phone && formik.errors.phone && (
          <p className="text-red-500 text-sm">{formik.errors.phone}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn w-full hover:scale-105 transition-transform"
        >
          {loading ? (
            <i className="fa-solid fa-spinner fa-spin"></i>
          ) : (
            "Register"
          )}
        </button>
      </form>
    </div>
  );
}
