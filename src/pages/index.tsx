import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  CircularProgress, // Импортируем CircularProgress для индикатора загрузки
} from "@mui/material";

export default function Home() {
  const [type, setType] = useState("math");
  const [number, setNumber] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [errors, setErrors] = useState({ month: "", day: "", general: "" });
  const [isLoading, setIsLoading] = useState(false); // Состояние для отслеживания загрузки
  const router = useRouter();

  const handleSubmit = async () => {
    setErrors({ month: "", day: "", general: "" });

    if (type === "date") {
      if (!month || !day) {
        await fetchDataAndRedirect(type, number || "random");
        return;
      }

      if (Number(month) < 1 || Number(month) > 12 || isNaN(Number(month))) {
        setErrors((prev) => ({
          ...prev,
          month: "Месяц должен быть от 1 до 12",
        }));
        return;
      }
      if (Number(day) < 1 || Number(day) > 31 || isNaN(Number(day))) {
        setErrors((prev) => ({ ...prev, day: "День должен быть от 1 до 31" }));
        return;
      }

      const dateStr = `${month}/${day}`;
      // Запрос данных и передача их в компонент InfoPage
      await fetchDataAndRedirect(type, dateStr);
    } else {
      if (number && isNaN(Number(number))) {
        setErrors((prev) => ({
          ...prev,
          general: "Число должно быть в виде цифры",
        }));
        return;
      }
      await fetchDataAndRedirect(type, number || "random");
    }
  };

  // Функция для выполнения запроса и перенаправления с данными
  const fetchDataAndRedirect = async (type: string, number: string) => {
    setIsLoading(true); // Устанавливаем isLoading в true перед запросом
    try {
      const response = await fetch(`http://numbersapi.com/${number}/${type}`);
      const data = await response.text();
      router.push(
        `/info?type=${type}&number=${number}&data=${encodeURIComponent(data)}`
      );
    } catch (error) {
      console.error("Ошибка запроса:", error);
    } finally {
      setIsLoading(false); // Устанавливаем isLoading в false после запроса
    }
  };

  useEffect(() => {
    if (type === "date") {
      setNumber("");
      setErrors({ month: "", day: "", general: "" });
    } else {
      setDay("");
      setMonth("");
      setErrors({ month: "", day: "", general: "" });
    }
  }, [type]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4 text-black">
        Информация о числах
      </h1>
      <div className="flex flex-col gap-4 w-full max-w-sm">
        <FormControl fullWidth>
          <InputLabel id="select-type-label">
            Выберите тип информации
          </InputLabel>
          <Select
            labelId="select-type-label"
            value={type}
            onChange={(e) => setType(e.target.value)}
            label="Выберите тип информации"
          >
            <MenuItem value="math">Math</MenuItem>
            <MenuItem value="trivia">Trivia</MenuItem>
            <MenuItem value="date">Date</MenuItem>
            <MenuItem value="year">Year</MenuItem>
          </Select>
        </FormControl>

        {type === "date" ? (
          <>
            <div className="flex gap-4">
              <TextField
                label="Месяц (1-12)"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
                fullWidth
                error={!!errors.month}
                helperText={errors.month}
                type="number"
              />
              <TextField
                label="День (1-31)"
                value={day}
                onChange={(e) => setDay(e.target.value)}
                fullWidth
                error={!!errors.day}
                helperText={errors.day}
                type="number"
              />
            </div>
            <p className="text-gray-600 text-sm font-normal leading-6 tracking-wide text-left mt-[-15px] mr-4 mb-0">
              Оставьте поля пустыми для случайного числа
            </p>
          </>
        ) : (
          <>
            <TextField
              label="Введите число"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              fullWidth
              error={!!errors.general}
              helperText={errors.general}
            />
            <p className="text-gray-600 text-sm font-normal leading-6 tracking-wide text-left mt-[-15px] mr-4 mb-0">
              Оставьте поле пустым для случайного числа
            </p>
          </>
        )}

        {/* Условный рендеринг кнопки или индикатора загрузки */}
        {isLoading ? (
          <Button disabled variant="outlined">
            <CircularProgress size={35} color="primary" />
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            variant="contained"
            className="p-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Узнать
          </Button>
        )}
      </div>
    </div>
  );
}
