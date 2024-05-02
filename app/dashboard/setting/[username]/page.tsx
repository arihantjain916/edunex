import { Seo } from "@/components/Seo";
import Settingpage from "@/components/settings";

type Props = {
  params: {
    username: String;
  };
};

export default function SettingPage({ params }: Props) {
  return (
    <>
      <Seo title="Settings" description="Settings" />
      <Settingpage username = {params.username} />
    </>
  );
}
