"use client";

import { useRouter, useSearchParams } from "next/navigation";

export function useLobbyList(isInSchoolFilter: boolean) {
	const router = useRouter();
	const searchParams = useSearchParams();

	function handleSchoolFilterChange() {
		const newFilterValue = !isInSchoolFilter;
		const newParams = new URLSearchParams(searchParams.toString());
		newParams.set("inSchool", newFilterValue.toString());
		router.replace(`/lobby/?${newParams.toString()}`);
	}

	return { handleSchoolFilterChange };
}
