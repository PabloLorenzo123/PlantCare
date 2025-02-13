
import { useState, useEffect } from "react"
import { Card, Row, Col, ProgressBar } from "react-bootstrap"
import { Droplet, Clock } from "lucide-react"

const AIIrrigationPredictionCard = () => {
  const [nextIrrigation, setNextIrrigation] = useState(null)
  const [confidence, setConfidence] = useState(0)

  useEffect(() => {
    // Simulate AI prediction
    const predictNextIrrigation = () => {
      // In a real application, this would be an API call to your AI model
      const mockPrediction = {
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // 2 days from now
        amount: "250ml",
        confidence: 85,
      }
      setNextIrrigation(mockPrediction)
      setConfidence(mockPrediction.confidence)
    }

    predictNextIrrigation()
  }, [])

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h4 className="mb-4">Predicción de Riego con IA</h4>
        {nextIrrigation ? (
          <Row>
            <Col md={6}>
              <div className="d-flex align-items-center mb-3">
                <Clock size={24} className="me-2" />
                <h5 className="mb-0">Próximo Riego</h5>
              </div>
              <p className="mb-1">Fecha y Hora:</p>
              <h3>{nextIrrigation.date.toLocaleString()}</h3>
              <p className="mb-1 mt-3">Cantidad Recomendada:</p>
              <h3>
                <Droplet size={24} className="me-2" />
                {nextIrrigation.amount}
              </h3>
            </Col>
            <Col md={6}>
              <div className="d-flex align-items-center mb-3">
                <h5 className="mb-0">Confianza de la Predicción</h5>
              </div>
              <ProgressBar
                now={confidence}
                label={`${confidence}%`}
                variant={confidence > 80 ? "success" : confidence > 60 ? "warning" : "danger"}
                className="mb-3"
                style={{ height: "2rem", fontSize: "1rem" }}
              />
              <p className="text-muted">
                Basado en datos históricos, condiciones actuales y previsiones meteorológicas.
              </p>
            </Col>
          </Row>
        ) : (
          <p>Cargando predicción...</p>
        )}
      </Card.Body>
    </Card>
  )
}

export default AIIrrigationPredictionCard

