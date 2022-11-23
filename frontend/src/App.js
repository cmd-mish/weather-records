import { useState, useEffect } from 'react'
import axios from 'axios'
const API_URI = 'https://w12vjxqf56.execute-api.eu-north-1.amazonaws.com/dev'

const App = () => {
  const [records, setRecords] = useState([])
  const tableStyle = { border: '1px solid black', borderCollapse: 'collapse' }
  useEffect(() => {
    axios
      .get(API_URI)
      .then(response => {
        setRecords(response.data)
      })
  }, [])

  if (records.length === 0) return <>loading...</>
  return (
    <>
      <h1>
        Weather records from Helsinki
      </h1>
      <>
        From {records[records.length - 1].timestamp.replace('T', ' ')} to {records[0].timestamp.replace('T', ' ')}
      </>
      <>
        <table style={tableStyle}>
          <thead>
            <tr style={tableStyle}>
              <td>
                Timestamp
              </td>
              <td>
                Humidity
              </td>
              <td>
                Temperature
              </td>
            </tr>
          </thead>
          <tbody>
            {records.map(record => {
              return (
                <tr style={tableStyle} key={record.timestamp}>
                  <td style={tableStyle}>
                    {record.timestamp.replace('T', ' ')}
                  </td>
                  <td style={tableStyle}>
                    {record.humidity}
                  </td>
                  <td style={tableStyle}>
                    {record.temperature}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
    </>
  )
}

export default App