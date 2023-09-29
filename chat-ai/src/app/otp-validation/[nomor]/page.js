"use client"; // This is a client component 👈🏽
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { verifyOtp } from "../../../../utils/api/verifyOtp"; // Import fungsi sendOtp
import { useRouter } from "next/navigation";

function Page({ params }) {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(params.nomor);
  // Buat ref untuk setiap input
  const inputRefs = useRef(Array.from({ length: 6 }, () => React.createRef()));
  // State untuk mengontrol tampilan pesan kesalahan
  const [errorVisible, setErrorVisible] = useState(true);
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
    // console.log(otp);
  };

  const handleSubmit = async (e) => {
    // Redirect ke halaman '/chat'

    // e.preventDefault(); // Menghentikan pengiriman formulir bawaan
    console.log(otp);

    try {
      // Lakukan validasi OTP
      if (otp.length !== 6) {
        throw new Error("OTP harus terdiri dari 6 digit");
      }

      // Kirim OTP untuk verifikasi
      const verificationResponse = await verifyOtp(phoneNumber, otp);
      // Jika verifikasi berhasil dan Anda menerima access token dari respons,
      // simpan access token ke local storage, cookie, atau state aplikasi

      const accessToken = verificationResponse.data.access_token;
      if (accessToken) {
        // console.log("terdapat accesstoken = " + accessToken);
        // Simpan access token sesuai preferensi Anda (contoh dengan local storage)
        localStorage.setItem("accessToken", accessToken);
      }

      router.push("/chat");
      // console.log(verificationResponse); // Handle responsenya sesuai kebutuhan
    } catch (error) {
      console.log("masuk error ni, bisa di refresh");

      // Open the modal
      const modal = document.getElementById("popup-modal");
      modal.classList.remove("hidden");
      // modal.classList.remove("z-50");
      modal.classList.add("block");
      // Add a class to darken the background when the modal is open
      document.body.classList.add("modal-open");
      // Open the modal
      const modalBackground = document.getElementById("modal-overlay");
      modalBackground.classList.remove("hidden");
      console.error(error); // Handle error jika terjadi
    }
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
      {/* modal */}
      <div
        id="popup-modal"
        tabIndex="-1"
        className="fixed top-0 left-0 right-0 z-50 hidden p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div
          id="popup-modal"
          tabIndex="-1"
          className="flex justify-center fixed top-0 left-0 right-0 z-50 pt-40 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
        >
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="p-6 text-center">
                <svg
                  className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  OTP yang Anda masukkan salah. Silakan coba lagi.
                </h3>
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                  onClick={(e) => {
                    window.location.reload();
                  }}
                >
                  Masukkan Ulang OTP
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ./modal */}
      {/* Add an overlay to darken the background */}
      <div
        id="modal-overlay"
        className="hidden fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-40"
      ></div>
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
