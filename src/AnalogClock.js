import React from "react";

const getAngleCoords = (x0, y0, angleDeg, radius, xProp = "x2", yProp = "y2") => {
  const angleRad = ((angleDeg - 90) / 360) * Math.PI * 2;
  return {
    [xProp]: x0 + Math.cos(angleRad) * radius,
    [yProp]: y0 + Math.sin(angleRad) * radius
  };
}

const AnalogClock = ({
  now,
  width,
  height,
  showSeconds,
  showTicks,
  handColorSecond = "#ff2222",
  handColorMinute = "#dba511",
  handColorHour = "#cb4521",
  faceColor = "#333333"
}) => {
  const minQ = now.getMinutes() / 60;
  const hourAngle = (now.getHours() / 12) * 360 + minQ * (360 / 12);
  const minAngle = minQ * 360;
  const secAngle = (now.getSeconds() / 60) * 360;
  const ticks = [];

  if (showTicks) {
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * 360;
      const c1 = getAngleCoords(100, 100, angle, 76, "x2", "y2");

      ticks.push(
        <text
          className="clockHourLabel"
          key={i}
          x={c1.x2-5}
          y={c1.y2}
          alignmentBaseline="middle"
          fill={faceColor}>
          {i === 0 ? 12 : i}
        </text>
      );
    }
  }

  return (
    <svg width={width} height={height} viewBox="0 0 200 200">
      <line
        x1={100}
        y1={100}
        {...getAngleCoords(100, 100, hourAngle, 40)}
        strokeWidth={10}
        stroke={handColorHour}
        strokeLinecap="round"
      />
      <line
        x1={100}
        y1={100}
        {...getAngleCoords(100, 100, minAngle, 60)}
        strokeWidth={4}
        stroke={handColorMinute}
        opacity={0.9}
        strokeLinecap="round"
      />
      {showSeconds && (
        <line
          x1={100}
          y1={100}
          {...getAngleCoords(100, 100, secAngle, 70)}
          strokeWidth={1}
          stroke={handColorSecond}
          strokeLinecap="round"
          opacity={0.5}
        />
      )}
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
