
import { Container, Row, Col } from "react-bootstrap"
import DashboardNavbar from "../components/Dashboard/Navbar";
import PlantCard from "../components/Dashboard/PlantCard/PlantCard";
import WeatherAndWateringCard from "../components/Dashboard/WeatherAndWateringCard/WeatherAndWateringCard";
import PredictionCard from "../components/Dashboard/PredictionCard";

const Dashboard = () => {
  const username = "Usuario"

  const handleLogout = () => {
    console.log("Logging out...")
  }

  // Sample data for the plant card
  const plantData = {
    plantName: "Ficus Lyrata",
    plantType: "Árbol de interior",
    imageUrl: "/placeholder.svg?height=200&width=200",
    sensorData: {
      "Humedad del suelo": {
        value: 65,
        unit: "%",
        min: 0,
        max: 100,
        lowThreshold: 30,
        highThreshold: 80,
      },
      Temperatura: {
        value: 22,
        unit: "°C",
        min: 10,
        max: 40,
        lowThreshold: 18,
        highThreshold: 28,
      },
      "Nivel de luz": {
        value: 600,
        unit: "lux",
        min: 0,
        max: 1000,
        lowThreshold: 200,
        highThreshold: 800,
      },
      "Humedad del aire": {
        value: 55,
        unit: "%",
        min: 0,
        max: 100,
        lowThreshold: 40,
        highThreshold: 70,
      },
    },
  }

  return (
    <div className="min-vh-100 d-flex flex-column">
      <DashboardNavbar username={username} onLogout={handleLogout} />
      <Container className="flex-grow-1 py-4">
        <h1 className="mb-4">Panel de Control</h1>
        <Row className="mb-4">
          <Col md={6} className="mb-4 mb-md-0">
            <PlantCard {...plantData} />
          </Col>
          <Col md={6}>
            <WeatherAndWateringCard />
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            <PredictionCard />
          </Col>
        </Row>
      </Container>
      <footer className="bg-dark text-white py-3 mt-auto">
        <Container className="text-center">
          <p className="mb-0">&copy; 2025 Cuidado de Plantas IA. Todos los derechos reservados.</p>
        </Container>
      </footer>
    </div>
  )
}

export default Dashboard

