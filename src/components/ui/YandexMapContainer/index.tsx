"use client";

import { FC, useState, useEffect } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import { IYandexMapContainerProps } from "@/components/ui/YandexMapContainer/types";

const YandexMapContainer: FC<IYandexMapContainerProps> = ({
  initialCoordinates = [53.3254, 83.6329],
  onCoordinatesChange,
  height = "250px",
}) => {
  const [coordinates, setCoordinates] =
    useState<[number, number]>(initialCoordinates);
  const [isMapReady, setIsMapReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const isStrictMode = process.env.NODE_ENV === "development";

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleMapClick = (e: any) => {
    if (!isMapReady) return;

    try {
      const newCoordinates: [number, number] = e.get("coords");
      setCoordinates(newCoordinates);
      if (onCoordinatesChange) {
        onCoordinatesChange(newCoordinates);
      }
    } catch (error) {
      console.error("Error handling map click:", error);
    }
  };

  const handleMapReady = () => {
    if (isMounted) {
      setIsMapReady(true);
    }
  };

  const handlePlacemarkDragEnd = (e: any) => {
    if (!isMapReady) return;

    try {
      const newCoordinates: [number, number] = e
        .get("target")
        .geometry.getCoordinates();
      setCoordinates(newCoordinates);
      if (onCoordinatesChange) {
        onCoordinatesChange(newCoordinates);
      }
    } catch (error) {
      console.error("Error handling placemark drag:", error);
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
          onLoad={handleMapReady}
        >
          {isMapReady && isMounted && (
            <Placemark
              geometry={coordinates}
              options={{
                draggable: true,
              }}
              onDragEnd={handlePlacemarkDragEnd}
            />
          )}
        </Map>
      </YMaps>
    </div>
  );
};

export default YandexMapContainer;
