import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from "react-chartjs-2"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const API_URI =
  (process.env.REACT_APP_MODE === 'dev')
    ? 'https://weather.cmd-mish.dev/api'
    : './api'

const App = () => {
  const [records, setRecords] = useState([])

  useEffect(() => {
    axios
      .get(API_URI)
      .then(response => {
        setRecords(response.data.reverse())
      })
  }, [])

  if (records.length === 0) return <>loading...</>

  const data = {
    labels: records.map(record => record.timestamp.replace('T', ' ')),
    datasets: [
      {
        label: 'Temperature',
        data: records.map(record => record.temperature),
        borderColor: 'rgb(9, 181, 228)',
        backgroundColor: 'rgb(9, 181, 228)',
        yAxisID: 'y'
      },
      {
        label: 'Humidity',
        data: records.map(record => record.humidity),
        borderColor: 'rgb(231, 231, 231)',
        backgroundColor: 'rgb(231, 231, 231)',
        yAxisID: 'y1'
      },
    ]
  }

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  }
  return (
    <>
      <h1>
        Weather records in Helsinki
      </h1>
      <>
        <Line options={options} data={data} />
      </>
    </>
  )
}

export default App