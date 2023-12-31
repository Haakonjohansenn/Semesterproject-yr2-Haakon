import { Router, Route, RootRoute } from "@tanstack/react-router";
import Profile from "./components/profile";
import Root from "./App";
import LoginForm from "./components/login";
import RegisterForm from "./components/register";
import HomePage from "./pages/Home";
import CreateListing from "./components/create-listing";
import ListingItem from "./components/listingItem";

const rootRoute = new RootRoute({
  component: Root,
});

// NOTE: @see https://tanstack.com/router/v1/docs/guide/routes

const indexRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
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

const createListingRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/listing",
  component: CreateListing,
});

const listingItemRoute = new Route({
  getParentRoute: () => rootRoute,
  path: "/listingitem/$listingId",
  component: ListingItem,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  profileRoute,
  createListingRoute,
  listingItemRoute,
]);

export const router = new Router({ routeTree });

export default router;
