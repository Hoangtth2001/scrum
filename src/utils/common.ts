export const removeExtraSpace = (str: string): string => {
  const stringFormat = !Array.isArray(str) ? str?.toString()?.trim().replace(/\t/g, '').split(/ +/).join(' ') : str;

  return stringFormat;
};
