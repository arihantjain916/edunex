import AboutUsPage from "../../components/Extra-Page/AboutUsPage";
import { Header } from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";

export default function AboutUs() {
  return (
    <>
      <Header />
      <div className="mt-2">
      <AboutUsPage />
      </div>
      <Footer />
    </>
  );
}
