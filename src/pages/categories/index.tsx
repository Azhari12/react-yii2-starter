import { useState, useEffect } from "react";
import { useCategoriesQuery, useCreateCategoryMutation, useUpdateCategoryMutation, useDeleteCategoryMutation } from "@/hooks/useCategory.query";
import { CategoryType } from "@/utilities/types/RbacType";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import DialogAlert from "@/components/dialogs/DialogAlert";
import { Badge } from "@/components/ui/badge";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";

const CategoriesPage = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);
  const [searchInput, setSearchInput] = useState("");
  const [search] = useDebounce(searchInput, 500);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [mode, setMode] = useState<"create" | "update">("create");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const { data, refetch } = useCategoriesQuery({ page, pageSize, name: search });
  const { mutate: createMutate, isPending: isCreating } = useCreateCategoryMutation();
  const { mutate: updateMutate, isPending: isUpdating } = useUpdateCategoryMutation();
  const { mutate: deleteMutate, isPending: isDeleting } = useDeleteCategoryMutation();

  const categories = (data?.data || []) as CategoryType[];
  const totalPages = data?.totalPages || 1;

  const handleSubmit = () => {
    if (mode === "create") {
      createMutate({ name: formData.name, description: formData.description, is_active: true }, {
        onSuccess: () => { toast.success("Category berhasil dibuat"); setIsDialogOpen(false); refetch(); },
        onError: (err) => toast.error(`Gagal: ${err.message}`),
      });
    } else if (selectedCategory) {
      updateMutate({ id: selectedCategory.id, data: { name: formData.name, description: formData.description } }, {
        onSuccess: () => { toast.success("Category berhasil diupdate"); setIsDialogOpen(false); refetch(); },
        onError: (err) => toast.error(`Gagal: ${err.message}`),
      });
    }
  };

  const handleDelete = () => {
    if (selectedCategory) {
      deleteMutate(selectedCategory.id, {
        onSuccess: () => { toast.success("Category berhasil dihapus"); setDeleteDialog(false); refetch(); },
        onError: (err) => toast.error(`Gagal: ${err.message}`),
      });
    }
  };

  useEffect(() => {
    if (!isDialogOpen) {
      setFormData({ name: "", description: "" });
      setSelectedCategory(null);
      setMode("create");
    }
  }, [isDialogOpen]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Categories</h1>
        <p className="text-muted-foreground">Kelola data kategori</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Cari kategori..."
            value={searchInput}
            onChange={(e) => { setSearchInput(e.target.value); setPage(1); }}
            className="pl-10"
          />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> Tambah Category</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{mode === "create" ? "Tambah" : "Edit"} Category</DialogTitle>
              <DialogDescription>
                {mode === "create" ? "Buat kategori baru" : "Edit kategori yang dipilih"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nama</Label>
                <Input id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Nama kategori" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Deskripsi</Label>
                <Input id="description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Deskripsi kategori" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
              <Button onClick={handleSubmit} disabled={isCreating || isUpdating || !formData.name}>
                {mode === "create" ? "Buat" : "Simpan"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Deskripsi</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((cat) => (
              <TableRow key={cat.id}>
                <TableCell className="font-medium">{cat.name}</TableCell>
                <TableCell className="text-muted-foreground">{cat.description || "-"}</TableCell>
                <TableCell>
                  <Badge variant={cat.is_active ? "default" : "secondary"}>
                    {cat.is_active ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => {
                      setSelectedCategory(cat);
                      setFormData({ name: cat.name, description: cat.description || "" });
                      setMode("update");
                      setIsDialogOpen(true);
                    }}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => {
                      setSelectedCategory(cat);
                      setDeleteDialog(true);
                    }}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {categories.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">
                  Tidak ada data
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Halaman {page} dari {totalPages}
        </p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
            Next
          </Button>
        </div>
      </div>

      <DialogAlert
        type="delete"
        open={deleteDialog}
        onOpenChange={setDeleteDialog}
        title="Hapus kategori ini?"
        description="Tindakan ini tidak dapat dibatalkan."
        confirmLabel="Hapus"
        onSubmit={handleDelete}
        isLoading={isDeleting}
      />
    </div>
  );
};

export default CategoriesPage;
