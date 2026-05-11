import { useState } from "react";
import { useParams } from "react-router";
import { useGetRoleByIdQuery, useAssignRoleMutation, useUnassignRoleMutation } from "@/hooks/useRbac.query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { toast } from "sonner";

const DetailRolePage = () => {
  const { id } = useParams();
  const { data, refetch } = useGetRoleByIdQuery({ id: id! });
  const { mutate: assignMutate } = useAssignRoleMutation();
  const { mutate: unassignMutate } = useUnassignRoleMutation();
  const [selectedAvailable, setSelectedAvailable] = useState<string[]>([]);
  const [selectedAssigned, setSelectedAssigned] = useState<string[]>([]);
  const [searchAvailable, setSearchAvailable] = useState("");
  const [searchAssigned, setSearchAssigned] = useState("");

  const available = (data?.data?.available || []) as string[];
  const assigned = (data?.data?.assigned || []) as string[];

  const filteredAvailable = available.filter((r) => r.toLowerCase().includes(searchAvailable.toLowerCase()));
  const filteredAssigned = assigned.filter((r) => r.toLowerCase().includes(searchAssigned.toLowerCase()));

  const handleAssign = () => {
    assignMutate({ data: { items: selectedAvailable }, id: id! }, {
      onSuccess: () => { toast.success("Berhasil assign"); setSelectedAvailable([]); refetch(); },
      onError: (err) => toast.error(err.message),
    });
  };

  const handleUnassign = () => {
    unassignMutate({ data: { items: selectedAssigned }, id: id! }, {
      onSuccess: () => { toast.success("Berhasil unassign"); setSelectedAssigned([]); refetch(); },
      onError: (err) => toast.error(err.message),
    });
  };

  const toggleSelect = (item: string, list: string[], setList: (v: string[]) => void) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Role: {id}</h1>
        <p className="text-muted-foreground">Assign/unassign permissions pada role ini</p>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] gap-4">
        <div className="border rounded-lg p-4 space-y-3">
          <h3 className="font-semibold">Available ({filteredAvailable.length})</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Filter..." value={searchAvailable} onChange={(e) => setSearchAvailable(e.target.value)} className="pl-10" />
          </div>
          <div className="h-[400px] overflow-y-auto border rounded-md p-2 space-y-1">
            {filteredAvailable.map((item) => (
              <div key={item} onClick={() => toggleSelect(item, selectedAvailable, setSelectedAvailable)}
                className={`px-2 py-1 rounded cursor-pointer text-sm ${selectedAvailable.includes(item) ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center gap-2">
          <Button size="icon" variant="outline" onClick={handleAssign} disabled={selectedAvailable.length === 0}>
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" onClick={handleUnassign} disabled={selectedAssigned.length === 0}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>

        <div className="border rounded-lg p-4 space-y-3">
          <h3 className="font-semibold">Assigned ({filteredAssigned.length})</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Filter..." value={searchAssigned} onChange={(e) => setSearchAssigned(e.target.value)} className="pl-10" />
          </div>
          <div className="h-[400px] overflow-y-auto border rounded-md p-2 space-y-1">
            {filteredAssigned.map((item) => (
              <div key={item} onClick={() => toggleSelect(item, selectedAssigned, setSelectedAssigned)}
                className={`px-2 py-1 rounded cursor-pointer text-sm ${selectedAssigned.includes(item) ? "bg-destructive/10 text-destructive" : "hover:bg-muted"}`}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailRolePage;
