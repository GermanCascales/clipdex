import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("./layouts/app.tsx", [index("./routes/home.tsx")]),
  layout("./layouts/auth.tsx", [
    route("login", "./routes/login.tsx"),
    route("logout", "./routes/logout.tsx"),
  ]),
] satisfies RouteConfig;
