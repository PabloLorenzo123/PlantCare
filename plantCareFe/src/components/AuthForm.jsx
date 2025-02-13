
import { useState } from "react"
import { Form, Button, Alert } from "react-bootstrap"


const AuthForm = ({ isSignUp, onSubmit, errors, setErrors }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
 

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors([])

    if (isSignUp && !name) {
      setErrors((prev) => [...prev, "El nombre es requerido"])
    }
    if (!email) {
      setErrors((prev) => [...prev, "El correo electrónico es requerido"])
    }
    if (!password) {
      setErrors((prev) => [...prev, "La contraseña es requerida"])
    }

    if (errors.length === 0) {
      try {
        await onSubmit(name, email, password)
      } catch (error) {
        setErrors([error.message])
      }
    }
  }

  return (
    <Form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
      <h2 className="text-center mb-4">{isSignUp ? "Registrarse" : "Iniciar Sesión"}</h2>

      {isSignUp && (
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese su nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
      )}

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Correo Electrónico</Form.Label>
        <Form.Control
          type="email"
          placeholder="Ingrese su correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Contraseña</Form.Label>
        <Form.Control
          type="password"
          placeholder="Ingrese su contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Group>

      {errors.length > 0 && (
        <Alert variant="danger">
          <ul className="mb-0">
            {errors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </Alert>
      )}

      <Button variant="dark" type="submit" className="w-100">
        {isSignUp ? "Registrarse" : "Iniciar Sesión"}
      </Button>
    </Form>
  )
}

export default AuthForm

