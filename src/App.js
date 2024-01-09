import axios from "axios";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import Nav from "react-bootstrap/Nav";
import { Search } from "react-bootstrap-icons";
import Card from "react-bootstrap/Card";
import { useEffect, useState } from "react";

function App() {
  const [songs, setSongs] = useState([]);
  const [search, setSearch] = useState("");
  const [isSearch, setIsSearch] = useState(false);

  useEffect(() => {
    if (search) {
      axios({
        params: { term: search },
        method: "GET",
        url: "https://itunes.apple.com/search",
        responseType: "json",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(function (response) {
        setSongs(response.data.results);
      });
    }
  }, [search]);

  const handleSearch = () => {
    setIsSearch(true);
  };

  return (
    <>
      {isSearch ? (
        <>
          <Navbar
            key={false}
            expand={false}
            className="bg-body-tertiary mb-3"
            style={{
              backgroundImage:
                "linear-gradient(to left, #b966e7 0%, #2f57ef 100%)",
            }}
          >
            <Container fluid>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand`} />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand`}
                aria-labelledby={`offcanvasNavbarLabel-expand`}
                placement="end"
              >
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title id={`offcanvasNavbarLabel-expand`}>
                    ng music
                  </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="#action1">Home</Nav.Link>
                    <Nav.Link href="#action2">Link</Nav.Link>
                  </Nav>
                  <Form className="d-flex">
                    <Form.Control
                      type="search"
                      placeholder="Search"
                      className="me-2"
                      aria-label="Search"
                    />
                    <Button variant="outline-success">Search</Button>
                  </Form>
                </Offcanvas.Body>
              </Navbar.Offcanvas>
              <Navbar.Brand style={{ color: "white" }}>ng Music</Navbar.Brand>
              <Navbar.Brand>
                <Search fill="white" onClick={() => setIsSearch(false)} />
              </Navbar.Brand>
            </Container>
          </Navbar>
          <Container>
            <Row xs={1} md={2} className="g-4">
              {songs?.map((song, idx) => (
                <Col key={idx}>
                  <Card>
                    <Row>
                      <Col align="center">
                        <img src={song.artworkUrl100} alt="" className="py-2" />
                      </Col>
                      <Col>
                        <Row>
                          <Col>{song.collectionName}</Col>
                        </Row>
                        <Row>
                          <Col>{song.trackName}</Col>
                        </Row>
                        <Row>
                          <Col>{song.primaryGenreName}</Col>
                          <Col>${song.trackPrice}</Col>
                        </Row>
                      </Col>
                    </Row>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </>
      ) : (
        <>
          <Container
            fluid
            style={{
              backgroundImage:
                "linear-gradient(to top, #b966e7 0%, #2f57ef 100%)",
              height: "100vh",
            }}
          >
            <div class="fixed-bottom mb-3 mx-5">
              <Form.Control
                type="text"
                id="search"
                placeholder="Artist / Album / Title"
                style={{ borderRadius: 30 }}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div className="d-grid gap-2 mt-2">
                <Button
                  style={{ backgroundColor: "#B966E7", borderRadius: 30 }}
                  onClick={() => handleSearch()}
                >
                  Search
                </Button>
              </div>
            </div>
          </Container>
        </>
      )}
    </>
  );
}

export default App;
