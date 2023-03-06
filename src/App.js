import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import { UserAuthContextProvider } from "./context/userAuthContext";
import "./App.css";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Monitor from "./components/Monitor";

function App() {
  return (
    <Container style={{ width: "100vw" }}>
      <Row>
        <Col>
          <UserAuthContextProvider>
            <Routes>
              <Route path="/home" element={<Home />} />
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/monitor" element={<Monitor />} />
            </Routes>
          </UserAuthContextProvider>
        </Col>
      </Row >
    </Container >
  );
}

export default App;
