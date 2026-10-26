import React from 'react';

export default function DualRangeSlider({
  min,
  max,
  step = 1,
  valueMin,
  valueMax,
  onChangeMin,
  onChangeMax,
  variant = 'light',
  ariaLabelPrefix = 'Range',
}) {
  const rangeSpan = Math.max(max - min, 1);
  const leftPct = ((valueMin - min) / rangeSpan) * 100;
  const rightPct = 100 - ((valueMax - min) / rangeSpan) * 100;

  return (
    <div className={`dual-slider ${variant === 'dark' ? 'dual-slider--dark' : ''}`}>
      <div className="dual-slider-track">
        <div
          className="dual-slider-range"
          style={{
            left: `${Math.max(0, leftPct)}%`,
            right: `${Math.max(0, rightPct)}%`,
          }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={valueMin}
        aria-label={`${ariaLabelPrefix} minimum`}
        onChange={(e) => {
          const next = Math.min(Number(e.target.value), valueMax - step);
          onChangeMin(next);
        }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={valueMax}
        aria-label={`${ariaLabelPrefix} maximum`}
        onChange={(e) => {
          const next = Math.max(Number(e.target.value), valueMin + step);
          onChangeMax(next);
        }}
      />
    </div>
  );
}
