import Login from "../component/login";
export default function Home() {
  return (
    <div className="relative max-w-[500px] mx-auto w-full flex flex-col min-h-screen shadow-xl shadow-primary/40">
      {/* <button class="btn btn-accent">Ghost</button> */}
      <Login />
    </div>
  );
}
