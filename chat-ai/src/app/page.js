import Login from "../component/login";
export default function Home() {
  return (
    <div className="relative max-w-[500px] mx-auto w-full flex flex-col min-h-screen shadow-xl shadow-primary/40">
      {/* <button class="btn btn-accent">Ghost</button> */}
      {/* <Login />*/}
      <div className="min-h-screen bg-primary">
        <div className="w-full bg-primary text-primary-content flex flex-col justify-end items-center gap-8 pt-8">
          <img
            alt="Mira Miracle, Avatara mascot"
            fetchPriority="high"
            width="350"
            height="350"
            decoding="async"
            data-nimg="1"
            className="animate-[from-l-25_.35s_ease-in-out]"
            srcSet="https://cdn-icons-png.flaticon.com/512/4712/4712109.png 1x, https://cdn-icons-png.flaticon.com/512/4712/4712109.png 2x"
            src="https://cdn-icons-png.flaticon.com/512/4712/4712109.png"
            style={{ color: "transparent" }}
          />
        </div>
        <div className="fixed w-full bottom-0">
          <div className="max-w-[500px] bg-white px-6 py-4 animate-[from-b-25_.35s_ease-in-out]">
            <h1 className="font-bold text-lg sm:text-2xl mb-3">
              Chat denganku setiap saat denga22n{" "}
              <strong className="text-[#FC814A]">AI</strong> dari Avatara
            </h1>
            <h4 className="text-zinc-400 text-md sm:text-xl mb-6">
              Rasakan pengalaman berbincang seolah sedang chatting dengan idola
              favoritmu
            </h4>
            <a
              className="btn btn-primary text-primary-content text-center relative w-full rounded-full"
              href="/join"
            >
              Chat Now
            </a>
            {/* <a
            className="btn btn-primary text-center relative w-full mt-4 bg-white text-primary rounded-full hover:bg-primary/25"
            href="/signin"
          >
            Sign In
          </a> */}
          </div>
        </div>
      </div>
    </div>
  );
}
