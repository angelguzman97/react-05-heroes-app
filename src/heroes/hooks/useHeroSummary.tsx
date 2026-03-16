import { useQuery } from "@tanstack/react-query";
import { getSummaryAction } from "../actions/get-summary.action";

export const useHeroSummary = () => {
    return useQuery({
        queryKey: ['summary-information'],
        queryFn: getSummaryAction,
        staleTime: 100 * 60 * 5
    });
}
