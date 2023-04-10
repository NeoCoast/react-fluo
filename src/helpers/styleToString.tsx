const camelToKebabCase = (str: string) => str.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`);

const styleToString = (style: React.CSSProperties) => {
  let str = '';
  const properties = Object.entries(style);

  properties.forEach((property) => {
    str += `${camelToKebabCase(property[0])}: ${property[1]}; `;
  });

  return str;
};

export default styleToString;
