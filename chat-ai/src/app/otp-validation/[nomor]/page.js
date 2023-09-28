"use client"; // This is a client component 👈🏽
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";

function Page({ params }) {
  const [otp, setOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(params.nomor);
  // Buat ref untuk setiap input
  const inputRefs = useRef(Array.from({ length: 6 }, () => React.createRef()));

  useEffect(() => {
    // Mengganti %2B dengan +
    if (phoneNumber && phoneNumber.startsWith("%2B")) {
      const updatedPhoneNumber = `+${phoneNumber.substring(3)}`;
      // Lakukan sesuatu dengan updatedPhoneNumber, misalnya simpan ke dalam state
      // atau lakukan tindakan lain yang sesuai dengan kebutuhan Anda.
      setPhoneNumber(updatedPhoneNumber);
      console.log(updatedPhoneNumber);
    }
  }, [phoneNumber]);

  const handleInputChange = (index, value) => {
    // Set nilai pada indeks tertentu dalam array OTP
    const otpArray = otp.split("");
    otpArray[index] = value;
    setOtp(otpArray.join(""));

    // Fokus pada input selanjutnya jika masih ada
    if (index < inputRefs.current.length - 1 && value.length === 1) {
      inputRefs.current[index + 1].current.focus();
    }
    console.log(otp);
  };

  const handleSubmit = async (e) => {
    // e.preventDefault(); // Menghentikan pengiriman formulir bawaan
    console.log(otp);

    // try {
    //   // Lakukan validasi OTP
    //   if (otp.length !== 6) {
    //     throw new Error("OTP harus terdiri dari 6 digit");
    //   }

    //   // Kirim OTP untuk verifikasi
    //   const verificationResponse = await verifyOtp(phoneNumber, otp);
    //   console.log(verificationResponse); // Handle responsenya sesuai kebutuhan
    // } catch (error) {
    //   console.error(error); // Handle error jika terjadi
    // }
  };
  return (
    <div className="bg-white relative max-w-[500px] mx-auto w-full flex flex-col min-h-screen shadow-xl shadow-primary/40">
      <div className="fixed w-full z-10">
        <div className="grid grid-cols-9 gap-3 px-5 py-3 max-w-[500px] bg-white">
          <div className="flex items-center">
            <Link href="/join">
              <button className="btn-ghost p-2 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 19 17"
                  width="24"
                  height="24"
                  className="text-black"
                >
                  <path d="M8.295 15.716A1 1 0 0 0 9.7 14.291L4.33 9h13.67a1 1 0 1 0 0-2H4.336L9.7 1.715A1 1 0 0 0 8.295.29L1.371 7.113a1.25 1.25 0 0 0 0 1.78l6.924 6.823Z"></path>
                </svg>
              </button>
            </Link>
          </div>
          <div className="col-start-3 col-end-8 flex items-center justify-center">
            <p className="text-xl font-semibold">OTP</p>
          </div>
        </div>
      </div>
      <div className=" invisible">
        <div className="grid grid-cols-9 gap-3 px-5 py-3 max-w-[500px] bg-white">
          <div className="flex items-center">
            <button className="btn-ghost p-2 rounded-xl">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 19 17"
                width="24"
                height="24"
                className="text-black"
              >
                <path d="M8.295 15.716A1 1 0 0 0 9.7 14.291L4.33 9h13.67a1 1 0 1 0 0-2H4.336L9.7 1.715A1 1 0 0 0 8.295.29L1.371 7.113a1.25 1.25 0 0 0 0 1.78l6.924 6.823Z"></path>
              </svg>
            </button>
          </div>
          <div className="col-start-3 col-end-8 flex items-center justify-center">
            <p className="text-xl font-semibold">OTP</p>
          </div>
        </div>
      </div>
      <div className=" px-6 animate-[from-r-25_.35s_ease-in-out]">
        <p className="text-xl text-neutral font-bold lg:text-center">
          Kode OTP telah terkirim, cek nomor anda.
        </p>
        <div className="my-6">
          <p className="font-bold text-center text-neutral text-sm">
            {phoneNumber}
          </p>
          <Link href="/join">
            <button className="w-full text-center text-primary text-sm opacity-[.42]">
              Bukan nomor HP anda? Ganti nomor HP disini.
            </button>
          </Link>
        </div>
        {/* <p className="my-6 text-center text-pale text-sm">
          Mengirim Ulang
          <span className="text-primary ml-1">setelah 14 detik</span>
        </p> */}
        <div className="my-5">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-neutral font-bold">
                Masukkan kode OTP.
              </span>
            </label>
            <div
              role="textbox-otp"
              className="InputCode_input-code__qh162 grid grid-cols-6 content-center gap-2"
            >
              {Array.from({ length: 6 }, (_, index) => (
                <input
                  key={index}
                  ref={inputRefs.current[index]}
                  className="input input-bordered text-center px-0 bg-[#F8F8F8]"
                  type="number"
                  min="0"
                  max="9"
                  step="1"
                  maxLength="1"
                  pattern="[0-9]{1}"
                  inputMode="decimal"
                  value={otp[index] || ""}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                />
              ))}
            </div>
          </div>
        </div>
        <div>
          <button
            className="btn btn-primary rounded-full w-full"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Page;
