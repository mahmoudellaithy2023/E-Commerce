import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { object, string } from "yup";

export default function ForgetPassword() {
  const [error, setError] = useState(null);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const navigate = useNavigate();
  const validationSchema = object({
    email: string()
      .email("must be valid Email")
      .required("must be Valid Email"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: forgetPassword,
    validationSchema,
  });
  async function forgetPassword(values) {
    setLoadingBtn(true);
    const loadingToast = toast.loading("loading...");
    try {
      setError(null);
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords",
        method: "POST",
        data: values,
      };
      const response = await axios.request(options);

      toast.success("success");
      setTimeout(() => {
        navigate("/ResetCode");
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
          Forget Password:
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
          <button type="submit" className="btn">
            {loadingBtn ? (
              <i class="fa-solid fa-spinner fa-spin"></i>
            ) : (
              "Verify Reset Password"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
