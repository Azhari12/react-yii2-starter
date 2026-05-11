import { ShieldX } from "lucide-react";
import { Link } from "react-router";

const ForbiddenPage = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-4">
        <ShieldX className="h-16 w-16 text-destructive mx-auto" />
        <h1 className="text-3xl font-bold">Akses Ditolak</h1>
        <p className="text-muted-foreground">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
        <Link
          to="/"
          className="inline-block px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    </div>
  );
};

export default ForbiddenPage;
