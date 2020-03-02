import { getCookieValues } from "./getCookieValues";
import { decodeBase64 } from "./decodeBase64";

const userCookieKey = "GU_U";

export const getUserFromCookie = () => {
  const userCookieString = getCookieValues(userCookieKey)[0];
  let userData = null;
  let userFromCookieCache;

  if (userCookieString) {
    userData = JSON.parse(decodeBase64(userCookieString.split(".")[0]));
  }
  if (userData) {
    const displayName = decodeURIComponent(userData[2]);
    userFromCookieCache = {
      id: userData[0],
      primaryEmailAddress: userData[1], // not sure where this is stored now - not in the cookie any more
      displayName,
      accountCreatedDate: userData[6],
      emailVerified: userData[7],
      rawResponse: userCookieString
    };
  }
  return userFromCookieCache;
};
