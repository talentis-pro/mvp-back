import { create } from "./create/handler";
import { signIn } from "./sign-in/handler";
import { verify } from "./verify/handler";

export const accountDomain = {
	accountDomainCreate: create,
	accountDomainSignIn: signIn,
	accountDomainVerify: verify,
};
