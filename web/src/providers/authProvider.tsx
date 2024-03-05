import { FirebaseApp } from "firebase/app";
import {
  Auth,
  getAuth,
  OAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { AuthProvider, UserIdentity } from "react-admin";

function retrieveStatusTxt(status) {
  // Make sure any successful status is OK.
  if (status >= 200 && status < 300) {
    return "ok";
  }
  switch (status) {
    case 401: // 'unauthenticated'
      return "unauthenticated";
    case 0: // 'internal'
    case 400: // 'invalid-argument'
    case 403: // 'permission-denied'
    case 404: // 'not-found'
    case 409: // 'aborted'
    case 429: // 'resource-exhausted'
    case 499: // 'cancelled'
    case 500: // 'internal'
    case 501: // 'unimplemented'
    case 503: // 'unavailable'
    case 504: // 'deadline-exceeded'
    default:
      // ignore
      return "ok";
  }
}

class UltraAuthProvider implements AuthProvider {
  constructor(private readonly app: FirebaseApp) {
    this.provider = {
      ultra: new OAuthProvider("oidc.ultra"),
    };
    this.auth = getAuth(app);
  }

  private readonly provider: { [social: string]: OAuthProvider };
  private readonly auth: Auth;

  async checkAuth(params: any): Promise<void> {
    await this.getUserLogin();
  }

  checkError(error: any): Promise<void> {
    const status = !!error && error.status;
    const statusTxt = retrieveStatusTxt(status);
    if (status === 403) {
      return Promise.reject({ redirectTo: "/not-authorized" });
    }
    if (statusTxt === "ok") {
      return Promise.resolve();
    }
    return Promise.reject();
  }

  getPermissions(params: any) {
    const permissions = localStorage.getItem("permissions");
    if (!permissions) {
      return Promise.resolve();
    }
    return Promise.resolve(permissions);
  }

  async getIdentity() {
    try {
      const { uid, displayName, email, photoURL, ...rest } =
        await this.getUserLogin();
      const identity: UserIdentity = {
        id: uid,
        fullName: `${displayName ?? ""}`,
        avatar: `${photoURL ?? ""}`,
        email,
      };
      return identity;
    } catch (e) {
      return null as any;
    }
  }

  async login(params: any): Promise<User> {
    let user = params.social
      ? await this.handleSocialLogin(params)
      : await this.handleAuthLogin(params);
    const token = await user.getIdTokenResult();
    const { role } = token.claims;
    localStorage.setItem("permissions", role ? String(role) : null);

    // Custom onSuccess
    if (params.onSuccess) {
      await params.onSuccess();
    }
    return user;
  }

  async logout(params: any): Promise<void | false | string> {
    localStorage.removeItem("permissions");
    return signOut(this.auth);
  }

  async getJWTToken() {
    try {
      const user = await this.getUserLogin();
      // @ts-ignore
      const token = await user.getIdTokenResult();
      return token.token;
    } catch (e) {
      console.log(
        "HandleGetJWTAuthTime: no user is logged in or tokenResult error",
        {
          e,
        },
      );
      return null;
    }
  }

  private async handleSocialLogin(params: { social: string }): Promise<User> {
    try {
      await signInWithPopup(this.auth, this.provider[params.social]);
      const userLogin = await this.getUserLogin();
      return userLogin;
    } catch (e) {
      throw e;
    }
  }

  private async handleAuthLogin(params: {
    username: string;
    password: string;
  }): Promise<User> {
    const { username, password } = params;
    if (username && password) {
      try {
        await signInWithEmailAndPassword(this.auth, username, password);
        const userLogin = await this.getUserLogin();
        return userLogin;
      } catch (e) {
        throw new Error("Login error: invalid credentials");
      }
    } else {
      return await this.getUserLogin();
    }
  }

  private async getUserLogin(): Promise<User> {
    return this.authGetUserLoggedIn();
  }

  private async authGetUserLoggedIn(): Promise<User> {
    return new Promise((resolve, reject) => {
      const auth = this.auth;
      if (auth.currentUser) {
        resolve(auth.currentUser);
        return;
      }
      const unsubscribe = onAuthStateChanged(this.auth, (user) => {
        unsubscribe();
        if (user) {
          resolve(user);
        } else {
          reject("User not logged"); // Provide an appropriate error message
        }
      });
    });
  }
}

export default UltraAuthProvider;
