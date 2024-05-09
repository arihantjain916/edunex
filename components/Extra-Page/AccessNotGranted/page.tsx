import "./index.css";
import Link from "next/link";

const UnauthorizedPage = () => {
  return (
    <main className="w-full h-full m-0 bg-black main">
      <div className="flex justify-center items-center h-screen">
        <div
          id="app"
          className="p-4 flex justify-center items-center h-dvh text-[#54FE55] text-[6rem] flex-col"
        >
          <div>403</div>
          <div className="text-[1.8rem]">
            Forbidden<span className="animate-blink">_</span>
          </div>
          <div className="text-sm">
            <Link href="/">Go to home page?</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UnauthorizedPage;
