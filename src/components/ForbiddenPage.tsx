import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import {
	AlertTriangle,
	ArrowLeft,
	Home,
	Lock,
	ShieldAlert,
} from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { Button } from "./ui/button";

const ForbiddenPage = () => {
	return (
		<div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-yellow-50">
			{/* Decorative Background Elements */}
			<div
				className="absolute inset-0 opacity-30 pointer-events-none"
				aria-hidden="true"
				style={{
					background:
						"radial-gradient(circle at 20% 20%, #ef444422, transparent 50%), radial-gradient(circle at 80% 80%, #f9731622, transparent 50%)",
				}}
			/>

			<main className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
				<div className="w-full max-w-2xl">
					<Card className="border-red-200 shadow-xl">
						<CardHeader className="text-center space-y-4 pb-4">
							<div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
								<ShieldAlert className="h-10 w-10 text-red-600" />
							</div>
							<div>
								<CardTitle className="text-3xl font-bold text-gray-900">
									403 - Akses Ditolak
								</CardTitle>
								<CardDescription className="text-base mt-2">
									Anda tidak memiliki izin untuk mengakses halaman ini
								</CardDescription>
							</div>
						</CardHeader>

						<CardContent className="space-y-6">
							<Alert variant="destructive" className="bg-red-50 border-red-200">
								<AlertTriangle className="h-4 w-4" />
								<AlertDescription>
									<strong>Akses Terbatas:</strong> Halaman ini memerlukan hak
									akses khusus yang tidak Anda miliki saat ini.
								</AlertDescription>
							</Alert>

							<div className="bg-gray-50 rounded-lg p-6 space-y-4">
								<h3 className="font-semibold text-gray-900 flex items-center">
									<Lock className="h-4 w-4 mr-2 text-gray-600" />
									Kemungkinan Penyebab:
								</h3>
								<ul className="space-y-2 text-sm text-gray-700">
									<li className="flex items-start">
										<span className="inline-block w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
										<span>
											<strong>Role tidak sesuai:</strong> Akun Anda tidak
											memiliki peran yang diperlukan
										</span>
									</li>
									<li className="flex items-start">
										<span className="inline-block w-1.5 h-1.5 bg-red-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
										<span>
											<strong>Level akses:</strong> Diperlukan level akses yang
											lebih tinggi (Administrator, Supervisor, dll)
										</span>
									</li>
								</ul>
							</div>

							<div className="flex flex-col sm:flex-row gap-3 pt-4">
								<Button
									className="flex-1"
									onClick={() => window.history.back()}
								>
									<ArrowLeft className="h-4 w-4 mr-2" />
									Kembali
								</Button>
								<Button
									variant="outline"
									className="flex-1 bg-transparent"
									onClick={() => (window.location.href = "/")}
								>
									<Home className="h-4 w-4 mr-2" />
									Halaman Utama
								</Button>
							</div>

							<div className="text-center pt-4 border-t">
								<p className="text-sm text-gray-600">
									Butuh bantuan?{" "}
									<a
										href="mailto:edp@rsud-arifin.com"
										className="text-blue-600 hover:text-blue-700 font-medium"
									>
										Hubungi EDP
									</a>
								</p>
							</div>
						</CardContent>
					</Card>

					<div className="mt-6 text-center">
						<p className="text-xs text-gray-500">
							Error Code: 403 FORBIDDEN • SIMDOK • v1.0
						</p>
					</div>
				</div>
			</main>
		</div>
	);
};

export default ForbiddenPage;
