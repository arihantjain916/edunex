import ErrorPage from "../components/Extra-Page/ErrorPage";
import { Seo } from "@/components/Seo";


export default function Errorpage() {
  return (
    <>
      <Seo title="Page Not Found" description="Page Not Found" />
      <ErrorPage />
    </>
  );
}
