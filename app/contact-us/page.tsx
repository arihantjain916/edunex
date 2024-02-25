import ContactUs from "../../components/Extra-Page/ContactUsPage";
import { Header } from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import { Seo } from "@/components/Seo";

export default function ContactPage() {
  return (
    <>
      <Seo
        title="Contact Us"
        description="Send us message if you discover any bug on our website or you have any problem."
      />
      <Header />
      <ContactUs />
      <Footer />
    </>
  );
}
