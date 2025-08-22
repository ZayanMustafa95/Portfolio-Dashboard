import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const NewPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const password = watch("password");

  const resetPasswordMutation = useMutation({
    mutationFn: async (formData) => {
      const restToken = localStorage.getItem("restToken");
      const Id = localStorage.getItem("Id");

      if (!restToken || !Id) {
        throw new Error("Invalid or expired session. Please try the process again.");
      }

      const res = await axios.post(
        `${BASE_URL}/reset/${Id}`,
        { password: formData.password },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${restToken}`,
          },
        }
      );

      return res.data;
    },
    onSuccess: () => {
      localStorage.removeItem("restToken");
      localStorage.removeItem("Id");
      navigate("/login");
    },
  });

  const onSubmit = (data) => {
    resetPasswordMutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Reset Your Password
        </h2>

        {resetPasswordMutation.isError && (
          <p className="text-red-500 text-sm mb-3 text-center">
            {resetPasswordMutation.error.response?.data?.message || resetPasswordMutation.error.message}
          </p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="password"
            autoComplete="new-password"
            placeholder="New Password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <input
            type="password"
            autoComplete="new-password"
            placeholder="Confirm New Password"
            {...register("confirm_password", {
              required: "Confirm Password is required",
              validate: (value) => value === password || "Passwords do not match",
            })}
            className="w-full px-3 py-2 border rounded-lg"
          />
          {errors.confirm_password && (
            <p className="text-red-500 text-sm">
              {errors.confirm_password.message}
            </p>
          )}

          <button
            type="submit"
            disabled={resetPasswordMutation.isPending}
            className={`w-full text-white py-2 rounded-lg transition ${
              resetPasswordMutation.isPending
                ? "bg-indigo-400 cursor-not-allowed"
                : "bg-indigo-500 hover:bg-indigo-600"
            }`}
          >
            {resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewPassword;