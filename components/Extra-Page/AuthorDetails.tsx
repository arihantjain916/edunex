import Link from "next/link";

export interface Author {
  name: string;
  username: string;
  role: string;
}

export const AuthorDetails = ({ name, username, role }: Author) => {
  return (
    <>
      <h2 className="text-xl font-bold mb-2">Author Details:</h2>

      <p className="font-semibold text-lg">
        Name: <span className="font-normal">{name}</span>
      </p>
      <p className="font-semibold text-lg">
        Role: <span className="font-normal capitalize">{role}</span>
      </p>
      <Link
        className="text-blue-700 underline mt-1 text-lg"
        href={`/dashboard/${username}`}
      >
        Visit Profile
      </Link>
    </>
  );
};
