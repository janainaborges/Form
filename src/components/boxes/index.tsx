import React, { useState } from "react";
import CustomButton from "../button";
import { useWeather } from "@/Hook/weather";
import { BoxesProps } from "@/types/components/boxes.types";

const Boxes: React.FC<BoxesProps> = ({ contents }) => {
  const [currentBox, setCurrentBox] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const weather = useWeather();

  const transition = (callback: () => void) => {
    setTransitioning(true);
    setTimeout(() => {
      callback();
      setTransitioning(false);
    }, 300);
  };

  const handleNext = () => {
    transition(() => {
      if (currentBox < contents.length - 1) {
        setCurrentBox(currentBox + 1);
      } else {
        setIsFinished(true);
      }
    });
  };

  const handleBack = () => {
    transition(() => {
      if (currentBox > 0) {
        setCurrentBox(currentBox - 1);
      }
    });
  };

  const restart = () => {
    transition(() => {
      setCurrentBox(0);
      setIsFinished(false);
    });
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-r from-gray-100 to-gray-300 flex flex-col justify-center items-center py-10 transition-opacity duration-300 ${
        transitioning ? "opacity-0" : "opacity-100"
      }`}
    >
      <div className="w-full max-w-4xl p-5 bg-white rounded-md shadow-lg transition-transform transform hover:scale-105">
        {!isFinished ? (
          <div
            key={contents[currentBox].key}
            className="bg-gray-200 p-6 rounded-md transition-shadow hover:shadow-md"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2 md:space-y-4">
                {contents.map((content, index) => (
                  <CustomButton
                    key={content.key}
                    onClick={() => setCurrentBox(index)}
                    title={content.title}
                    backgroundColor={
                      currentBox === index
                        ? "bg-blue-500"
                        : "bg-transparent border border-blue-500 text-blue-500"
                    }
                    titleColor={
                      currentBox === index ? "text-white" : "text-blue-500"
                    }
                  />
                ))}
              </div>
              {weather?.weather && (
                <div className="mb-4 flex flex-row items-center justify-between space-x-4 md:space-x-0 md:flex-col md:items-start">
                  <div className="flex flex-col items-end text-lg md:items-start md:mt-4">
                    <h1 className="font-semibold mb-2 animate-pulse">
                      {weather.weather.city}
                    </h1>
                    <p className="font-light">
                      {weather.weather.temp}°C | {weather.weather.condition}
                    </p>
                    <div className="flex space-x-4 mt-2">
                      <p>Min: {weather.weather.min}°C</p>
                      <p>Max: {weather.weather.max}°C</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {contents[currentBox].container}
            <div className="flex justify-end gap-5 mt-3">
              <CustomButton
                onClick={handleBack}
                title="Voltar"
                backgroundColor="bg-gray-300"
                titleColor="text-white"
              />
              <CustomButton
                onClick={handleNext}
                title={
                  currentBox === contents.length - 1 ? "Finalizar" : "Próximo"
                }
              />
            </div>
          </div>
        ) : (
          <div className="bg-gray-200 p-6 rounded-md flex flex-col justify-center items-center gap-4">
            <p className="text-2xl font-semibold">Você chegou ao fim!</p>
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
