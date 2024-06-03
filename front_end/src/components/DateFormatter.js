export const formatDate = (dateString) => {
  // Parse the date string
  const date = new Date(dateString);

  // Extract year, month, and day
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  // Format the date in YYYY-MM-DD
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};
