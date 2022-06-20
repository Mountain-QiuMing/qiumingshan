export const randomCode = (length: number) => {
  let randStr = '';

  for (let i = 0; i < length; i++) {
    const ch = Math.floor(Math.random() * 10 + 1);

    randStr += ch.toString();
  }

  return randStr;
};
