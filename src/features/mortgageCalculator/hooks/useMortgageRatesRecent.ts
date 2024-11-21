import { getApiNinjaBaseInstance } from "@/shared/services/apiNinjas/getApiNinjaBaseInstance";
import { createHttpService } from "@/shared/services/baseHttpService";
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
} from "@tanstack/react-query";
import { useCallback } from "react";

interface MortgageRateItemResponse {
  week: string;
  data: {
    frm_30: number;
    frm_15: number;
    week: Date;
  };
}

interface useMortgageRatesRecentProps {
  queryOptions?: Omit<
    UseQueryOptions<
      MortgageRateItemResponse[],
      Error,
      MortgageRateItemResponse[]
    >,
    "queryKey" | "queryFn"
  >;
}

/**
 * Makes API call to get the most recent mortgage rates
 */
export const useMortgageRatesRecent = (
  props: useMortgageRatesRecentProps = {},
): UseQueryResult<MortgageRateItemResponse[], Error> => {
  const serviceCallback = useCallback(async () => {
    const service = createHttpService(getApiNinjaBaseInstance());
    const response =
      await service.get<MortgageRateItemResponse[]>("/mortgagerate");
    if (!response.success)
      throw new Error(
        response.message ?? "useMortgageRatesRecent: Unknown error",
      );

    return response.body ?? [];
  }, []);

  return useQuery<MortgageRateItemResponse[], Error>({
    queryKey: ["mortgageRatesRecent"],
    queryFn: serviceCallback,
    ...props.queryOptions,
  });
};
