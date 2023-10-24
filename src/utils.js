const romanKey = [
  "",
  "C",
  "CC",
  "CCC",
  "CD",
  "D",
  "DC",
  "DCC",
  "DCCC",
  "CM",
  "",
  "X",
  "XX",
  "XXX",
  "XL",
  "L",
  "LX",
  "LXX",
  "LXXX",
  "XC",
  "",
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
];

/**
 * @param {number} num
 * @return {string | undefined}
 */
export const intToRoman = (num) => {
  if (typeof num !== "number") {
    return undefined;
  }

  const digits = String(+num).split("");
  let romanNum = "";
  let i = 3;

  while (i--) {
    romanNum = (romanKey[+(digits.pop() ?? "") + i * 10] || "") + romanNum;
  }

  return Array(+digits.join("") + 1).join("M") + romanNum;
};

/**
 * uppercases the first letter of each word in a string
 * @param {string} str
 * @return {string}
 */
export const titleCase = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
