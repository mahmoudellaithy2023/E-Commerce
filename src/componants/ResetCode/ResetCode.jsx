import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { data, useNavigate } from "react-router-dom";
import { number, object } from "yup";

export default function ResetCode() {
  const [error, setError] = useState(null);
  const [loadingBtn, setLoadingBtn] = useState(false);
  const navigate = useNavigate();
  const validationSchema = object({
    resetCode: number().required("valid code"),
  });
  async function resetCode(values) {
    const loadingToast = toast.loading("loading...");
    setLoadingBtn(true);
    try {
      setError(null);
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
        method: "POST",
        data: values,
      };
      const { data } = await axios.request(options);

      toast.success("success");
      setTimeout(() => {
        navigate("/ResetPassword");
      }, 3000);
    } catch (error) {
      setError(error.response.data.message);
      toast.error(error.response.data.message);
    } finally {
      toast.dismiss(loadingToast);
      setLoadingBtn(false);
    }
  }
  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: resetCode,
    validationSchema,
  });
  return (
    <>
      <div className="py-40">
        <h2 className="text-3xl text-mainColor font-semibold pb-6">
          Reset Code:
        </h2>
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="" htmlFor="">
              Reset Code:
            </label>
            <input
              type="string"
              className="input  bg-slate-100 w-full"
              name="resetCode"
              value={formik.values.resetCode}
              onChange={formik.handleChange}
            />
            {formik.errors.resetCode && formik.touched.resetCode && (
              <p className="text-red-500 text-md my-5 font-semibold">
                {formik.errors.resetCode}
              </p>
            )}
          </div>
          <button type="submit" className="btn">
            {loadingBtn ? (
              <i class="fa-solid fa-spinner fa-spin"></i>
            ) : (
              "Reset Code"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
