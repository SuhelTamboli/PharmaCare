// Helper to format date
export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

// Helper to check if date is in the past
export const checkIsExpired = (dateString: string) => {
  const expiryDate = new Date(dateString);
  const today = new Date();
  // Reset hours to compare only dates
  today.setHours(0, 0, 0, 0);
  return expiryDate < today;
};
