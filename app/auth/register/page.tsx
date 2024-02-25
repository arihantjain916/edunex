import SignUp from "../../../components/Auth/SignUp";
import { Seo } from "@/components/Seo";

export default function Register() {
  return (
    <>
      <Seo title="Register" description="Register to access the EduNex" />
      <SignUp />
    </>
  );
}
