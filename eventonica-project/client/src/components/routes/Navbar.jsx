import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Logo from "../../assets/BlueTechtonicaWord.png";

function MyNavBar(props) {
  return (
    <>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Container>
          <Navbar.Brand href="/">
            <img
              src={Logo}
              height="30"
              className="d-lg-inline-block"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Nav.Link>Your Link</Nav.Link>
          <Navbar.Toggle />
          {/* <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              Signed in as: <a href="#login">Cristina Rodriguez</a>
            </Navbar.Text>
          </Navbar.Collapse> */}
          <Navbar className="bg-body-tertiary justify-content-between">
      <Form inline>
        {/* <InputGroup>
          <InputGroup.Text id="basic-addon1">@</InputGroup.Text>
          <Form.Control
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </InputGroup> */}
      </Form>
      <Form inline>
        <Row>
          <Col xs="auto">
            <Form.Control
              type="text"
              placeholder="Search"
              className=" mr-sm-2"
            />
          </Col>
          <Col xs="auto">
            <Button type="submit">Submit</Button>
          </Col>
        </Row>
      </Form>
    </Navbar>
  );
          
        </Container>
      </Navbar>
    </>
  );
}

export default MyNavBar;