import { Header } from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import HomePage from "../components/Extra-Page/HomePage";
import TestimonialPage from "../components/Extra-Page/TestimonialPage";
export default function Home() {
  return (
    <>
      <Header />
      <HomePage />
      <TestimonialPage />
      <Footer />
    </>
  );
}
