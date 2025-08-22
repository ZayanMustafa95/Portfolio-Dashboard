import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const Forget = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post(`${BASE_URL}/forgot`, { email: data.email });
      return res.data;
    },
    onSuccess: (data) => {
      if (data.success && data.payload?.id) {
        localStorage.setItem("Id", data.payload.id);
        navigate("/otp");
      } else {
        
        console.error("Forgot password success but no ID received.");
      }
    },
  });

  const onSubmit = (formData) => {
    mutation.mutate(formData);
  };

  return (
    <div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">
            Forgot Password
          </h2>
          {mutation.isError && (
            <p className="text-red-500 text-sm mb-4 text-center">
              {mutation.error.response?.data?.message || "An unexpected error occurred"}
            </p>
          )}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-3 py-2 border rounded-lg"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={mutation.isPending}
              className={`w-full flex items-center justify-center bg-indigo-500 text-white py-2 rounded-lg transition ${
                mutation.isPending ? "bg-indigo-400 cursor-not-allowed" : "hover:bg-indigo-600"
              }`}
            >
              {mutation.isPending ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Reset Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Forget;