export const mockSignIn = async () => {
  // We need to call this endpoint so we set the GU_PROFILE_CSRF cookie
  await fetch(
    "https://profile.code.dev-theguardian.com/signin?INTCMP=DOTCOM_NEWHEADER_SIGNIN"
  );
  return await fetch(
    "https://profile.code.dev-theguardian.com/actions/signInSecondStepCurrent",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body:
        "returnUrl=https://m.code.dev-theguardian.com/science/grrlscientist/2012/aug/07/3&skipConfirmation=false&skipValidationReturn=false&isSocialSignInBlocked=false&email=oliver.lloyd.freelancer@theguardian.com&password=abc123&rememberMe=true&dont-remove-this=",
      credentials: "include"
    }
  );
};
