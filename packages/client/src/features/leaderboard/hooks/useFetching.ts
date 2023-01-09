import { useState } from "react";

export const useFetching = (callback: (limit:number, page:number)=>void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetching = async (limit:number, page:number) => {
    try {
      setIsLoading(true);
      await callback(limit, page);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }

  return [fetching, isLoading, error];
};