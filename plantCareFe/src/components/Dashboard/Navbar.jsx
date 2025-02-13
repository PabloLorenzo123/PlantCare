import { Navbar, Nav, Button } from "react-bootstrap"


const DashboardNavbar = ({ username, onLogout }) => {
    

  return (
    <Navbar bg="dark" variant="dark px-2" expand="lg">
      <Navbar.Brand href="#home">Cuidado de Plantas IA</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav>
          <Navbar.Text className="me-3">Bienvenido, {username}</Navbar.Text>
          <Button variant="outline-light" onClick={onLogout}>
            Cerrar Sesión
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default DashboardNavbar

