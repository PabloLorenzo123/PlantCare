import { Card, Row, Col } from "react-bootstrap"
import { ARDUINO_SENSORS } from "../../../constants"

import SensorRangeIndicator from "./SensorRangeIndicator"

const PlantCard = ({ plantName, plantType, imageUrl, sensorData }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Body>
        <Row>
          <Col md={4}>
            <img
              src={imageUrl || "/placeholder.svg"}
              alt={plantName}
              className="img-fluid rounded mb-3 mb-md-0"
              style={{ objectFit: "cover", height: "200px", width: "100%" }}
            />
            <h3 className="mb-3">{plantName}</h3>
            <p className="text-muted mb-3">Tipo: {plantType}</p>
            
          </Col>
          <Col md={8}>
            
            <h5 className="mb-3 text-align-center">Sensores</h5>
            <ul className="list-unstyled">

              {ARDUINO_SENSORS.map((sensor, idx) => (
                <div key={idx} className="mb-3">
                {sensor}
               
                  <SensorRangeIndicator
                    value={100}
                    min={0}
                    max={450}
                    lowThreshold={200}
                    highThreshold={300}
                  />
              </div>
              ))}

            </ul>
          </Col>
        </Row>
       
      </Card.Body>
    </Card>
  )
}

export default PlantCard

