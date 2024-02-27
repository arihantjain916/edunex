import UnauthorizedPage from "../../components/Extra-Page/AccessNotGranted/page";
import { Seo } from "@/components/Seo";

export default function Unauthorized() {
  return (
    <>
      <Seo title="Page Not Found" description="Page Not Found" />
      <UnauthorizedPage />
    </>
  );
}
