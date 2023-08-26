// Boxes.tsx
import React, { ReactNode, useState } from "react";
import CustomButton from "../CustomButton";
import { useWeather } from "@/Hook/weather";

interface BoxContent {
  key: number;
  container: JSX.Element;
}

interface BoxesProps {
  contents: BoxContent[];
}

const Boxes: React.FC<BoxesProps> = ({ contents }) => {
  const [currentBox, setCurrentBox] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const weather = useWeather();

  const handleNext = () => {
    if (currentBox < contents.length - 1) {
      setCurrentBox(currentBox + 1);
    } else {
      setIsFinished(true);
    }
  };

  const restart = () => {
    setCurrentBox(0);
    setIsFinished(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-10">
      <div className="w-full max-w-4xl p-5 bg-white rounded-md shadow-md">
        {!isFinished ? (
          <div
            key={contents[currentBox].key}
            className="bg-gray-200 p-6 rounded-md"
          >
            {weather.temp}
            {contents[currentBox].container}
            <div className="flex justify-end">
              <CustomButton
                onClick={handleNext}
                title={currentBox === contents.length - 1 ? "Finalize" : "Next"}
              />
            </div>
          </div>
        ) : (
          <div className="bg-gray-200 p-6 rounded-md flex flex-col justify-center items-center gap-4">
            <p>Você chegou ao fim!</p>
            <CustomButton
              onClick={restart}
              backgroundColor="bg-red-500"
              title="Iniciar novamente"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Boxes;
