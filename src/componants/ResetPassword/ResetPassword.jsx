import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { object, string } from "yup";

export default function ForgetPassword() {
  const passRegex = /^[A-Z][A-Za-z0-9]{5,}$/;
  const [error, setError] = useState(null);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const navigate = useNavigate();
  const validationSchema = object({
    email: string()
      .email("must be valid Email")
      .required("must be Valid Email"),
    newPassword: string()
      .required("password is required")
      .matches(
        passRegex,
        "password must be start capital letter and min char is 5 char"
      ),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    onSubmit: ResetPassword,
    validationSchema,
  });
  async function ResetPassword(values) {
    setLoadingBtn(true);
    const loadingToast = toast.loading("loading...");
    try {
      setError(null);
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        method: "PUT",
        data: values,
      };
      const response = await axios.request(options);

      toast.success("success");
      setTimeout(() => {
        navigate("/Login");
      }, 3000);
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(loadingToast);
      setLoadingBtn(false);
    }
  }
  return (
    <>
      <div className="py-40 space-y-5">
        {error && <p className="text-3xl text-red-500">{error}</p>}
        <h2 className="text-mainColor text-3xl font-semibold pt-4">
          Reset Password:
        </h2>
        <form className="space-y-5" onSubmit={formik.handleSubmit}>
          <div className="pb-2">
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
            <label htmlFor="">New Password:</label>
            <input
              type="password"
              className="input  bg-slate-100 w-full"
              name="newPassword"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.newPassword && formik.touched.newPassword && (
              <p className="text-red-500 text-md my-5 font-semibold">
                {formik.errors.newPassword}
              </p>
            )}
          </div>
          <button type="submit" className="btn">
            {loadingBtn ? (
              <i class="fa-solid fa-spinner fa-spin"></i>
            ) : (
              "Verify"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
