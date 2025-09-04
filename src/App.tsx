import React, { useMemo, useState, useEffect } from "react";
import { Container, Typography, Pagination, Box } from "@mui/material";
import { Product } from "./types/product";
import data from "./data/products.json";
import { useDebouncedValue } from "./hooks/useDebouncedValue";
import ToolbarBar from "./components/ToolBar";
import ProductTable from "./components/ProductTable";
import ProductCardGrid from "./components/ProductCardGrid";
import ProductFormDialog from "./components/ProductFormDialog";

const ITEMS_PER_PAGE = 8;

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(data as Product[]);
  const [view, setView] = useState<"list" | "card">("list");
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 500);
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<Product | null>(null);
  const [openAdd, setOpenAdd] = useState(false);

  // Filtered products
  const filtered = useMemo(() => {
    const q = debouncedSearch.trim().toLowerCase();
    if (!q) return products;
    return products.filter((p) => p.name.toLowerCase().includes(q));
  }, [debouncedSearch, products]);

  // Pagination
  const pageCount = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  const start = (page - 1) * ITEMS_PER_PAGE;
  const current = filtered.slice(start, start + ITEMS_PER_PAGE);

  // Save Product (Add or Update)
  const handleSave = (prod: Product) => {
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === prod.id);
      return exists
        ? prev.map((p) => (p.id === prod.id ? prod : p))
        : [prod, ...prev];
    });
    setOpenAdd(false);
    setEditing(null);
  };

  // Delete Product
  const handleDelete = (id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Reset page when search changes
  useEffect(() => setPage(1), [debouncedSearch]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Product Dashboard
      </Typography>

      {/* Toolbar For (search + toggle + add) */}
      <ToolbarBar
        search={search}
        onSearch={setSearch}
        view={view}
        onViewChange={setView}
        onAdd={() => setOpenAdd(true)}
      />

      {/* Product List/Grid */}
      <Box sx={{ mt: 2 }}>
        {view === "list" ? (
          <ProductTable
            products={current}
            onEdit={(p) => setEditing(p)}
            onDelete={handleDelete}
          />
        ) : (
          <ProductCardGrid
            products={current}
            onEdit={(p) => setEditing(p)}
            onDelete={handleDelete}
          />
        )}
      </Box>

      {/* Pagination */}
      {filtered.length > ITEMS_PER_PAGE && (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Pagination
            count={pageCount}
            page={page}
            onChange={(_, p) => setPage(p)}
          />
        </Box>
      )}

      {/* Add Dialog */}
      <ProductFormDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        onSave={handleSave}
      />

      {/* Edit Dialog */}
      <ProductFormDialog
        open={!!editing}
        onClose={() => setEditing(null)}
        onSave={handleSave}
        product={editing ?? undefined}
      />
    </Container>
  );
};

export default App;
