import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { getHabits } from "~/models/habit.server";
import { requireUserId } from "~/session.server";

export async function loader({ request }: LoaderArgs) {
  const userId = await requireUserId(request);
  const habits = await getHabits({ userId });
  return json({ habits });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  return (
    <main className="p-4">
      <Form action="/logout" method="post">
        <button type="submit">Log out</button>
      </Form>
      <ul>
        {data.habits.map((habit) => (
          <li key={habit.id}>{habit.title}</li>
        ))}
      </ul>
      <Link to="/new" className="underline">
        Add habit
      </Link>
    </main>
  );
}
