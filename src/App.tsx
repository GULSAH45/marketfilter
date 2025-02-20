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

  // const [isBought, setIsBought] = useState<boolean>(false);

  const [filteredProductName, setFilteredProductName] = useState<string>("");
  const [filteredCategory, setFilteredCategory] = useState<string>("");
  const [filteredShop, setFilteredShop] = useState<string>("");

  const [filterStatus, setFilterStatus] = useState<
    "all" | "bought" | "notBought"
  >("all");

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

  const filteredProducts = product.filter((product) => {
    const nameMatch = product.name
      .toLowerCase()
      .includes(filteredProductName.toLowerCase());
    const categoryMatch =
      product.category === filteredCategory || filteredCategory === "";
    const shopMatch = product.shop === filteredShop || filteredShop === "";

    const statusMatch =
      filterStatus === "all" ||
      (filterStatus === "bought" && product.isBought) ||
      (filterStatus === "notBought" && !product.isBought);
    return nameMatch && categoryMatch && shopMatch && statusMatch;
  });
  console.log(filteredProducts);

  const toggleBought = (productId: string) => {
    const updatedProducts = product.map((item) => {
      return item.id === productId
        ? { ...item, isBought: !item.isBought }
        : item;
    });
    setProduct(updatedProducts);
  };

  const deleteProduct = (productId: string) => {
    const updatedProducts = product.filter((item) => item.id !== productId);
    setProduct(updatedProducts);
  };

  return (
    <>
      <div className="main-container">
        <div className="forms-container">
          <div className="container">
            <Form>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label className="fw-bold">Product Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Product Name"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Select
                  size="sm"
                  value={shop}
                  onChange={(e) => setShop(e.target.value)}
                >
                  <option>All Shops</option>
                  {shops.map((shop) => (
                    <option key={shop.id} value={shop.name}>
                      {shop.name}
                    </option>
                  ))}
                </Form.Select>

                <Form.Select
                  size="sm"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="mt-3"
                >
                  <option>All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
                <Button className="btn btn-danger mt-3" onClick={handleAddProduct}>
                  ADD
                </Button>
              </Form.Group>
            </Form>
          </div>

          <div className="container">
            <Form>
              <Form.Group className="mb-3" controlId="filteredProductName">
                <Form.Label className="fw-bold">Filter By Product Name</Form.Label>
                <Form.Control
                  type="text"
                  value={filteredProductName}
                  onChange={(e) => setFilteredProductName(e.target.value)}
                  placeholder="Select A Product"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="FilteredShopandCategory">
                <Form.Select
                  size="sm"
                  value={filteredShop}
                  onChange={(e) => setFilteredShop(e.target.value)}
                >
                  <option value={""}>Filter By Shop</option>
                  {shops.map((shop) => (
                    <option key={shop.id} value={shop.name}>
                      {shop.name}
                    </option>
                  ))}
                </Form.Select>

                <Form.Select
                  size="sm"
                  value={filteredCategory}
                  onChange={(e) => setFilteredCategory(e.target.value)}
                  className="mt-3"
                >
                  <option value={""}>Filter By Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group>
                <Form.Check
                  type="radio"
                  aria-label="radio 1"
                  name="status"
                  label="All"
                  value="all"
                  checked={filterStatus === "all"}
                  onChange={(e) =>
                    setFilterStatus(
                      e.target.value as "all" | "bought" | "notBought"
                    )
                  }
                />
                <Form.Check
                  type="radio"
                  aria-label="radio 1"
                  name="status"
                  label="Bought"
                  value="bought"
                  checked={filterStatus === "bought"}
                  onChange={(e) =>
                    setFilterStatus(
                      e.target.value as "all" | "bought" | "notBought"
                    )
                  }
                />
                <Form.Check
                  type="radio"
                  aria-label="radio 1"
                  name="status"
                  label="Not Bought"
                  value="notBought"
                  checked={filterStatus === "notBought"}
                  onChange={(e) =>
                    setFilterStatus(
                      e.target.value as "all" | "bought" | "notBought"
                    )
                  }
                />
              </Form.Group>
            </Form>
          </div>
        </div>

        <div className="table-container">
          <TableComponents
            products={filteredProducts}
            deleteProduct={deleteProduct}
            toggleBought={toggleBought}
          />
        </div>
      </div>
    </>
  );
}

export default App;
