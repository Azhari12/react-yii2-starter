import { useState, useEffect } from "react";
import { useRolesQuery, useCreateRoleMutation, useUpdateRoleMutation, useDeleteRoleMutation } from "@/hooks/useRbac.query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import DialogAlert from "@/components/dialogs/DialogAlert";
import { LinkIcon, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const RolePage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [valueName, setValueName] = useState("");
  const [roleSelected, setRoleSelected] = useState("");
  const [mode, setMode] = useState<"create" | "update">("create");
  const [deleteDialog, setDeleteDialog] = useState(false);

  const { data, refetch } = useRolesQuery();
  const { mutate, isPending } = useCreateRoleMutation();
  const { mutate: mutateUpdate, isPending: isPendingUpdate } = useUpdateRoleMutation();
  const { mutate: mutateDelete, isPending: isPendingDelete } = useDeleteRoleMutation();

  const rolesData = (data?.data || []) as string[];
  const navigate = useNavigate();

  const onSubmit = () => {
    const payload = { AuthItem: { name: valueName } };
    if (mode === "create") {
      mutate(payload, {
        onSuccess: () => { refetch(); toast.success("Role berhasil dibuat"); setIsDialogOpen(false); },
        onError: (err) => toast.error(`Gagal: ${err.message}`),
      });
    } else {
      mutateUpdate({ data: payload, id: roleSelected }, {
        onSuccess: () => { refetch(); toast.success("Role berhasil diupdate"); setIsDialogOpen(false); },
        onError: (err) => toast.error(`Gagal: ${err.message}`),
      });
    }
  };

  const onDelete = () => {
    mutateDelete(roleSelected, {
      onSuccess: () => { refetch(); toast.success("Role berhasil dihapus"); setDeleteDialog(false); },
      onError: (err) => toast.error(`Gagal: ${err.message}`),
    });
  };

  useEffect(() => {
    if (!isDialogOpen && !deleteDialog) {
      setValueName("");
      setRoleSelected("");
      setMode("create");
    }
  }, [isDialogOpen, deleteDialog]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Role Management</h1>
        <p className="text-muted-foreground">Kelola role dalam sistem</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Cari role..." className="pl-10" />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> Tambah Role</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{mode === "create" ? "Tambah" : "Edit"} Role</DialogTitle>
              <DialogDescription>{mode === "create" ? "Buat role baru" : "Edit role"}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Nama Role</Label>
                <Input value={valueName} onChange={(e) => setValueName(e.target.value)} placeholder="Nama role" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Batal</Button>
              <Button onClick={onSubmit} disabled={isPending || isPendingUpdate || !valueName}>
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
              <TableHead>Nama Role</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rolesData.map((role) => (
              <TableRow key={role}>
                <TableCell className="font-medium">{role}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(`/rbac/role/${role}`)} title="Assign Permissions">
                      <LinkIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" onClick={() => {
                      setIsDialogOpen(true); setValueName(role); setRoleSelected(role); setMode("update");
                    }}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => {
                      setDeleteDialog(true); setRoleSelected(role);
                    }}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <DialogAlert type="delete" open={deleteDialog} onOpenChange={setDeleteDialog} title="Hapus role ini?" description="Tindakan ini tidak dapat dibatalkan." confirmLabel="Hapus" onSubmit={onDelete} isLoading={isPendingDelete} />
    </div>
  );
};

export default RolePage;
