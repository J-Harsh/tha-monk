import { useInfiniteQuery } from "@tanstack/react-query";
import { useCallback } from "react";

function throttle(fn, delay) {
  let lastCall = 0;
  let timeoutId = null;
  let throttledFn = null;

  return function (...args) {
    const now = Date.now();
    const timeSinceLastCall = now - lastCall;

    if (timeSinceLastCall >= delay) {
      lastCall = now;
      return fn(...args);
    } else {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      return new Promise((resolve) => {
        throttledFn = () => {
          lastCall = Date.now();
          resolve(fn(...args));
        };

        timeoutId = setTimeout(throttledFn, delay - timeSinceLastCall);
      });
    }
  };
}

function usePaginatedSearchQuery(
  { limit, search, throttleTime = 500 },
  options = {}
) {
  const throttledFetch = useCallback(
    throttle(async (url) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        return await response.json();
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
    }, throttleTime),
    [throttleTime]
  );

  return useInfiniteQuery({
    queryKey: ["products", { limit, search }],
    queryFn: async ({ pageParam = 1 }) => {
      const baseUrl = "https://tha-monk-sample-be.onrender.com/products";
      const params = new URLSearchParams();

      params.append("page", String(pageParam));
      params.append("limit", String(limit));
      if (search) {
        params.append("search", search);
      }

      const url = `${baseUrl}?${params.toString()}`;
      return await throttledFetch(url);
    },
    getNextPageParam: (lastPage) => {
      const { page, pages } = lastPage.pagination;
      return page < pages ? page + 1 : undefined;
    },
    keepPreviousData: true,
    ...options,
  });
}

export default usePaginatedSearchQuery;
