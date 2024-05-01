function PageTitle({ title }: { title: String }) {
  return (
    <div className="mt-2">
      <h1 className="text-center font-bold text-3xl">{title}</h1>
    </div>
  );
}

export default PageTitle;
