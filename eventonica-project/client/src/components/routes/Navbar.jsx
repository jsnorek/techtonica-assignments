import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
// import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Logo from "../../assets/BlueTechtonicaWord.png";
import { useState } from 'react';

function MyNavBar({ searchString, setSearchString }) {

  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchString(input);
  }

  return (
    <>
      <Navbar sticky="top">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={Logo}
              height="30"
              className="d-lg-inline-block"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          {/* <Nav.Link to='/'>Events</Nav.Link> */}
          <Navbar.Toggle />
          {/* <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">Cristina Rodriguez</a>
            </Navbar.Text>
          </Navbar.Collapse> */}
          <Navbar className="bg-body-tertiary justify-content-between">
      {/* <Form inline> */}
        {/* <InputGroup>
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup> */}
      {/* </Form> */}
      <form id="search">
        <Row>
          <Col xs="auto">
            <Form.Control
              type="search"
              placeholder="Search"
              className=" mr-sm-2"
              onChange={(e) => {setInput(e.target.value);}}
            />
          </Col>
          <Col xs="auto">
            <Button onClick={(e) => setSearchString(input)}>Submit</Button>
          </Col>
        </Row>
      </form>
    </Navbar>
          
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavBar;