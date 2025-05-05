import * as Tools from "../../tools";
import * as THREE from 'three';
import {
    useState, useEffect, forwardRef, useImperativeHandle, useRef
} from "react";
import { Line } from '@react-three/drei';

function catmullToBezier(points, closed = false) {
    if (!points || points.length < 4) {
        console.warn("Недостаточно точек для создания кривой Безье");
        return [];
    }

    try {
        const bezierCurves = [];
        const curveCount = closed ? points.length : points.length - 3;

        for (let i = 0; i < curveCount; i++) {

            const p0 = points[i % points.length];
            const p1 = points[(i + 1) % points.length];
            const p2 = points[(i + 2) % points.length];
            const p3 = points[(i + 3) % points.length];

            // Проверка на корректность точек
            if (!p0 || !p1 || !p2 || !p3) {
                console.warn(`Пропуск сегмента ${i} из-за некорректных точек`);
                continue;
            }

            const tension = 0.5;

            // Контрольные точки
            const control1 = new THREE.Vector3().copy(p1).add(
                new THREE.Vector3().subVectors(p2, p0).multiplyScalar(tension / 6)
            );

            const control2 = new THREE.Vector3().copy(p2).add(
                new THREE.Vector3().subVectors(p1, p3).multiplyScalar(tension / 6)
            );

            // Создаем кривую
            const bezierCurve = new THREE.CubicBezierCurve3(p1, control1, control2, p2);
            bezierCurves.push(bezierCurve);
        }

        return bezierCurves;
    } catch (error) {
        console.error("Ошибка в функции catmullToBezier:", error);
        return [];
    }
}

export const Curve = forwardRef((props, ref) => {
    const [curvePoints, setCurvePoints] = useState(null);
    const [allPoints, setAllPoints] = useState([]);
    const pathRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    // Загрузка данных точек из JSON
    useEffect(() => {
        setIsLoading(true);
        Tools.loadJSON("testCurve.json")
            .then((data) => {
                if (!data || !data.points || !Array.isArray(data.points)) {
                    throw new Error("Некорректный формат JSON");
                }

                const points = [];
                // Безопасное извлечение точек
                for (let i = 0; i < data.points.length; i++) {
                    if (data.points[i] &&
                        typeof data.points[i].x === 'number' &&
                        typeof data.points[i].y === 'number' &&
                        typeof data.points[i].z === 'number') {
                        points.push(new THREE.Vector3(
                            data.points[i].x,
                            data.points[i].y,
                            data.points[i].z
                        ));
                    }
                }

                if (points.length < 4) {
                    throw new Error("Недостаточно точек для построения кривой");
                }

                setCurvePoints(points);
                console.log(`Загружено ${points.length} точек`);
            })
            .catch((error) => {
                console.error("Ошибка загрузки JSON:", error);
                // Резервные точки для тестирования
                const backupPoints = [
                    new THREE.Vector3(0, 2, 5),
                    new THREE.Vector3(5, 2, 0),
                    new THREE.Vector3(0, 2, -5),
                    new THREE.Vector3(-5, 2, 0),
                    new THREE.Vector3(0, 2, 5)
                ];
                setCurvePoints(backupPoints);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    // Создание кривой из точек
    useEffect(() => {
        if (!curvePoints || curvePoints.length < 4) return;

        try {
            const bezierCurves = catmullToBezier(curvePoints, false);

            if (bezierCurves.length === 0) {
                console.warn("Не удалось создать кривые Безье");
                return;
            }

            const path = new THREE.CurvePath();
            bezierCurves.forEach(curve => path.add(curve));
            pathRef.current = path;

            const points = [];
            bezierCurves.forEach(curve => {
                // Получаем 20 точек для каждого сегмента кривой
                const segmentPoints = curve.getPoints(65);
                if (segmentPoints && segmentPoints.length > 0) {
                    points.push(...segmentPoints);
                }
            });

            if (points.length > 0) {
                setAllPoints(points);
                console.log(`Сгенерировано ${points.length} точек для линии`);
            } else {
                console.warn("Не удалось получить точки для отображения");
            }
        } catch (error) {
            console.error("Ошибка при создании кривой:", error);
        }
    }, [curvePoints]);

    useImperativeHandle(ref, () => ({
        path: pathRef.current,
        points: allPoints
    }), [allPoints]);


    if (isLoading || !curvePoints || allPoints.length === 0) {
        return null;
    }

    return (
        <>
            {allPoints.length > 1 && (
                <Line
                    points={allPoints}
                    color="red"
                    lineWidth={1}
                />
            )}
        </>
    );
});


Curve.displayName = 'Curve';
