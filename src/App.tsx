import { Button, Form } from "react-bootstrap";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Ürün</Form.Label>
          <Form.Control type="" placeholder="bi ürün gir" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Select size="md">
            <option>all shops</option>
          </Form.Select>

          <Form.Select size="md" className="mt-3">
            <option>all categories</option>
          </Form.Select>
          <Button className="btn btn-primary mt-3">Search</Button>
        </Form.Group>
      </Form>
    </>
  );
}

export default App;
