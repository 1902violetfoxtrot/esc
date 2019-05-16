const replacements = {
  [`"city":"`]: ',c',
  [`"departing":`]: ',d',
  [`"returning":`]: ',r',
  [`"carrier":`]: ',a',
  [`"class":`]: ',l',
  [`"price":`]: ',p',
  [`"ECONOMY"`]: ',e',
  [`Air`]: ',i'
};

export const jsonShrink = obj => {
  const str = JSON.stringify(obj);
  return Object.keys(replacements).reduce((str, s) => {
    const reg = new RegExp(s, 'g');
    return str.replace(reg, replacements[s]);
  }, str);
};

export const jsonGrow = str => {
  const keys = Object.keys(replacements);
  const newStr = Object.values(replacements).reduce((str, s, i) => {
    const reg = new RegExp(s, 'g');
    return str.replace(reg, keys[i]);
  }, str);
  return JSON.parse(newStr);
};
