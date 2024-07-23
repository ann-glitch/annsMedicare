import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-4 items-center justify-center">
      <h3 className="text-3xl">Page not found</h3>
      <Link to={"/"} className="bg-primaryBlue py-3 px-4 rounded-md text-white">
        Go Home
      </Link>
    </div>
  );
}
