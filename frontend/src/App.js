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

const API_URI = './api'

const App = () => {
  const [records, setRecords] = useState([])
  const tableStyle = { border: '1px solid black', borderCollapse: 'collapse' }
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
        fill: false,
        borderColor: 'rgb(9, 181, 228)',
        backgroundColor: 'rgb(9, 181, 228)',
        yAxisID: 'y'
      },
      {
        label: 'Humidity',
        data: records.map(record => record.humidity),
        fill: true,
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
  console.log(data)
  return (
    <>
      <h1>
        Weather records from Helsinki
      </h1>
      <>
        From {records[records.length - 1].timestamp.replace('T', ' ')} to {records[0].timestamp.replace('T', ' ')}
      </>
      <>
        <Line options={options} data={data} />
      </>
    </>
  )
}

export default App