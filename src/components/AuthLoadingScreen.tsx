import { Loader2 } from "lucide-react";

const AuthLoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-muted-foreground">Memverifikasi sesi...</p>
      </div>
    </div>
  );
};

export default AuthLoadingScreen;
