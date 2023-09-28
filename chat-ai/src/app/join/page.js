"use client"; // This is a client component 👈🏽
import React, { useState } from "react";
import { sendOtp } from "../../../utils/api/sendOtp"; // Import fungsi sendOtp
import { useRouter } from "next/navigation";
import Link from "next/link";
export default function Page() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true); // State untuk menandai apakah nomor HP valid
  const [isLoading, setIsLoading] = useState(false);
  const [buttonStatus, setbuttonStatus] = useState(true); // State untuk menandai apakah nomor HP valid

  console.log(phoneNumber);
  const validatePhoneNumber = (phoneNumber) => {
    // Menghapus spasi di awal dan akhir nomor telepon
    const trimmedPhoneNumber = phoneNumber.trim();

    // Menghapus semua spasi dari tengah nomor telepon
    const numericPhoneNumber = trimmedPhoneNumber.replace(/\s/g, "");

    // Memeriksa apakah panjang numericPhoneNumber berada di antara 10 hingga 15 karakter
    return numericPhoneNumber.length >= 10 && numericPhoneNumber.length <= 15;
  };

  const handleSendOtp = async () => {
    if (!validatePhoneNumber(phoneNumber)) {
      setIsPhoneNumberValid(false);
      return; // Berhenti jika nomor HP tidak valid
    }
    try {
      setIsLoading(true); // Aktifkan loading state
      const response = await sendOtp("+62" + phoneNumber);
      console.log(response); // Handle responsenya sesuai kebutuhan
      setIsLoading(false); // Matikan loading state
      router.push("/otp-validation/" + "+62" + phoneNumber);
    } catch (error) {
      console.error(error); // Handle error jika terjadi
      setIsLoading(false); // Matikan loading state
    }
    console.log("print");
  };

  return (
    // <body className="bg-white">
    <div className="bg-white relative max-w-[500px] mx-auto w-full flex flex-col min-h-screen shadow-xl shadow-primary/40">
      <div>
        <div className="fixed w-full z-10">
          <div className="grid grid-cols-9 gap-3 px-5 py-3 max-w-[500px] bg-white">
            <div className="flex items-center">
              <Link href="/">
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
              <p className="text-xl font-semibold">JOIN</p>
            </div>
          </div>
        </div>
        <div className="invisible">
          <div className="grid grid-cols-9 gap-3 px-5 py-3 max-w-[500px] bg-white">
            <div className="flex items-center">
              <Link href="/">
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
              <p className="text-xl font-semibold">JOIN</p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 animate-[from-r-25_.35s_ease-in-out]">
        <div className="mt-5">
          <p className="font-bold text-neutral text-xl lg:text-center">
            Selamat datang! Daftarkan Nomor HP anda untuk gabung.
          </p>
          <div className="mt-5">
            {/* <button className="tab tab-bordered tab-active pointer-events-none">
              Nomor HP
            </button> */}
            {/* <button className="tab">Nomor Hp</button> */}
            <div className="mt-5">
              <div className="animate-[from-l-25_.35s_ease-in-out]">
                <p>Silahkan daftar menggunakan Nomor HP anda.</p>
                <div className="grid grid-cols-6 font-semibold w-full items-end mt-5">
                  <select
                    disabled
                    className="select select-bordered border-1 border-solid border-[#E3E3E3] mr-2 col-span-2 mb-4 cursor-not-allowed"
                  >
                    <option disabled value="DEFAULT">
                      Pick your choice
                    </option>
                    <option value="62">+62</option>
                  </select>
                  <div className="relative w-full col-span-4">
                    <div className="flex justify-between items-end mb-1">
                      <label className="block text-zinc-500 font-bold text-sm">
                        No. HP
                      </label>
                    </div>
                    <div className="flex items-center w-full border rounded-4 p-3 text-zinc-700 rounded-lg border-zinc-200">
                      <input
                        role="textbox-tel"
                        className={`w-full bg-transparent text-base-content outline-none ${
                          isPhoneNumberValid ? "" : "border-red-500"
                        }`}
                        placeholder="8xxxxxxxxx"
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => {
                          const inputValue = e.target.value;
                          // Mencegah karakter 0 di awal nomor telepon
                          if (inputValue.length === 1 && inputValue === "0") {
                            setPhoneNumber(""); // Mengosongkan nomor telepon jika karakter 0 di awal
                          } else {
                            setPhoneNumber(inputValue); // Mengatur nilai nomor telepon
                          }
                          if (!validatePhoneNumber(inputValue)) {
                            setIsPhoneNumberValid(false);
                            setbuttonStatus(false);
                          } else {
                            setIsPhoneNumberValid(true);
                          }
                        }}
                      />
                    </div>
                    <div className="text-[10px] font-medium h-4 text-zinc-400"></div>
                  </div>
                </div>

                {/* just form hp */}
                {/* <div className="relative mt-5">
                  <div className="flex justify-between items-end mb-1">
                    <label className="block text-zinc-500 font-bold text-sm">
                      Nomor HP
                    </label>
                  </div>
                  <div className="flex items-center w-full border rounded-4 p-3 text-zinc-700 rounded-lg border-zinc-200">
                    <input
                      role="textbox-text"
                      className={`w-full bg-transparent text-base-content outline-none ${
                        isPhoneNumberValid ? "" : "border-red-500" // Menampilkan border merah jika nomor HP tidak valid
                      }`}
                      placeholder="+62xxxxxxxxxx"
                      type="number"
                      value={phoneNumber}
                      onChange={onChangePhoneNumber}
                    />
                  </div>
                  <div className="text-[10px] font-medium h-4 text-zinc-400"></div>
                </div> */}
                {!isPhoneNumberValid && (
                  <div className="text-red-500 text-sm mt-1">
                    Nomor HP harus berisi minimal 10 digit angka.
                  </div>
                )}
                {/* <Link href="/otp"> */}
                <button
                  role="button"
                  // disabled={true} // Tombol dinonaktifkan jika nomor HP tidak valid atau dalam proses pengiriman OTP
                  disabled={!isPhoneNumberValid || buttonStatus} // Tombol dinonaktifkan jika nomor HP tidak valid atau dalam proses pengiriman OTP
                  className="btn btn-primary text-primary-content disabled:cursor-not-allowed disabled:opacity-60 text-center relative w-full rounded-full mt-5"
                  onClick={handleSendOtp}
                >
                  Kirim OTP
                </button>
                {/* </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </body>
  );
}
