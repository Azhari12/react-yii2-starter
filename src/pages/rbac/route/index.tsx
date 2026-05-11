import { useState } from "react";
import { useRoutesQuery, useAssignRoutesMutation, useRemoveRoutesMutation } from "@/hooks/useRbac.query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Search } from "lucide-react";
import { toast } from "sonner";

const RoutePage = () => {
  const { data, refetch } = useRoutesQuery();
  const { mutate: assignMutate } = useAssignRoutesMutation();
  const { mutate: removeMutate } = useRemoveRoutesMutation();
  const [selectedAvailable, setSelectedAvailable] = useState<string[]>([]);
  const [selectedAssigned, setSelectedAssigned] = useState<string[]>([]);
  const [searchAvailable, setSearchAvailable] = useState("");
  const [searchAssigned, setSearchAssigned] = useState("");

  const available = (data?.data?.available_routes || []) as string[];
  const assigned = (data?.data?.assigned_routes || []) as string[];

  const filteredAvailable = available.filter((r) => r.toLowerCase().includes(searchAvailable.toLowerCase()));
  const filteredAssigned = assigned.filter((r) => r.toLowerCase().includes(searchAssigned.toLowerCase()));

  const handleAssign = () => {
    if (selectedAvailable.length === 0) return;
    assignMutate({ items: selectedAvailable }, {
      onSuccess: () => { toast.success("Routes assigned"); setSelectedAvailable([]); refetch(); },
      onError: (err) => toast.error(err.message),
    });
  };

  const handleRemove = () => {
    if (selectedAssigned.length === 0) return;
    removeMutate({ items: selectedAssigned }, {
      onSuccess: () => { toast.success("Routes removed"); setSelectedAssigned([]); refetch(); },
      onError: (err) => toast.error(err.message),
    });
  };

  const toggleSelect = (item: string, list: string[], setList: (v: string[]) => void) => {
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Route Management</h1>
        <p className="text-muted-foreground">Kelola route yang tersedia di sistem</p>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] gap-4">
        {/* Available */}
        <div className="border rounded-lg p-4 space-y-3">
          <h3 className="font-semibold">Available Routes ({filteredAvailable.length})</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Filter..." value={searchAvailable} onChange={(e) => setSearchAvailable(e.target.value)} className="pl-10" />
          </div>
          <div className="h-[400px] overflow-y-auto border rounded-md p-2 space-y-1">
            {filteredAvailable.map((route) => (
              <div
                key={route}
                onClick={() => toggleSelect(route, selectedAvailable, setSelectedAvailable)}
                className={`px-2 py-1 rounded cursor-pointer text-sm font-mono ${
                  selectedAvailable.includes(route) ? "bg-primary/10 text-primary" : "hover:bg-muted"
                }`}
              >
                {route}
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col items-center justify-center gap-2">
          <Button size="icon" variant="outline" onClick={handleAssign} disabled={selectedAvailable.length === 0}>
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="outline" onClick={handleRemove} disabled={selectedAssigned.length === 0}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>

        {/* Assigned */}
        <div className="border rounded-lg p-4 space-y-3">
          <h3 className="font-semibold">Assigned Routes ({filteredAssigned.length})</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Filter..." value={searchAssigned} onChange={(e) => setSearchAssigned(e.target.value)} className="pl-10" />
          </div>
          <div className="h-[400px] overflow-y-auto border rounded-md p-2 space-y-1">
            {filteredAssigned.map((route) => (
              <div
                key={route}
                onClick={() => toggleSelect(route, selectedAssigned, setSelectedAssigned)}
                className={`px-2 py-1 rounded cursor-pointer text-sm font-mono ${
                  selectedAssigned.includes(route) ? "bg-destructive/10 text-destructive" : "hover:bg-muted"
                }`}
              >
                {route}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutePage;
