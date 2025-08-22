import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import OTPInput from "otp-input-react";

const Otp = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const verifyOtpMutation = useMutation({
    mutationFn: async (currentOtp) => {
      const Id = localStorage.getItem("Id");
      if (!Id) throw new Error("User ID not found.");

      const response = await axios.post(`${BASE_URL}/verify/${Id}`, {
        otp: currentOtp,
      });
      return response.data;
    },
    onSuccess: (data) => {
      if (data.success) {
        localStorage.setItem("restToken", data.payload.resetToken);
        navigate("/new-password");
      }
    },
  });

  const resendOtpMutation = useMutation({
    mutationFn: async () => {
      const Id = localStorage.getItem("Id");
      if (!Id) throw new Error("User ID not found.");
      
      const response = await axios.get(`${BASE_URL}/resendOTP/${Id}?type=reset`);
      return response.data;
    },
  });

  const handleVerifyOtp = () => {
    if (otp.length !== 4) {
      return;
    }
    verifyOtpMutation.mutate(otp);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Enter OTP
        </h2>

        <div className="flex justify-center mb-6">
          <OTPInput
            value={otp}
            onChange={setOtp}
            OTPLength={4}
            otpType="number"
            disabled={verifyOtpMutation.isPending}
            autoFocus
            className="flex gap-3"
            inputClassName="w-12 h-12 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-lg font-mono"
          />
        </div>

        <button
          onClick={handleVerifyOtp}
          disabled={verifyOtpMutation.isPending || otp.length < 4}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition disabled:bg-gray-400"
        >
          {verifyOtpMutation.isPending ? "Verifying..." : "Verify OTP"}
        </button>

        <button
          onClick={() => resendOtpMutation.mutate()}
          disabled={resendOtpMutation.isPending}
          className="w-full mt-3 border border-indigo-600 text-indigo-600 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition disabled:bg-gray-200 disabled:text-gray-400"
        >
          {resendOtpMutation.isPending ? "Resending..." : "Resend OTP"}
        </button>

        <div className="mt-4 text-center text-sm min-h-[20px]">
          {verifyOtpMutation.isError && (
            <p className="text-red-500">{verifyOtpMutation.error.response?.data?.message || "Verification failed!"}</p>
          )}
          {resendOtpMutation.isError && (
            <p className="text-red-500">{resendOtpMutation.error.response?.data?.message || "Failed to resend OTP."}</p>
          )}
          {resendOtpMutation.isSuccess && (
            <p className="text-green-600">{resendOtpMutation.data?.message || "OTP sent successfully!"}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Otp;