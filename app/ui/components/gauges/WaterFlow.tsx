import styles from './waterFlow.module.css';
import React from 'react';

export default function WaterFlow() {
  const value = 1;
  const tickCount = 6;
  const unit = `"L/M"`;

  const style = {
    '--gauge-value': value,
    '--container-size': 100,
    '--gn-distance': 13,
    '--ga-tick-count': tickCount,
    '--ga-subtick-count': tickCount * 10,
  } as React.CSSProperties;

  const numPosition = [];
  for (let index = 0; index <= tickCount; index++) {
    const angle = (270 / tickCount) * (index + 1) - (270 / tickCount + 45);
    if (angle <= 0) {
      const top = (
        Math.sin((((180 + angle) / 2) * Math.PI) / 180) *
          Math.sqrt(2 * (1 - Math.cos((-angle * Math.PI) / 180))) *
          50 +
        50
      ).toFixed(2);
      const left = (
        Math.cos((((180 + angle) / 2) * Math.PI) / 180) *
        Math.sqrt(2 * (1 - Math.cos((-angle * Math.PI) / 180))) *
        50
      ).toFixed(2);
      numPosition.push({ index, angle, top, left });
    }
    if (angle > 0 && angle <= 90) {
      const top = (
        50 -
        Math.sin((((180 - angle) / 2) * Math.PI) / 180) *
          Math.sqrt(2 * (1 - Math.cos((angle * Math.PI) / 180))) *
          50
      ).toFixed(2);
      const left = (
        Math.cos((((180 - angle) / 2) * Math.PI) / 180) *
        Math.sqrt(2 * (1 - Math.cos((angle * Math.PI) / 180))) *
        50
      ).toFixed(2);
      numPosition.push({ index, angle, top, left });
    }
    if (angle > 90 && angle < 180) {
      const top = (
        50 -
        Math.sin((((180 - angle) / 2) * Math.PI) / 180) *
          Math.sqrt(2 * (1 - Math.cos((-angle * Math.PI) / 180))) *
          50
      ).toFixed(2);
      const left = (
        Math.cos((((180 - angle) / 2) * Math.PI) / 180) *
        Math.sqrt(2 * (1 - Math.cos((-angle * Math.PI) / 180))) *
        50
      ).toFixed(2);
      numPosition.push({ index, angle, top, left });
    }
    if (angle >= 180) {
      const top = (
        100 -
        (50 -
          Math.sin((((180 - (angle - 180)) / 2) * Math.PI) / 180) *
            Math.sqrt(2 * (1 - Math.cos(((angle - 180) * Math.PI) / 180))) *
            50)
      ).toFixed(2);
      const left = (
        100 -
        Math.cos((((180 - (angle - 180)) / 2) * Math.PI) / 180) *
          Math.sqrt(2 * (1 - Math.cos(((angle - 180) * Math.PI) / 180))) *
          50
      ).toFixed(2);
      numPosition.push({ index, angle, top, left });
    }
  }

  return (
    <div className={styles.gContainer} style={style}>
      <div className={styles.gBody}>
        <div className={styles.gRing}>
          <div className={styles.gRivets}>
            <div className={styles.gRivet}></div>
            <div className={styles.gRivet}></div>
            <div className={styles.gRivet}></div>
            <div className={styles.gRivet}></div>
          </div>
          <div className={styles.gPlate}>
            <div className={styles.gTicks}>
              <div
                className={styles.gTick}
                style={{ '--ga-tick': 1 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gTick}
                style={{ '--ga-tick': 2 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gTick}
                style={{ '--ga-tick': 3 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gTick}
                style={{ '--ga-tick': 4 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gTick}
                style={{ '--ga-tick': 5 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gTick}
                style={{ '--ga-tick': 6 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gTick}
                style={{ '--ga-tick': 7 } as React.CSSProperties}
              ></div>
            </div>
            <div className={styles.gTicks}>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 2 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 3 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 4 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 5 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 6 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 7 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 8 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 9 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 10 } as React.CSSProperties}
              ></div>

              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 12 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 13 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 14 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 15 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 16 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 17 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 18 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 19 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 20 } as React.CSSProperties}
              ></div>

              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 22 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 23 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 24 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 25 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 26 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 27 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 28 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 29 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 30 } as React.CSSProperties}
              ></div>

              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 32 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 33 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 34 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 35 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 36 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 37 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 38 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 39 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 40 } as React.CSSProperties}
              ></div>

              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 42 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 43 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 44 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 45 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 46 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 47 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 48 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 49 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 50 } as React.CSSProperties}
              ></div>

              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 52 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 53 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 54 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 55 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 56 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 57 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 58 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 59 } as React.CSSProperties}
              ></div>
              <div
                className={styles.gSubTick}
                style={{ '--ga-tick': 60 } as React.CSSProperties}
              ></div>
            </div>
            <div className={styles.gNums}>
              <div
                className={styles.gNum}
                style={
                  {
                    '--ga-num-top': `${numPosition[0].top}%`,
                    '--ga-num-left': `${numPosition[0].left}%`,
                  } as React.CSSProperties
                }
              >
                0
              </div>
              <div
                className={styles.gNum}
                style={
                  {
                    '--ga-num-top': `${numPosition[1].top}%`,
                    '--ga-num-left': `${numPosition[1].left}%`,
                  } as React.CSSProperties
                }
              >
                1
              </div>
              <div
                className={styles.gNum}
                style={
                  {
                    '--ga-num-top': `${numPosition[2].top}%`,
                    '--ga-num-left': `${numPosition[2].left}%`,
                  } as React.CSSProperties
                }
              >
                2
              </div>
              <div
                className={styles.gNum}
                style={
                  {
                    '--ga-num-top': `${numPosition[3].top}%`,
                    '--ga-num-left': `${numPosition[3].left}%`,
                  } as React.CSSProperties
                }
              >
                3
              </div>
              <div
                className={styles.gNum}
                style={
                  {
                    '--ga-num-top': `${numPosition[4].top}%`,
                    '--ga-num-left': `${numPosition[4].left}%`,
                  } as React.CSSProperties
                }
              >
                4
              </div>
              <div
                className={styles.gNum}
                style={
                  {
                    '--ga-num-top': `${numPosition[5].top}%`,
                    '--ga-num-left': `${numPosition[5].left}%`,
                  } as React.CSSProperties
                }
              >
                5
              </div>
              <div
                className={styles.gNum}
                style={
                  {
                    '--ga-num-top': `${numPosition[6].top}%`,
                    '--ga-num-left': `${numPosition[6].left}%`,
                  } as React.CSSProperties
                }
              >
                6
              </div>
            </div>
            <div
              className={styles.gLabel}
              style={
                {
                  '--g-unit': unit,
                } as React.CSSProperties
              }
            >
              Water Flow
            </div>
            <div className={styles.gNeedle}></div>
            <div className={styles.gNeedleRing}></div>
            <div className={styles.gVal}>{value}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
