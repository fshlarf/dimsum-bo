export const toddmmyyyy = function (isoDate) {
  let date;
  if (isoDate) {
    date = isoDate.replace(/T.*/, "").split("-").reverse().join("/");
  } else {
    date = "-";
  }
  return date;
};
