import { Button, Form } from "react-bootstrap";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { ProductParams } from "./types/types";
import { categories, shops } from "./data/data";
import { nanoid } from "nanoid";
import TableComponents from "./components/tableComponents";

function App() {
  const [product, setProduct] = useState<ProductParams[]>([]);
  const [name, setName] = useState<string>("");
  const [shop, setShop] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const handleAddProduct = () => {
    if (!name || !shop || !category) {
      alert("Please fill all fields");
      return;
    }

    const newProduct: ProductParams = {
      id: nanoid(),
      name,
      category,
      shop,
      isBought: false,
    };
    console.log(newProduct);
    setProduct([...product, newProduct]);
    setName("");
    setShop("");
    setCategory("");
  };
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Ürün</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="bi ürün gir"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Select
            size="md"
            value={shop}
            onChange={(e) => setShop(e.target.value)}
          >
            <option>all shops</option>
            {shops.map((shop) => (
              <option key={shop.id} value={shop.name}>
                {shop.name}
              </option>
            ))}
          </Form.Select>

          <Form.Select
            size="md"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-3"
          >
            <option>all categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </Form.Select>
          <Button className="btn btn-primary mt-3" onClick={handleAddProduct}>
            Ürün ekle
          </Button>
        </Form.Group>
      </Form>
      <TableComponents
        products={product}
        deleteProduct={() => {}}
        toggleBought={() => {}}
      />
    </>
  );
}

export default App;
