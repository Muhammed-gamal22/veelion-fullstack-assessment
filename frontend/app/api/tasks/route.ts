import { NextResponse } from "next/server";
import { createTaskInBackend, getTasksFromBackend } from "@/lib/backendApi";

export async function GET() {
  try {
    const tasks = await getTasksFromBackend();
    return NextResponse.json({ data: tasks }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error instanceof Error ? error.message : "Unable to fetch tasks." } },
      { status: 500 }
    );
  }
}
export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { title: string; status: "todo" | "in_progress" | "done" };
    const task = await createTaskInBackend(payload);
    return NextResponse.json({ data: task }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: { message: error instanceof Error ? error.message : "Unable to create task." } },
      { status: 500 }
    );
  }
}
