import { useQuery } from "@tanstack/react-query";

function usePaginatedSearchQuery(
  endpoint,
  { page, limit, search },
  options = {}
) {
  const queryKey = [endpoint, page, limit, search];

  return useQuery({
    queryKey,
    queryFn: async () => {
      // since the api provided was giving me un-authorized error mainly because of the lack of x api key , i decided to use my own api with the same functionality
      const url = "https://tha-monk-sample-be.onrender.com/products";
      url.searchParams.append("page", String(page));
      url.searchParams.append("limit", String(limit));
      if (search) {
        url.searchParams.append("search", search);
      }
      const response = await fetch(url.toString());
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    },
    ...options,
  });
}

export default usePaginatedSearchQuery;
