import { Link } from "@remix-run/react";
import { useOptionalUser } from "~/utils";

export default function Index() {
  const user = useOptionalUser();

  if (!user) {
    return (
      <main className="space-x-4 p-4">
        <Link to="/join" className="underline">
          Sign up
        </Link>
        <Link to="/login" className="underline">
          Log in
        </Link>
      </main>
    );
  }

  return (
    <main className="p-4">
      <Link to="/notes" className="underline">
        View notes for {user.email}
      </Link>
    </main>
  );
}
