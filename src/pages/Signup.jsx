import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

const Signup = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const signupUser = async (data) => {
    const response = await axios.post(`${BASE_URL}/register`, {
      name: data.name,
      number: data.number,
      email: data.email,
      password: data.password,
      designation: data.designation,
      role_id: Number(data.mySelectField),
    });
    return response.data;
  };

  const { mutate, isPending, isError, error: mutationError } = useMutation({
    mutationFn: signupUser,
    onSuccess: (data, variables) => {
      if (data.token) {
        login({
          name: variables.name,
          email: variables.email,
          token: data.token,
        });
        localStorage.setItem("authToken", data.token);
      }
      navigate("/login");
    },
  });

  const handleSignUp = (data) => {
    mutate(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-4">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Create Your Account
        </h2>
        {isError && (
          <p className="text-red-500 text-sm mb-4 text-center">
            {mutationError.response?.data?.message || mutationError.message}
          </p>
        )}
        <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            autoComplete="email"
            {...register("email", { required: "Email is required" })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Password"
            autoComplete="new-password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <input
            type="password"
            placeholder="Confirm Password"
            autoComplete="new-password"
            {...register("confirm_password", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.confirm_password && (
            <p className="text-red-500 text-sm">
              {errors.confirm_password.message}
            </p>
          )}

           <input
            type="text"
            placeholder="Designation"
            {...register("designation", {
              required: "Designation is required",
            })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {errors.designation && (
            <p className="text-red-500 text-sm">{errors.designation.message}</p>
          )}

          <select
            {...register("mySelectField")}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <option value={1}>Option 1</option>
            <option value={2}>Option 2</option>
            <option value={3}>Option 3</option>
          </select>
          
          <button
            type="submit"
            disabled={isPending}
            className={`w-full flex justify-center items-center gap-2 bg-indigo-500 text-white py-3 rounded-lg transition ${
              isPending
                ? "bg-indigo-400 cursor-not-allowed"
                : "hover:bg-indigo-600"
            }`}
          >
            {isPending && (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            )}
            {isPending ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <div className="text-center mt-6 text-gray-700">
          <p>
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-indigo-600 font-semibold hover:underline"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;