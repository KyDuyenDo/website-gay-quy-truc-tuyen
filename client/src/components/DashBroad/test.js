import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const chart = useSelector((state) => state.management.chart);
  const dispatch = useDispatch();
  const [dataReady, setDataReady] = useState(false);
  const [keys, setKeys] = useState([]);
  const [valuesSpend, setValuesSpend] = useState([]);
  const [valuesRaise, setValuesRaise] = useState([]);
  const [data, setData] = useState({
    keys,
    datasets: [
      {
        label: "Tiền chi",
        data: valuesSpend,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Tiền thu",
        data: valuesRaise,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  });
  useEffect(() => {
    const prepareData = async () => {
      dispatch(getChartData());
      const tempKeys = [];
      const tempValuesSpend = [];
      const tempValuesRaise = [];
      for (const key in chart.dataActivityChart) {
        tempKeys.push(key);
        tempValuesSpend.push(chart[key]);
      }
      for (const key in chart.dataDonationChart) {
        tempValuesRaise.push(chart[key]);
      }
      setKeys(tempKeys);
      setValuesSpend(tempValuesSpend);
      setValuesRaise(tempValuesRaise);
      setDataReady(true);
    };
    prepareData().then(() => {
      setData({
        keys,
        datasets: [
          {
            label: "Tiền chi",
            data: [696, 675, 70, 50, 512, 690, 87],
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
          {
            label: "Tiền thu",
            data: [580, 370, 882, 847, 673, 346, 45],
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      });
    });
    console.log(data);
  }, []);
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Biểu đồ thu chi theo tuần",
      },
    },
  };
  return <Line options={options} data={data} />;
};

export default Chart;
