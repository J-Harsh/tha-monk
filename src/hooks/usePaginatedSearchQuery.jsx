import { useInfiniteQuery } from "@tanstack/react-query";

function usePaginatedSearchQuery({ limit, search }, options = {}) {
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

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Error fetching products:", error);
        throw error;
      }
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
