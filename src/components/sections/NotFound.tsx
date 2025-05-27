"use client";

import GradientHeading from "@/components/ui/GradientHeading";
import MainButton from "@/components/ui/MainButton";
import BracketsText from "@/components/ui/BracketsText";
import CustomContainer from "@/components/ui/CustomContainer";
import AnimatedText from "@/components/ui/AnimatedText";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center py-24 relative overflow-hidden">
      <CustomContainer>
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Left side - Text content */}
          <div className="flex-1 flex flex-col items-start justify-center">
            <BracketsText className="mb-6">404 ОШИБКА</BracketsText>

            <AnimatedText>
              <GradientHeading className="mb-6">
                Страница не найдена
              </GradientHeading>
            </AnimatedText>

            <div className="flex items-center mb-8">
              <div className="h-0.5 w-12 bg-white/20 mr-4"></div>
              <AnimatedText>
                <span className="text-white/60">
                  Кажется, вы забрели в неизведанную территорию
                </span>
              </AnimatedText>
            </div>

            <AnimatedText>
              <p className="text-white/80 text-lg mb-8 max-w-lg">
                Страница, которую вы ищете, не существует или была перемещена.
              </p>
            </AnimatedText>

            <MainButton text="Вернуться на главную" href="/" className="mt-4" />
          </div>

          {/* Right side - 404 Display */}
          <div className="flex-1 flex items-center justify-center">
            <div className="glitch-container">
              <div className="error-code">
                <span className="digit">4</span>
                <span className="digit">0</span>
                <span className="digit">4</span>
              </div>
              <div className="grid-lines"></div>
            </div>
          </div>
        </div>
      </CustomContainer>

      {/* Styling for the components */}
      <style jsx>{`
        .glitch-container {
          position: relative;
          width: 300px;
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          background: rgba(0, 10, 30, 0.2);
          backdrop-filter: blur(10px);
        }

        .error-code {
          display: flex;
          font-family: monospace;
          font-size: 120px;
          font-weight: bold;
          color: rgb(255, 255, 255);
          z-index: 10;
        }

        .digit {
          position: relative;
          animation: float 3s ease-in-out infinite;
        }

        .digit:nth-child(2) {
          animation-delay: 0.2s;
        }

        .digit:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .grid-lines {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: linear-gradient(
              to right,
              rgba(59, 167, 205, 0.1) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(59, 167, 205, 0.1) 1px,
              transparent 1px
            );
          background-size: 20px 20px;
          background-position: center center;
        }
      `}</style>
    </main>
  );
}
