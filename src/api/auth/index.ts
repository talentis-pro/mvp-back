import { signIn } from "./sign-in/handler";
import { signUp } from "./sign-up/handler";
import { verify } from "./verify/handler";

export const authDomain = {
	authDomainSignUp: signUp,
	authDomainSignIn: signIn,
	authDomainVerify: verify,
};
