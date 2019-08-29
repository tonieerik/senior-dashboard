import React from "react";

function getAngleCoords(x0, y0, angleDeg, radius, xProp = "x2", yProp = "y2") {
  const angleRad = ((angleDeg - 90) / 360) * Math.PI * 2;
  return {
    [xProp]: x0 + Math.cos(angleRad) * radius,
    [yProp]: y0 + Math.sin(angleRad) * radius
  };
}

function AnalogClock({
  now,
  width,
  height,
  showSeconds,
  showTicks,
  handColor = "#fbc531",
  faceColor = "#e5e5e5"
}) {
  const minQ = now.getMinutes() / 60;
  const hourAngle = (now.getHours() / 12) * 360 + minQ * (360 / 12);
  const minAngle = minQ * 360;
  const secAngle = (now.getSeconds() / 60) * 360;
  const ticks = [];
  if (showTicks) {
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * 360;
      const c0 = getAngleCoords(100, 100, angle, 80, "x1", "y1");
      const c1 = getAngleCoords(100, 100, angle, 90, "x2", "y2");
      ticks.push(
        <line
          {...c0}
          {...c1}
          stroke={faceColor}
          key={i}
          strokeLinecap="round"
        />
      );
    }
  }
  return (
    <svg width={width} height={height} viewBox="0 0 200 200">
      {showSeconds && (
        <line
          x1={100}
          y1={100}
          {...getAngleCoords(100, 100, secAngle, 70)}
          strokeWidth={1}
          stroke={handColor}
          strokeLinecap="round"
          opacity={0.5}
        />
      )}
      <line
        x1={100}
        y1={100}
        {...getAngleCoords(100, 100, minAngle, 70)}
        strokeWidth={4}
        stroke={handColor}
        opacity={0.9}
        strokeLinecap="round"
      />
      <line
        x1={100}
        y1={100}
        {...getAngleCoords(100, 100, hourAngle, 50)}
        strokeWidth={8}
        stroke={handColor}
        strokeLinecap="round"
      />
      {ticks}
      <circle
        cx={100}
        cy={100}
        r={90}
        fill="none"
        strokeWidth={5}
        stroke={faceColor}
      />
    </svg>
  );
}
export default AnalogClock;
