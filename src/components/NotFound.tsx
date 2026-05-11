import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <h2 className="text-2xl font-semibold">Halaman Tidak Ditemukan</h2>
        <p className="text-muted-foreground">Halaman yang Anda cari tidak ada.</p>
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

export default NotFound;
