export const getCookieValues = (key: string): string[] => {
  const keyEq = `${key}=`;
  const cookies = document.cookie.split(";");

  return cookies.reduce((acc: Array<string>, cookie: string) => {
    const cookieTrimmed = cookie.trim();

    if (cookieTrimmed.indexOf(keyEq) === 0) {
      acc.push(cookieTrimmed.substring(keyEq.length, cookieTrimmed.length));
    }

    return acc;
  }, []);
};
