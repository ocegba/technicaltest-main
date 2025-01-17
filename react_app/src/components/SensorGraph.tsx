import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js/auto";

import "chartjs-adapter-date-fns";

// Register the necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

interface SensorGraphProps {
  data: Array<{
    time: string;
    field: string;
    value: number;
  }>;
}

const SensorGraph: React.FC<SensorGraphProps> = ({ data }) => {
  const fields = Array.from(new Set(data.map((d) => d.field)));

  const datasets = fields.map((field) => {
    const filteredData = data.filter((d) => d.field === field);
    return {
      label: field,
      data: filteredData.map((d) => ({ x: d.time, y: d.value })),
      borderColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
      fill: false,
    };
  });

  const chartData = {
    datasets,
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: "Sensor Data" },
    },
    scales: {
      x: { type: "time" as const, title: { display: true, text: "Time" } },
      y: { title: { display: true, text: "Value" } },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default SensorGraph;