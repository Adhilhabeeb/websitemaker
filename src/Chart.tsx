
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { systemdetatype } from "./eletron/poll";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

// type DataType = {
//   id: number;
//   year: number;
//   userGain: number;
//   userLost: number;
// };

// const Data: DataType[] = [
//   { id: 1, year: 2016, userGain: 80000, userLost: 823 },
//   { id: 2, year: 2017, userGain: 45677, userLost: 345 },
//   { id: 3, year: 2018, userGain: 78888, userLost: 555 },
//   { id: 4, year: 2019, userGain: 90000, userLost: 4555 },
//   { id: 5, year: 2020, userGain: 4300, userLost: 234 }
// ];

interface propstype extends systemdetatype{

}
function Chartt({data}:{
    data:propstype[]
}) {

//   console.log(data,"is data")
  const chartData = {
    labels: data.map(d => d.cpuufree),
    datasets: [
    
      {
         label: "your System perfromance",
        data: data.map(d => d.cpuusegae),
        borderColor: "rgb(25, 99, 132)",
        backgroundColor: "rgba(25, 99, 132, 0.2)",
        tension: 0.9
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
    
    }
  };

  return <Line data={chartData} options={options}  />;
}

export default Chartt;
