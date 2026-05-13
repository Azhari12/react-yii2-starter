import { Loader2 } from "lucide-react";

export default function AuthLoadingScreen() {
	return (
		<div className="min-h-screen bg-white">
			<div
				className="absolute inset-0 opacity-60 pointer-events-none"
				aria-hidden="true"
				style={{
					background:
						"radial-gradient(circle at 20% 20%, #34d39922, transparent 40%), radial-gradient(circle at 80% 30%, #10b98122, transparent 40%), radial-gradient(circle at 50% 80%, #6ee7b722, transparent 40%)",
				}}
			/>
			<main className="relative z-10 flex min-h-screen items-center justify-center px-6">
				<div className="w-full max-w-md rounded-2xl border bg-white/80 backdrop-blur-sm p-8 shadow-sm">
					<div className="flex flex-col items-center text-center">
						<div className="mt-6 flex items-center gap-3">
							<Loader2 className="h-6 w-6 animate-spin text-blue-600" />
							<h1 className="text-xl font-semibold text-gray-900">
								Memuat Aplikasi
							</h1>
						</div>
						<p className="mt-2 text-sm text-gray-600">
							Mohon tunggu sebentar...
						</p>
						<p className="mt-1 text-xs text-gray-500">
							Sedang memeriksa sesi pengguna
						</p>

						<div
							className="mt-6 h-2 w-full rounded-full bg-gray-200"
							role="progressbar"
							aria-valuemin={0}
							aria-valuemax={100}
							aria-valuenow={66}
						>
							<div className="h-2 w-2/3 rounded-full bg-blue-500 transition-all" />
						</div>

						<div className="mt-6 grid w-full grid-cols-3 gap-2 text-[10px] text-gray-500">
							<div className="rounded-md border bg-white p-2">Inisialisasi</div>
							<div className="rounded-md border bg-white p-2">Cek Sesi</div>
							<div className="rounded-md border bg-white p-2">Siapkan UI</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
