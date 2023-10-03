// sendOtp.js
import axios from "axios";
import baseUrl from "../apiConfig"; // Impor baseUrl dari konfigurasi

export const sendOtp = async (phoneNumber) => {
  console.log(phoneNumber);
  try {
    console.log(baseUrl);
    const response = await axios.post(`${baseUrl}/send-otp`, {
      phone_number: phoneNumber,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
