"use client";

import { FC, useState } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";

interface YandexMapContainerProps {
  initialCoordinates?: [number, number];
  onCoordinatesChange?: (coordinates: [number, number]) => void;
  height?: string | number;
}

const YandexMapContainer: FC<YandexMapContainerProps> = ({
  initialCoordinates = [55.751574, 37.573856], // Default to Moscow coordinates
  onCoordinatesChange,
  height = "250px",
}) => {
  const [coordinates, setCoordinates] =
    useState<[number, number]>(initialCoordinates);
  const isStrictMode = process.env.NODE_ENV === "development";

  const handleMapClick = (e: any) => {
    const newCoordinates: [number, number] = e.get("coords");
    setCoordinates(newCoordinates);
    if (onCoordinatesChange) {
      onCoordinatesChange(newCoordinates);
    }
  };

  if (isStrictMode) {
    return (
      <div
        className="w-full border-2 border-gray-300 rounded-lg flex items-center justify-center bg-gray-100"
        style={{ height }}
      >
        <div className="text-gray-500">Map Preview (Dev Mode)</div>
      </div>
    );
  }

  return (
    <div className="w-full" style={{ height }}>
      <YMaps>
        <Map
          defaultState={{
            center: coordinates,
            zoom: 9,
          }}
          width="100%"
          height="100%"
          onClick={handleMapClick}
        >
          <Placemark
            geometry={coordinates}
            options={{
              draggable: true,
            }}
            onDragEnd={(e: any) => {
              const newCoordinates: [number, number] = e
                .get("target")
                .geometry.getCoordinates();
              setCoordinates(newCoordinates);
              if (onCoordinatesChange) {
                onCoordinatesChange(newCoordinates);
              }
            }}
          />
        </Map>
      </YMaps>
    </div>
  );
};

export default YandexMapContainer;
