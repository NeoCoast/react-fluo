const replaceDivsWithEnters = (text: string) => text.replace(/<div>/g, '\n').replace(/<\/div>/g, '');

const replaceBreaksWithEnters = (text: string) => text.replace(/<br>/g, '\n');

const replaceEnters = (text: string) => replaceBreaksWithEnters(replaceDivsWithEnters(text));

export default replaceEnters;
