import { refreshToken } from "./refresh-token/handler";
import { signIn } from "./sign-in/handler";
import { signUp } from "./sign-up/handler";
import { verify } from "./verify/handler";

export const authDomain = {
	authDomainRefreshToken: refreshToken,
	authDomainSignUp: signUp,
	authDomainSignIn: signIn,
	authDomainVerify: verify,
};
