export const toddmmyyyy = function (isoDate) {
  let date;
  if (isoDate) {
    date = isoDate.replace(/T.*/, "").split("-").reverse().join("/");
  } else {
    date = "-";
  }
  return date;
};

export const toRupiah = (word, fixed = 0) => {
  if (word && typeof word === "number") {
    return (
      "Rp " +
      word
        .toFixed(fixed)
        .toString()
        .replace(".", ",")
        .replace(/\\,00$/, "")
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
    );
  } else {
    return "Rp 0,-";
  }
};
