import { NextResponse } from "next/server";

// write response logic here
export function errorResponse(message: string, status: number) {
  return NextResponse.json({ error: message }, { status });
}

export function successResponse(data: object, status: number = 200) {
  return NextResponse.json(data, { status });
}
