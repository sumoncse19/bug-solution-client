/* eslint-disable no-useless-escape */
function validateEmail(email: string) {
  const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  return pattern.test(email);
}

const validateURL = (url: string) => {
  const trimmedUrl = url.trim();
  if (/\s/.test(trimmedUrl)) {
    return false;
  }
  const regex =
    /^(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9@:%._\+~#=\-]{1,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/i;
  return regex.test(trimmedUrl);
};

export { validateEmail, validateURL };
