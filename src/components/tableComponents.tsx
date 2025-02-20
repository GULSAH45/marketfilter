import React from "react";
import { ProductParams } from "../types/types";
import styled from "styled-components";
import { Table } from "react-bootstrap";

interface TableComponentsProps {
  products: ProductParams[];
  toggleBought: (productId: string) => void;
  deleteProduct: (productId: string) => void;
}

const StyledTable = styled.td<{ isBought?: boolean }>`
  text-decoration: ${(props) => (props.isBought ? "line-through" : "")};
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
          <th>Ürün</th>
          <th>Shop</th>
          <th>Kategori</th>
          <th>Durum</th>
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
              {product.isBought ? "Bought" : "Not Bought"}
            </StyledTable>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableComponents;
