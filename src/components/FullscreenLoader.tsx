import { Loader2 } from "lucide-react";

const FullscreenLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <Loader2 className="h-6 w-6 animate-spin text-primary" />
    </div>
  );
};

export default FullscreenLoader;
