import { useState } from "react"
import { Container, Row, Col, Card, Button } from "react-bootstrap"
import AuthForm from "../components/AuthForm"

import api from "../api"
import { ACCESS_TOKEN, USER } from "../constants"
import { useNavigate } from "react-router-dom"

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate();
  const goToDashboard = navigate('/dashboard');

  const SignUp = async (name, email, password) => {
    try {
      const response = await api.post(`/auth/signup`, { name, email, password });
  
      // Extract token and user data
      const { token, user } = response.data;
  
      // Store JWT token and user info in localStorage
      localStorage.setItem(ACCESS_TOKEN, token);
      localStorage.setItem(USER, JSON.stringify(user));
      goToDashboard();
    } catch (error) {
      console.error("Signup Error:", error.response?.data?.message || error.message);
      setErrors(prev => [...prev, 'Este correo ya está registrado.']);
      return { success: false, message: error.response?.data?.message || "Error al registrarse" };
    }
  };

  const Login = async (name, email, password) => {
    try {
      const response = await api.post(`/auth/login`, { email, password });
  
      // Extract token and user data
      const { token, user } = response.data;
  
      // Store JWT token and user info in localStorage
      localStorage.setItem(ACCESS_TOKEN, token);
      localStorage.setItem(USER, JSON.stringify(user));
  
      goToDashboard();
    } catch (error) {
      console.error("Login Error:", error.response?.data?.message || error.message);
      setErrors(prev => [...prev,'Credenciales incorrectos.']);
      return { success: false, message: error.response?.data?.message || "Error al iniciar sesión" };
    }
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      <main className="flex-grow-1 bg-light py-5">
        <Container>
          <Row className="justify-content-center">
            <Col md={6}>
              <Card className="border-0 shadow-sm">
                <Card.Body>
                  <AuthForm isSignUp={isSignUp} onSubmit={isSignUp? SignUp: Login} errors={errors} setErrors={setErrors}/>
                  <div className="text-center mt-3">
                    <Button variant="link" onClick={() => setIsSignUp(!isSignUp)} className="text-dark">
                      {isSignUp ? "¿Ya tienes una cuenta? Inicia sesión" : "¿No tienes una cuenta? Regístrate"}
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </main>
      <footer className="bg-dark text-white py-4">
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

export default Auth;
