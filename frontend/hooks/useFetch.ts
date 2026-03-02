import { useState, useEffect, useCallback, useRef } from "react";

/**
 * A universal fetch hook for any method (GET, POST, etc.)
 * @param {string} url - The API endpoint
 * @param {object} options - Fetch options (method, headers, body, credentials)
 * @param {Array} dependencies - Variables that trigger a re-fetch
 */
export const useFetch = (url: string, options = {}, dependencies = []) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize options to prevent unnecessary re-renders if a raw object is passed
  const optionsRef = useRef(options);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(url, optionsRef.current);

      // Handle HTTP errors (4xx, 5xx)
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      const result = await response.json();

      // We assume your API follows the { success: true, data: [...] } pattern
      if (result.success) {
        setData(result.data);
      } else {
        throw new Error(result.message || "Failed to fetch data");
      }
    } catch (err) {
      // Narrow the type from unknown to Error
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
      console.error("Fetch Hook Error:", err);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchData, ...dependencies]);

  return { data, loading, error, refresh: fetchData };
};
