import "./index.css";
import Link from "next/link";

const UnauthorizedPage = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div id="app">
        <div>403</div>
        <div className="txt">
          Forbidden<span className="blink">_</span>
        </div>
        <div className="text-sm">
          <Link href="/">Go to home page?</Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
