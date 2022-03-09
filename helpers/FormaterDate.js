export default formaterDate = (date) => {
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const year = date.getFullYear();
  const dateFormated = year + "/" + month + "/" + day;
  return dateFormated;
};
