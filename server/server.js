const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 8000; // Ganti dengan port yang Anda inginkan

// Middleware untuk memproses body permintaan
app.use(bodyParser.json());

// Middleware untuk mengizinkan CORS jika perlu
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Definisikan rute-rute Anda di sini
// Contoh: Endpoint "send-otp"
app.post("/send-otp", (req, res) => {
  const phoneNumber = req.body.phone_number;

  // Lakukan pengiriman OTP sesuai dengan data yang diterima
  // Di sini Anda dapat mengirim OTP ke nomor telepon yang diterima (phoneNumber)
  // Misalnya, Anda dapat menggunakan pustaka seperti `twilio` untuk mengirim OTP melalui SMS

  // Kirim respons sesuai dengan format Postman
  res.json({
    message: "OTP sent",
    data: 558816,
  });
});

// Endpoint "verify-otp"
app.post("/verify-otp", (req, res) => {
  const phoneNumber = req.body.phone_number;
  const otp = req.body.otp;

  // Di sini Anda dapat melakukan verifikasi OTP sesuai dengan data yang diterima
  // Anda perlu membandingkan OTP yang diterima (otp) dengan OTP yang seharusnya dikirimkan ke nomor telepon yang sesuai (phoneNumber)

  // Contoh sederhana verifikasi
  if (otp === "558816") {
    // Jika OTP cocok, Anda dapat menghasilkan token akses
    const accessToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIwODUyNzM4Mzk4NTEifQ.WvSfNakeyWpcaY5tpW9wgK8ICWLFXkWkr_iq1CEPmmc";

    // Kirim respons sesuai dengan format Postman
    res.json({
      message: "Success!!",
      data: {
        access_token: accessToken,
        token_type: "bearer",
      },
    });
  } else {
    // Jika OTP tidak cocok, kirim respons dengan pesan kesalahan
    res.status(400).json({
      message: "OTP is incorrect",
      data: null,
    });
  }
});

// Definisikan rute lain sesuai kebutuhan Anda

// Jalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
