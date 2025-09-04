import React from "react";
import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { Product } from "../types/product";

export interface ProductCardGridProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductCardGrid: React.FC<ProductCardGridProps> = ({ products, onEdit, onDelete }) => {
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
        gap: 2,
      }}
    >
      {products.map((p) => (
        <Card key={p.id} sx={{ p: 2 }}>
          <CardContent>
            <Typography variant="h6">{p.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {p.category} • ₹{p.price}
            </Typography>
            <Typography variant="body2">{p.description}</Typography>

            <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
              <IconButton color="primary" onClick={() => onEdit(p)}>
                <Edit />
              </IconButton>
              <IconButton color="error" onClick={() => onDelete(p.id)}>
                <Delete />
              </IconButton>
            </Box>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ProductCardGrid;
