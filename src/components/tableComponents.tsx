import React from "react";
import { ProductParams } from "../types/types";
import styled from "styled-components";
import { Button, Table } from "react-bootstrap";

interface TableComponentsProps {
  products: ProductParams[];
  toggleBought: (productId: string) => void;
  deleteProduct: (productId: string) => void;
}

const StyledTable = styled.td<{ isBought?: boolean }>`
  text-decoration: ${(props) => (props.isBought ? "line-through" : "none")};
`;

const TableComponents: React.FC<TableComponentsProps> = ({
  products,
  toggleBought,
  deleteProduct,
}) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>PRODUCT</th>
          <th>SHOP</th>
          <th>CATEGORY</th>
          <th>STATUS</th>
          <th>ACTION</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <StyledTable isBought={product.isBought}>{product.id}</StyledTable>
            <StyledTable isBought={product.isBought}>
              {product.name}
            </StyledTable>
            <StyledTable isBought={product.isBought}>
              {product.shop}
            </StyledTable>
            <StyledTable isBought={product.isBought}>
              {product.category}
            </StyledTable>
            <StyledTable isBought={product.isBought}>
              <button className="button button-item" onClick={() => toggleBought(product.id)}>
                <span className="button-inner">
                  <span className="button-inner-static">
                    {product.isBought ? "Undo" : "Bought"}
                  </span>
                  <span className="button-inner-hover">
                    {product.isBought ? "Undo" : "Bought"}
                  </span>
                </span>
                <span className="button-bg">
                  <span className="button-bg-layers">
                    <span className="button-bg-layer button-bg-layer-1 -yellow"></span>
                    <span className="button-bg-layer button-bg-layer-2 -turquoise"></span>
                    <span className="button-bg-layer button-bg-layer-3 -purple"></span>
                  </span>
                </span>
              </button>
            </StyledTable>
            <StyledTable>
              <Button
                className="btn btn-outline-danger"
                onClick={() => deleteProduct(product.id)}
              >
                Delete
              </Button>
            </StyledTable>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableComponents;
