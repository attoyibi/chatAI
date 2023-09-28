// verifyOtp.js

const axios = require("axios");
import baseUrl from "../apiConfig"; // Impor baseUrl dari konfigurasi

export const verifyOtp = async (phoneNumber, otp) => {
  console.log("masuk util verifyOtp");
  try {
    // Kirim permintaan POST ke endpoint "verify-otp" dengan phoneNumber dan otp
    const response = await axios.post(`${baseUrl}/verify-otp`, {
      phone_number: phoneNumber,
      otp: otp,
    });
    console.log(response.data);
    // Jika permintaan berhasil, kembalikan respons dari server
    return response.data;
  } catch (error) {
    // Tangani kesalahan jika ada
    throw new Error("Gagal melakukan verifikasi OTP: " + error.message);
  }
};
