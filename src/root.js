import { Router, Route, RootRoute } from "@tanstack/react-router";
import LoginPage from "./pages/Login";
import Profile from "./components/profile";
import Root from "./App";
import LoginForm from "./components/login";
import RegisterForm from "./components/register";

const rootRoute = new RootRoute({
  component: Root,
});

// NOTE: @see https://tanstack.com/router/v1/docs/guide/routes

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LoginForm,
});

const loginRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginForm,
});

const registerRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterForm,
});

const profileRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: Profile,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  profileRoute,
]);

export const router = new Router({ routeTree });

export default router;
