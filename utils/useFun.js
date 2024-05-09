// Function to paginate data
exports.paginate = (array, page = 1, pageSize = 3) => {

  const startIndex = (page - 1) * pageSize;
  return array.slice(startIndex, startIndex + pageSize);
};
