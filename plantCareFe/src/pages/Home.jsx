import {Link} from 'react-router-dom';
import { Navbar, Nav, Container, Row, Col, Button, Card } from "react-bootstrap"
import { Droplet, TreesIcon as Plant, Bell, Brain } from "lucide-react"

export default function Home() {
  return (
    <div className="d-flex flex-column">
      <Navbar bg="dark" variant="dark" expand="lg" className="position-absolute w-100" style={{ zIndex: 1000 }}>
        <Container>
          <Navbar.Brand href="#home">Cuidado de Plantas IA</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="#home">Inicio</Nav.Link>
              <Nav.Link href="#features">Características</Nav.Link>
              <Nav.Link href="#contact">Contacto</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <section className="vh-100 d-flex align-items-center bg-black text-white" id="home">
        <Container>
          <Row className="align-items-center">
            <Col md={12} className="text-center">
              <h1 className="display-2 mb-4 fw-bold">Sistema de Riego con Inteligencia Artificial</h1>
              <p className="lead mb-5 fs-4">
                Revoluciona el cuidado de tus plantas con nuestro sistema de riego inteligente. Utilizando IA y sensores
                Arduino, predecimos cuándo tus plantas necesitan agua y te alertamos en tiempo real.
              </p>
              
              <Link to={"/auth"}>
                <Button variant="outline-light" size="lg" className="px-5 py-3 fs-5">
                  Comenzar
                </Button>
              </Link>


            </Col>
          </Row>
        </Container>
      </section>

      <Container>
        <Row className="my-5 py-5" id="features">
          <Col xs={12}>
            <h2 className="text-center mb-5 display-4">Características Principales</h2>
          </Col>
          <Col md={3}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="d-flex flex-column align-items-center">
                <Plant className="mb-4" size={48} />
                <Card.Title className="fs-4 mb-3">Monitoreo en Tiempo Real</Card.Title>
                <Card.Text className="text-center">
                  Monitorea continuamente las estadísticas vitales de tu planta con sensores Arduino.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="d-flex flex-column align-items-center">
                <Brain className="mb-4" size={48} />
                <Card.Title className="fs-4 mb-3">Predicciones con IA</Card.Title>
                <Card.Text className="text-center">
                  Nuestra IA analiza los datos de los sensores para predecir las necesidades de riego de tu planta.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="d-flex flex-column align-items-center">
                <Bell className="mb-4" size={48} />
                <Card.Title className="fs-4 mb-3">Alertas Inteligentes</Card.Title>
                <Card.Text className="text-center">
                  Recibe notificaciones oportunas cuando tu planta necesite atención.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3}>
            <Card className="h-100 border-0 shadow-sm">
              <Card.Body className="d-flex flex-column align-items-center">
                <Droplet className="mb-4" size={48} />
                <Card.Title className="fs-4 mb-3">Riego Eficiente</Card.Title>
                <Card.Text className="text-center">
                  Optimiza el uso del agua con nuestras recomendaciones inteligentes de riego.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="my-5 py-5 bg-light rounded" id="contact">
          <Col md={8} className="mx-auto text-center">
            <h2 className="mb-4 display-4">¿Listo para Transformar el Cuidado de tus Plantas?</h2>
            <p className="lead mb-5 fs-4">
              Únete al futuro de la jardinería inteligente. Regístrate ahora para ser notificado cuando nuestro sistema
              de riego con IA esté disponible.
            </p>

            <Link to={"/auth"}>
              <Button variant="dark" size="lg" className="px-5 py-3 fs-5">
                Registrarse para Actualizaciones
              </Button>
            </Link>
            


          </Col>
        </Row>
      </Container>

      <footer className="bg-dark text-white py-4 mt-5">
        <Container>
          <Row>
            <Col className="text-center">
              <p className="mb-0">&copy; 2025 Cuidado de Plantas IA. Todos los derechos reservados.</p>
            </Col>
          </Row>
        </Container>
      </footer>
    </div>
  )
}

