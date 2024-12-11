"use client";

import { useRouter } from "next/navigation";
import { Button } from "@mui/material";
import { useDataContext } from "@/contexts/DataContext";

export default function InfoPage() {
  const { data } = useDataContext();
  const router = useRouter();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-black">
        Информация о {data.number === "random" ? "рандомном числе" : data.number}:
      </h1>
      <p className="text-lg text-black text-center">
        {data.text ? data.text : "Данные отсутствуют"}
      </p>
      <Button
        onClick={() => router.push("/")}
        variant="contained"
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Вернуться на главную
      </Button>
    </div>
  );
}