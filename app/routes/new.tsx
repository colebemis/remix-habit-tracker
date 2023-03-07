import type { ActionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import * as React from "react";
import { createHabit } from "~/models/habit.server";
import { requireUserId } from "~/session.server";

export async function action({ request }: ActionArgs) {
  const userId = await requireUserId(request);

  const formData = await request.formData();
  const title = formData.get("title");

  if (typeof title !== "string" || title.length === 0) {
    return json(
      { errors: { title: "Title is required", body: null } },
      { status: 400 }
    );
  }

  await createHabit({ title, userId });

  return redirect("/");
}

export default function NewHabitPage() {
  const actionData = useActionData<typeof action>();
  const titleRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (actionData?.errors?.title) {
      titleRef.current?.focus();
    }
  }, [actionData]);

  return (
    <div className="mx-auto max-w-md space-y-4 p-6">
      <h1 id="new-habit" className="text-2xl font-bold">
        New habit
      </h1>
      <Form aria-labelledby="new-habit" method="post" className="space-y-4">
        <div>
          <label className="flex w-full flex-col gap-1">
            <span>Title</span>
            <input
              ref={titleRef}
              name="title"
              className="border border-black px-3 py-2"
              aria-invalid={actionData?.errors?.title ? true : undefined}
              aria-errormessage={
                actionData?.errors?.title ? "title-error" : undefined
              }
            />
          </label>
          {actionData?.errors?.title && (
            <div className="pt-1 text-red-700" id="title-error">
              {actionData.errors.title}
            </div>
          )}
        </div>

        <div className="text-right">
          <button type="submit" className="bg-black py-2 px-3 text-white">
            Add
          </button>
        </div>
      </Form>
    </div>
  );
}
