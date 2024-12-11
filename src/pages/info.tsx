import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function InfoPage() {
  const router = useRouter();
  const { number, data } = router.query; // Получаем параметры из URL

  const [error, setError] = useState("");

  useEffect(() => {
    if (!data) {
      setError("Нет данных для отображения");
    }
  }, [data]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-black">
        Информация о {number === "random" ? "рандомном числе" : number}:
      </h1>
      {error && <p className="text-red-500">{error}</p>}
      <p className="text-lg text-black text-center">
        {typeof data === "string"
          ? decodeURIComponent(data)
          : "Данные отсутствуют"}
      </p>

      <div className="flex gap-12">
        <Button
          onClick={() => router.push("/")}
          variant="contained"
          className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Вернуться на главную
        </Button>
      </div>
    </div>
  );
}
