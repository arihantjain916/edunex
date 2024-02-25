export interface Seo {
  title: string;
  description: string;
}

export const Seo = ({ title, description }: Seo) => {
  const metadata = {
    title: `${title} | EduNex` || "EduNex",
    description: `${description}` || "Created by Arihant Jain",
  };
  return (
    <>
      <title>{metadata.title}</title>
      <meta name="description" content={metadata.description} />
    </>
  );
};
