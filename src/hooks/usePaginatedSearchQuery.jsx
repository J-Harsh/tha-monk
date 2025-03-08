import { useQuery } from "@tanstack/react-query";

function usePaginatedSearchQuery({ page, limit, search }, options = {}) {
  const queryKey = ["products", { page, limit, search }];

  return useQuery({
    queryKey,
    queryFn: async () => {
      // Create URL with URLSearchParams
      const baseUrl = "https://tha-monk-sample-be.onrender.com/products";
      const params = new URLSearchParams();

      params.append("page", String(page));
      params.append("limit", String(limit));
      if (search) {
        params.append("search", search);
      }

      const url = `${baseUrl}?${params.toString()}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    ...options,
  });
}

export default usePaginatedSearchQuery;
