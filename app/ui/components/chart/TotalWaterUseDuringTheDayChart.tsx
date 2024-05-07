'use client';

import React from 'react';
import { ResponsiveLine, PointTooltipProps } from '@nivo/line';
export default function TotalWaterUseDuringTheDayChart() {
  const theme = {
    grid: {
      line: {
        stroke: '#2ecdf5',
      },
    },
    axis: {
      domain: {
        line: {
          strokeWidth: 2,
          stroke: '#2ecdf5',
        },
      },
      ticks: {
        line: {
          strokeWidth: 1,
          stroke: '#2ecdf5',
        },
        text: {
          fill: '#2ecdf5',
          fontSize: 12,
          fontWeight: 700,
        },
      },
      legend: {
        text: {
          fill: '#2ecdf5',
          fontSize: 13,
          fontWeight: 400,
        },
      },
    },
  };
  const commonProperties = {
    color: 'paired',
    enableArea: true,
    enableGridX: false,
    enableGridY: false,
    areaOpacity: 0.5,
    animate: true,
    motionStiffness: 90,
    motionDamping: 15,
    isInteractiver: true,
    enableCrosshair: false,
    useMesh: true,
    height: 200,
    margin: {
      top: 10,
      left: 10,
      right: 10,
      bottom: 50,
    },
    // Your common properties here
  };

  const CustomTooltip = ({ point }: PointTooltipProps) => {
    return (
      <div
        className={`w-[100px] rounded-lg bg-[#b69375] p-[5px] text-center text-[12px] text-slate-950 ${
          Number(point.data.xFormatted) < 3
            ? 'ml-[80px]'
            : Number(point.data.xFormatted) > 21
            ? 'mr-[80px]'
            : null
        }`}
      >
        <p>
          At intervals from{' '}
          <strong className="text-[#5DEBD7]">
            {Number(point.data.xFormatted) - 1}
          </strong>{' '}
          to <strong className="text-[#5DEBD7]">{point.data.xFormatted}</strong>{' '}
          o'clock used{' '}
          <strong className="text-[#5DEBD7]">{point.data.yFormatted} </strong>
          liters of water
        </p>
      </div>
    );
  };
  return (
    <ResponsiveLine
      {...commonProperties}
      theme={theme}
      curve="monotoneX"
      data={[
        {
          id: 'fake corp. A',
          data: [
            { x: 1, y: 0 },
            { x: 2, y: 0 },
            { x: 3, y: 0 },
            { x: 4, y: 0 },
            { x: 5, y: 1 },
            { x: 6, y: 3 },
            { x: 7, y: 2 },
            { x: 8, y: 4 },
            { x: 9, y: 0 },
            { x: 10, y: 0 },
            { x: 11, y: 0 },
            { x: 12, y: 4 },
            { x: 13, y: 7 },
            { x: 14, y: 0 },
            { x: 15, y: 0 },
            { x: 16, y: 0 },
            { x: 17, y: 3 },
            { x: 18, y: 5 },
            { x: 19, y: 2 },
            { x: 20, y: 1 },
            { x: 21, y: 2 },
            // { x: 22, y: 0 },
            // { x: 23, y: 0 },
            // { x: 24, y: 0 },
          ],
        },
      ]}
      tooltip={CustomTooltip}
      onClick={(point, event) => {
        console.log(point);
      }}
      xScale={{
        type: 'linear',
        min: 1,
        max: 24,
      }}
      yScale={{
        type: 'linear',
        min: 0,
        max: 'auto',
      }}
      axisLeft={null}
      axisBottom={{
        tickSize: 0,
        tickPadding: 10,
        legendPosition: 'end',
        legend: 'Period of day (h)',
        legendOffset: 40,
      }}
    />
  );
}
