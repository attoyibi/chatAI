// `app/dashboard/page.js` is the UI for the `/dashboard` URL
export default function Page() {
  return (
    <div className="relative max-w-[500px] mx-auto w-full flex flex-col min-h-screen shadow-xl shadow-primary/40">
      <div>
        <div className="fixed w-full z-10">
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
              <p className="text-xl font-semibold">JOIN</p>
            </div>
          </div>
        </div>
        <div className="invisible">
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
              <p className="text-xl font-semibold">JOIN</p>
            </div>
          </div>
        </div>
      </div>
      <div className="px-6 animate-[from-r-25_.35s_ease-in-out]">
        <div className="mt-5">
          <p className="font-bold text-neutral text-xl lg:text-center">
            Selamat datang! Daftarkan nomor HP anda untuk gabung.
          </p>
          <div className="mt-5">
            <button className="tab">Email</button>
            <button className="tab tab-bordered tab-active pointer-events-none">
              Nomor Hp
            </button>
            <div className="mt-5">
              <div className="animate-[from-r-25_.35s_ease-in-out]">
                <p>Silahkan daftar menggunakan nomor HP anda.</p>
                <div className="grid grid-cols-6 font-semibold w-full items-end mt-5">
                  <select
                    disabled=""
                    className="select select-bordered border-1 border-solid border-[#E3E3E3] mr-2 col-span-2 mb-4 cursor-not-allowed"
                  >
                    <option disabled="" value="DEFAULT">
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
                        className="w-full bg-transparent text-base-content outline-none"
                        placeholder="123456789"
                        type="tel"
                        value=""
                      />
                    </div>
                    <div className="text-[10px] font-medium h-4 text-zinc-400"></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 mt-5">
                  <button
                    role="button"
                    disabled=""
                    className="btn btn-primary text-primary-content disabled:cursor-not-allowed disabled:opacity-60 text-center relative w-full rounded-full"
                  >
                    WHATSAPP
                  </button>
                  <button
                    role="button"
                    disabled=""
                    className="btn btn-primary text-primary-content disabled:cursor-not-allowed disabled:opacity-60 text-center relative w-full rounded-full"
                  >
                    TEXT MESSAGE
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <p className="text-center my-6 text-sm text-neutral">
          Sudah memiliki akun?
        </p>
        <a
          className="btn btn-primary text-center relative w-full rounded-full bg-secondary text-primary border-none hover:bg-neutral/20"
          href="/signin"
        >
          SIGN IN
        </a> */}
      </div>
    </div>
  );
}
