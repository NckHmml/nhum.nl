/**
 * Will display the class when the value of its key is true
 * @param names class names to check
 */
export const classNames = (names: { [key: string]: boolean | null | undefined }): string => {
  const classes = new Array<string>();
  for (const key in names) {
    if (names[key]) classes.push(key);
  }
  return classes.join(" ");
};
