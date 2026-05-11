import { useState, useEffect } from "react";
import { usePermissionsQuery, useCreatePermissionMutation, useUpdatePermissionMutation, useDeletePermissionMutation } from "@/hooks/useRbac.query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import DialogAlert from "@/components/dialogs/DialogAlert";
import { LinkIcon, Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const PermissionsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [valueName, setValueName] = useState("");
  const [permissionSelected, setPermissionSelected] = useState("");
  const [mode, setMode] = useState<"create" | "update">("create");
  const [deleteDialog, setDeleteDialog] = useState(false);

  const { data, refetch } = usePermissionsQuery();
  const { mutate, isPending } = useCreatePermissionMutation();
  const { mutate: mutateUpdate, isPending: isPendingUpdate } = useUpdatePermissionMutation();
  const { mutate: mutateDelete, isPending: isPendingDelete } = useDeletePermissionMutation();

  const permissionsData = (data?.data || []) as string[];
  const navigate = useNavigate();

  const onSubmit = () => {
    const payload = { AuthItem: { name: valueName } };
    if (mode === "create") {
      mutate(payload, {
        onSuccess: () => { refetch(); toast.success("Permission berhasil dibuat"); setIsDialogOpen(false); },
        onError: (err) => toast.error(`Gagal: ${err.message}`),
      });
    } else {
      mutateUpdate({ data: payload, id: permissionSelected }, {
        onSuccess: () => { refetch(); toast.success("Permission berhasil diupdate"); setIsDialogOpen(false); },
        onError: (err) => toast.error(`Gagal: ${err.message}`),
      });
    }
  };

  const onDelete = () => {
    mutateDelete(permissionSelected, {
      onSuccess: () => { refetch(); toast.success("Permission berhasil dihapus"); setDeleteDialog(false); },
      onError: (err) => toast.error(`Gagal: ${err.message}`),
    });
  };

  useEffect(() => {
    if (!isDialogOpen && !deleteDialog) {
      setValueName("");
      setPermissionSelected("");
      setMode("create");
    }
  }, [isDialogOpen, deleteDialog]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Permission Management</h1>
        <p className="text-muted-foreground">Kelola izin akses dalam sistem</p>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Cari permission..." className="pl-10" />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> Tambah Permission</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{mode === "create" ? "Tambah" : "Edit"} Permission</DialogTitle>
              <DialogDescription>{mode === "create" ? "Buat permission baru" : "Edit permission"}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Nama Permission</Label>
                <Input value={valueName} onChange={(e) => setValueName(e.target.value)} placeholder="Nama permission" />
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
              <TableHead>Nama Permission</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {permissionsData.map((permission) => (
              <TableRow key={permission}>
                <TableCell className="font-medium">{permission}</TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate(`/rbac/permission/${permission}`)} title="Assign Routes">
                      <LinkIcon className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" onClick={() => {
                      setIsDialogOpen(true); setValueName(permission); setPermissionSelected(permission); setMode("update");
                    }}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => {
                      setDeleteDialog(true); setPermissionSelected(permission);
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

      <DialogAlert type="delete" open={deleteDialog} onOpenChange={setDeleteDialog} title="Hapus permission ini?" description="Tindakan ini tidak dapat dibatalkan." confirmLabel="Hapus" onSubmit={onDelete} isLoading={isPendingDelete} />
    </div>
  );
};

export default PermissionsPage;
