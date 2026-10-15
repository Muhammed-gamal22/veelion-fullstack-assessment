import { NextResponse } from "next/server";
import { updateTaskInBackend } from "@/lib/backendApi";

type RouteParams = {
  params: {
    id: string;
  };
};

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const payload = (await request.json()) as { status: "todo" | "in_progress" | "done" };

    if (!["todo", "in_progress", "done"].includes(payload.status || "")) {
      return NextResponse.json(
        { error: { message: "status must be one of: todo, in_progress, done" } },
        { status: 400 }
      );
    }

    const task = await updateTaskInBackend(params.id, payload.status);
    return NextResponse.json({ data: task }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error instanceof Error ? error.message : "Unable to update task." } },
      { status: 500 }
    );
  }
}
