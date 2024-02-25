import SignIn from "../../../components/Auth/SignIn";
import { Seo } from "@/components/Seo";

export default function Login() {
  return (
    <>
      <Seo title="Login" description="Login to dive in the EduNex" />
      <SignIn />
    </>
  );
}
