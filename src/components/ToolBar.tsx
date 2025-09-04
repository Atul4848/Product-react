import React from "react";
import { Box, Button, TextField, ToggleButton, ToggleButtonGroup } from "@mui/material";


interface Props {
search: string;
onSearch: (v: string) => void;
view: "list" | "card";
onViewChange: (v: "list" | "card") => void;
onAdd: () => void;
}


const ToolBar: React.FC<Props> = ({ search, onSearch, view, onViewChange, onAdd }) => {
return (
<Box className="bg-white" sx={{ p: 2, borderRadius: 2, boxShadow: 1, display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "1fr auto auto" } }}>
<TextField
label="Search products"
placeholder="Type a name..."
value={search}
onChange={(e) => onSearch(e.target.value)}
size="small"
/>


<ToggleButtonGroup
value={view}
exclusive
onChange={(_, v) => v && onViewChange(v)}
size="small"
>
<ToggleButton value="list">List</ToggleButton>
<ToggleButton value="card">Card</ToggleButton>
</ToggleButtonGroup>


<Button variant="contained" onClick={onAdd}>Add Product</Button>
</Box>
);
};


export default ToolBar;