import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const number = searchParams.get("number") || "random";

  if (!type) {
    return NextResponse.json(
      { error: "Тип информации (type) не указан." },
      { status: 400 }
    );
  }

  try {
    const apiResponse = await fetch(`http://numbersapi.com/${number}/${type}`);
    const data = await apiResponse.text();
    return NextResponse.json({ data });
  } catch (error) {
    console.error("Ошибка запроса:", error);
    return NextResponse.json(
      { error: "Не удалось получить данные от Numbers API." },
      { status: 500 }
    );
  }
}