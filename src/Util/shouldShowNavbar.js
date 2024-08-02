export function shouldShowNavbar(currentPath, routes, userRole) {
  if (!userRole) userRole = "ROLE_CUSTOMER";
  // Replace dynamic segments with a regex that matches any value
  // const pathToRegex = (path) =>
  //   new RegExp("^" + path.replace(/:\w+/g, "\\w+") + "$");
  const pathToRegex = (path) =>
    new RegExp("^" + path.replace(/:\w+/g, "[^/]+") + "$");
  return routes.some(
    (route) =>
      (route.role === userRole || userRole == "ROLE_ADMIN") &&
      pathToRegex(route.path).test(currentPath)
  );
}
