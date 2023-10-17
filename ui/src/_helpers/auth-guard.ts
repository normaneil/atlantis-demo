/* eslint-disable */
import router from "../router/index";

export async function authGuard(to: any, from: any, next: any) {
  const token = localStorage.getItem("authtoken");

  // If don't have token session redirect to login
  if (!token) {
    next();
    router.push({ path: "/" });
  } else {
    next();
  }
}
