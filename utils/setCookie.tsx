import cookie from "js-cookie";
export const SetCookie = async (data: string) => {
  const maxAgeInSeconds = 30 * 24 * 60 * 60;
  const cookieOptions = {
    expires: maxAgeInSeconds,
    path: "/",
  };

  // Set the AUTH_TOKEN cookie
  cookie.set("AUTH_TOKEN", data, cookieOptions);
};
