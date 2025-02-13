
import { useState, useEffect } from "react"
import { Card, Row, Col, Table } from "react-bootstrap"
import { Sun, Cloud, CloudRain, Droplet } from "lucide-react"

import api from "../../../api"

const WeatherAndWateringCard = () => {
  const [weather, setWeather] = useState(null)
  const [wateringHistory, setWateringHistory] = useState([])

  useEffect(() => {
    // Fetch weather data
    // In a real application, replace this with an actual API call
    const fetchWeather = async () => {
        const API_KEY = import.meta.env.VITE_WEATHER_API_KEY; // Replace with your API key
        const CITY = "Santo Domingo"; // Replace with your city
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}`;
        try {
            const response = await api.get(API_URL);
            const data = response.data;
        
            const weatherData = {
              temperature: data.current.temp_c, // Temperature in Celsius
              humidity: data.current.humidity,  // Humidity percentage
              condition: data.current.condition.text,  // Weather condition (e.g., Sunny, Cloudy)
            };
        
            setWeather(weatherData);
          } catch (error) {
            console.error("Error fetching weather:", error);
          }
    }

    // Fetch watering history
    // In a real application, replace this with an actual API call
    const fetchWateringHistory = async () => {
      // Simulating API call
      const mockWateringHistory = [
        { date: "2025-02-10", amount: "250ml" },
        { date: "2025-02-08", amount: "200ml" },
        { date: "2025-02-06", amount: "300ml" },
        { date: "2025-02-04", amount: "225ml" },
        { date: "2025-02-02", amount: "275ml" },
        { date: "2025-01-31", amount: "200ml" },
        { date: "2025-01-29", amount: "250ml" },
        { date: "2025-01-27", amount: "300ml" },
      ]
      setWateringHistory(mockWateringHistory)
    }

    fetchWeather()
    fetchWateringHistory()
  }, [])

  const getWeatherIcon = (condition) => {
    switch (condition) {
      case "sunny":
        return <Sun size={24} />
      case "cloudy":
        return <Cloud size={24} />
      case "rainy":
        return <CloudRain size={24} />
      default:
        return <Sun size={24} />
    }
  }

  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <h4 className="mb-4">Clima y Riego</h4>
        {weather && (
          <Row className="mb-4">
            <Col xs={12} className="d-flex align-items-center mb-3">
              <h5 className="mb-0 me-3">Clima Local</h5>
              {getWeatherIcon(weather.condition)}
            </Col>
            <Col xs={6}>
              <p className="mb-1">Temperatura</p>
              <h3>{weather.temperature}°C</h3>
            </Col>
            <Col xs={6}>
              <p className="mb-1">Humedad</p>
              <h3>{weather.humidity}%</h3>
            </Col>
          </Row>
        )}
        <Row>
          <Col xs={12}>
            <h5 className="mb-3">Historial de Riego</h5>
            <div className="watering-history-table-container">
              <Table striped bordered hover size="sm">
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {wateringHistory.map((watering, index) => (
                    <tr key={index}>
                      <td>{watering.date}</td>
                      <td>
                        <Droplet size={16} className="me-2" />
                        {watering.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>
        <style jsx>{`
          .watering-history-table-container {
            max-height: 140px;
            overflow-y: auto;
          }
          .watering-history-table-container table {
            margin-bottom: 0;
          }
          .watering-history-table-container thead th {
            position: sticky;
            top: 0;
            background-color: #f8f9fa;
            z-index: 1;
          }
        `}</style>
      </Card.Body>
    </Card>
  )
}

export default WeatherAndWateringCard

