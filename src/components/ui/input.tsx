import * as React from "react";

import { cn } from "@/lib/utils";

type CustomProps = {
	currency?: boolean;
};

export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement>,
		CustomProps {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
	({ className, type, currency, ...props }, ref) => {
		return (
			<div className="relative">
				{currency && (
					<p className="absolute top-[0.35rem] left-2 text-gray-600">Rp. </p>
				)}
				<input
					type={type}
					className={cn(
						"flex h-9 w-full rounded-md border border-input bg-white px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
						className,
						currency && "pl-10"
					)}
					ref={ref}
					{...props}
				/>
			</div>
		);
	}
);

export { Input };
