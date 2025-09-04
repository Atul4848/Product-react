import React from "react";
import {
Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {Product} from '../types/product'


interface Props {
products: Product[];
onEdit: (p: Product) => void;
onDelete: (id: number) => void;
}


const ProductTable: React.FC<Props> = ({ products, onEdit, onDelete }) => (
<TableContainer component={Paper} sx={{ borderRadius: 2 }}>
<Table size="small">
<TableHead>
<TableRow>
<TableCell>Name</TableCell>
<TableCell>Category</TableCell>
<TableCell align="right">Price (₹)</TableCell>
<TableCell align="right">Stock</TableCell>
<TableCell>Status</TableCell>
<TableCell align="right">Actions</TableCell>
</TableRow>
</TableHead>
<TableBody>
{products.map((p) => (
<TableRow key={p.id} hover>
<TableCell>{p.name}</TableCell>
<TableCell>{p.category}</TableCell>
<TableCell align="right">{p.price}</TableCell>
<TableCell align="right">{p.stock}</TableCell>
<TableCell>{p.isActive ? "Active" : "Inactive"}</TableCell>
<TableCell align="right">
<IconButton aria-label="edit" size="small" onClick={() => onEdit(p)}>
<EditIcon fontSize="small" />
</IconButton>
<IconButton aria-label="delete" size="small" onClick={() => onDelete(p.id)}>
<DeleteIcon fontSize="small" />
</IconButton>
</TableCell>
</TableRow>
))}
</TableBody>
</Table>
</TableContainer>
);


export default ProductTable;