import { useEffect, useState } from 'react';

export function TimeTravelEffect() {
  const [particles, setParticles] = useState<Array<{ 
    id: number; 
    x: number; 
    y: number; 
    delay: number;
    endX: number;
    endY: number;
  }>>([]);

  useEffect(() => {
    // Generate random particles for the effect with fixed end positions
    const newParticles = Array.from({ length: 150 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 150;
      const distance = 300 + Math.random() * 200;
      return {
        id: i,
        x: 50,
        y: 50,
        delay: Math.random() * 2,
        endX: Math.cos(angle) * distance,
        endY: Math.sin(angle) * distance,
      };
    });
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Tunnel effect with concentric circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full border-2 border-sci-fi-cyan/30"
            style={{
              width: `${(i + 1) * 5}%`,
              height: `${(i + 1) * 5}%`,
              animation: `tunnel ${2 + i * 0.1}s linear infinite`,
              animationDelay: `${i * 0.1}s`,
            }}
          />
        ))}
      </div>

      {/* Streaking stars/particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-sci-fi-cyan rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animation: `streak-${particle.id} 2s linear infinite`,
            animationDelay: `${particle.delay}s`,
            boxShadow: `0 0 10px 2px rgba(0, 255, 255, 0.8)`,
          }}
        />
      ))}

      {/* Central light burst */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="w-64 h-64 bg-sci-fi-cyan rounded-full opacity-20 blur-3xl"
          style={{
            animation: 'pulse 1s ease-in-out infinite',
          }}
        />
      </div>

      {/* Radial lines effect */}
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: `rotate(${i * 30}deg)`,
          }}
        >
          <div
            className="w-1 h-full bg-gradient-to-b from-transparent via-sci-fi-cyan to-transparent opacity-30"
            style={{
              animation: 'radialLine 1.5s ease-in-out infinite',
              animationDelay: `${i * 0.1}s`,
            }}
          />
        </div>
      ))}

      {/* Color overlay transitions */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-sci-fi-blue/20 via-sci-fi-cyan/30 to-sci-fi-blue/20"
        style={{
          animation: 'colorShift 2s ease-in-out infinite',
        }}
      />

      {/* Time warp lines */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={`line-${i}`}
          className="absolute w-full h-1 bg-gradient-to-r from-transparent via-sci-fi-cyan/50 to-transparent"
          style={{
            top: `${(i * 100) / 30}%`,
            animation: 'warpLine 3s linear infinite',
            animationDelay: `${i * 0.1}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes tunnel {
          0% {
            transform: scale(0.5);
            opacity: 0.8;
          }
          50% {
            transform: scale(1);
            opacity: 0.4;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            opacity: 0.2;
          }
          50% {
            transform: scale(1.5);
            opacity: 0.4;
          }
        }

        @keyframes radialLine {
          0%, 100% {
            opacity: 0.1;
            transform: scaleY(0.5);
          }
          50% {
            opacity: 0.5;
            transform: scaleY(1);
          }
        }

        @keyframes colorShift {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }

        @keyframes warpLine {
          0% {
            transform: translateX(-100%);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(100%);
            opacity: 0;
          }
        }

        ${particles.map((particle) => `
          @keyframes streak-${particle.id} {
            0% {
              transform: translate(0, 0) scale(1);
              opacity: 1;
            }
            50% {
              transform: translate(${particle.endX * 0.5}px, ${particle.endY * 0.5}px) scale(2);
              opacity: 0.8;
            }
            100% {
              transform: translate(${particle.endX}px, ${particle.endY}px) scale(0.5);
              opacity: 0;
            }
          }
        `).join('')}
      `}</style>
    </div>
  );
}

