export const toCapitalCase = (s: string): string => {
  if (s.length === 0) {
    return s;
  }

  const firstChar: string = s[0].toUpperCase();
  const remainingChars: string = s.slice(1);

  return firstChar + remainingChars;
};
