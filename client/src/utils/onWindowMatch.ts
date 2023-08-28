export const onWindowMatch = () => {
  const element = document.documentElement;
  const darkQueries = window.matchMedia("prefers-color-scheme: dark");
  if (
    localStorage.theme === "dark" ||
    (!("theme" in localStorage) && darkQueries.matches)
  ) {
    element.classList.add("dark");
  } else {
    element.classList.remove("dark");
  }
  return { element };
};
