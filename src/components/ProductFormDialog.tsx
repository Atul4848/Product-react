import React, { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from "@mui/material";
import { Product } from "../types/product";

export interface ProductFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  product?: Product;
}

const ProductFormDialog: React.FC<ProductFormDialogProps> = ({ open, onClose, onSave, product }) => {
  const [form, setForm] = useState<Product>(
    product ?? {
      id: Date.now(),
      name: "",
      price: 0,
      category: "",
      stock: 0,
      description: "",
      createdAt: new Date().toISOString(),
      isActive: true,
      tags: [],
    }
  );

  useEffect(() => {
    if (product) {
      setForm(product);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.price || !form.category) {
      alert("Name, Price, and Category are required.");
      return;
    }
    onSave(form);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>{product ? "Edit Product" : "Add Product"}</DialogTitle>
      <DialogContent sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
        <TextField label="Name" name="name" value={form.name} onChange={handleChange} required />
        <TextField label="Price" name="price" type="number" value={form.price} onChange={handleChange} required />
        <TextField label="Category" name="category" value={form.category} onChange={handleChange} required />
        <TextField label="Stock" name="stock" type="number" value={form.stock} onChange={handleChange} />
        <TextField label="Description" name="description" value={form.description} onChange={handleChange} multiline rows={3} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductFormDialog;
