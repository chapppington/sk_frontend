"use client";

import { FC, useState, useEffect } from "react";
import { IYandexMapContainerProps } from "@/components/ui/YandexMapContainer/types";
import Image from "next/image";

const YandexMapContainer: FC<IYandexMapContainerProps> = ({
  initialCoordinates = [53.3254, 83.6329],
  onCoordinatesChange,
  height = "250px",
}) => {
  const [coordinates, setCoordinates] =
    useState<[number, number]>(initialCoordinates);
  const [isMapReady, setIsMapReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isMapActive, setIsMapActive] = useState(false);
  const [MapComponents, setMapComponents] = useState<any>(null);
  const isStrictMode = process.env.NODE_ENV === "development";

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Динамический импорт компонентов карты только при активации
  useEffect(() => {
    if (isMapActive && !MapComponents) {
      import("react-yandex-maps").then((mod) => {
        setMapComponents({
          YMaps: mod.YMaps,
          Map: mod.Map,
          Placemark: mod.Placemark,
        });
      });
    }
  }, [isMapActive, MapComponents]);

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

  // До наведения мыши показываем скриншот
  if (!isMapActive) {
    return (
      <div
        className="w-full border-2 border-gray-300 rounded-lg overflow-hidden cursor-pointer"
        style={{ height }}
        onMouseEnter={() => setIsMapActive(true)}
        tabIndex={0}
        aria-label="Активировать карту"
      >
        <Image
          src="/map_preview.png"
          alt="Карта"
          fill
          style={{ objectFit: "cover" }}
          sizes="100vw"
          priority={false}
        />
      </div>
    );
  }

  // После активации — настоящая карта
  if (MapComponents) {
    const { YMaps, Map, Placemark } = MapComponents;
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
                options={{ draggable: true }}
                onDragEnd={handlePlacemarkDragEnd}
              />
            )}
          </Map>
        </YMaps>
      </div>
    );
  }

  // Пока идёт динамический импорт — можно показать лоадер
  return (
    <div
      className="w-full flex items-center justify-center border-2 border-gray-300 rounded-lg bg-gray-100"
      style={{ height }}
    >
      <div className="text-gray-500">Загрузка карты...</div>
    </div>
  );
};

export default YandexMapContainer;
