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
  Filler
} from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

const API_URI =
  (process.env.REACT_APP_MODE === 'dev')
    ? 'https://weather.cmd-mish.dev/api'
    : './api'

const App = () => {
  const [records, setRecords] = useState([])
  const [currentRecords, setCurrentRecords] = useState([])

  const convertTimestamp = (timestamp) => {
    const dateObject = new Date(timestamp.replace('T', ' ').concat(' UTC'))
    return dateObject.toLocaleString('fi-FI', { timeZone: 'Europe/Helsinki' })
  }

  const changeCurrentRecords = (event) => {
    const sliceValue = event.target.value
    if (sliceValue === '100') {
      setCurrentRecords(records)
    } else {
      setCurrentRecords(records.slice(-Number(sliceValue)))
    }
  }

  useEffect(() => {
    axios
      .get(API_URI)
      .then(response => {
        const reversedRecords = response.data.reverse()
        setRecords(reversedRecords)
        setCurrentRecords(reversedRecords)
      })
  }, [])

  if (records.length === 0) return <>loading...</>

  const data = {
    labels: currentRecords.map(record => convertTimestamp(record.timestamp)),
    datasets: [
      {
        label: 'Temperature',
        data: currentRecords.map(record => record.temperature),
        borderColor: 'rgb(9, 181, 228)',
        backgroundColor: 'rgb(188, 242, 250)',
        yAxisID: 'y'
      },
      {
        label: 'Humidity',
        data: currentRecords.map(record => record.humidity),
        borderColor: 'rgb(231, 231, 231)',
        backgroundColor: 'rgb(253, 253, 253)',
        fill: true,
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
        }
      }
    }
  }
  return (
    <>
      <h1>
        Weather records in Helsinki
      </h1>
      <>
        Display last&nbsp;
        <button onClick={changeCurrentRecords} value='10'>10</button>&nbsp;
        <button onClick={changeCurrentRecords} value='20'>20</button>&nbsp;
        <button onClick={changeCurrentRecords} value='50'>50</button>&nbsp;
        <button onClick={changeCurrentRecords} value='100'>100</button>&nbsp;
        records.
      </>
      <>
        <Line options={options} data={data} />
      </>
    </>
  )
}

export default App