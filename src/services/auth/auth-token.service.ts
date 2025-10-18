import { AuthToken } from "@/shared/types/auth.types";
import Cookies from "js-cookie";

class AuthTokenService {
  getAccessToken() {
    const accessToken = Cookies.get(AuthToken.ACCESS_TOKEN);
    return accessToken || null;
  }

  saveAccessToken(accessToken: string) {
    Cookies.set(AuthToken.ACCESS_TOKEN, accessToken, {
      domain: "sibkomplekt.ru",
      sameSite: "strict",
      expires: 1,
    });
  }

  removeAccessToken() {
    Cookies.remove(AuthToken.ACCESS_TOKEN, {
      domain: "sibkomplekt.ru",
    });
  }
}

export default new AuthTokenService();
