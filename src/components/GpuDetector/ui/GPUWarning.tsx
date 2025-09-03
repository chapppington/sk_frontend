"use client"
import { useGPUContext } from "@/context/GpuDetectProvider";
export const WebGLWarning: React.FC = () => {
  const context = useGPUContext();

  if (!context.webglSupport) return null;
  console.log(context);

  if (context.webglSupport.isLoading) {
    return (
      <div className="fixed inset-0 bg-gray-900 text-white z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-lg">Проверка поддержки WebGL...</p>
        </div>
      </div>
    );
  }

  if (!context.webglSupport.isSupported) {
    return (
      <div className="fixed inset-0 bg-red-600 text-white z-50 flex items-center justify-center p-8">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">⚠️ WebGL не поддерживается</h1>
          <p className="text-xl mb-4">
            Ваш браузер не поддерживает WebGL, необходимый для отображения 3D сцены.
          </p>
          <p className="text-lg mb-6">
            Пожалуйста, обновите браузер или включите аппаратное ускорение.
          </p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-white text-red-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Обновить страницу
          </button>
        </div>
      </div>
    );
  }

  if (!context.webglSupport.isHardwareAccelerated) {
    return (
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-transparent backdrop-blur-md text-white z-50 p-8 rounded-lg shadow-xl w-auto min-w-[300px]">
        <div className="text-center max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">⚠️ Графическое ускорение отключено</h1>
          <p className="text-xl mb-4">
            Визуальное наполнение сайта упрощено.
          </p>
          <div className="bg-gray-400 p-4 rounded-lg mb-6 text-left">
            <p className="text-sm mb-2"><strong>Рендерер:</strong> {context.webglSupport.renderer}</p>
            <p className="text-sm mb-2"><strong>Производитель:</strong> {context.webglSupport.vendor}</p>
            <p className="text-sm"><strong>Версия WebGL:</strong> {context.webglSupport.webglVersion}</p>
          </div>
          <div className="space-x-4">
            <button 
              onClick={() => window.location.reload()} 
              className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
            >
              Продолжить
            </button>
            <button 
              onClick={() => window.history.back()} 
              className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors"
            >
              Как включить? 
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return null;
};