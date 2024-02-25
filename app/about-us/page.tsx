import AboutUsPage from "../../components/Extra-Page/AboutUsPage";
import { Header } from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import { Seo } from "@/components/Seo";

export default function AboutUs() {
  return (
    <>
      <Seo title="About Us" description="About EduNex" />
      <Header />
      <div className="mt-2">
      <AboutUsPage />
      </div>
      <Footer />
    </>
  );
}
