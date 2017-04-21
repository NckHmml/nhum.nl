interface IClassNames {
  [key: string]: boolean
}

export const ClassNames = (names: IClassNames): string => {
  const classes = new Array<string>();
  for (let key in names) {
    if (names[key])
      classes.push(key)
  }
  return classes.join(" ");
};