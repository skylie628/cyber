import LoadingBar from "react-top-loading-bar";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import { onWindowMatch } from "./utils/onWindowMatch";
import ButtonComponent from "./components/generic/ButtonComponent";
import Header from "./components/Header";
import { atom, useAtom } from "jotai";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { BiArrowFromBottom } from "react-icons/bi";
export const mediaTypeAtom = atom<"movie" | "tv">("movie");
export const currentURLPathAtom = atom<string>("home");
export const shouldDropdownDisplayAtom = atom<boolean>(false);
export const hasQueryFiltersAtom = atom<boolean>(false);
export const loadingBarProgress = atom<number>(0);
import { useAutoAnimate } from "@formkit/auto-animate/react";
export const themeAtom = atom<string>(localStorage.getItem("theme") ?? "dark");
function App() {
  const [progress, setProgress] = useAtom(loadingBarProgress);
  const [theme] = useAtom(themeAtom);
  const [animationParentRef] = useAutoAnimate();
  const { element } = onWindowMatch();
  const [isVisible, setIsVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    switch (theme) {
      case "dark":
        element.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        element.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
      case "default":
        localStorage.removeItem("theme");
        break;
    }
  }, [theme]);
  return (
    <div className="bg-slate-200 dark:bg-stone-900 min-h-screen min-w-[300px] w-screen flex flex-col z-0 ">
      <LoadingBar
        height={4}
        color="#292524"
        progress={progress}
        onLoaderFinished={() => {
          setProgress(0);
        }}
        loaderSpeed={1000}
      />
      <Toaster
        position="top-right"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          success: {
            className: "tracking-wider  font-poppins font-bold shadow-xl ",
            duration: 5000,
          },
          error: {
            className: "tracking-wider  font-poppins font-bold shadow-xl",
            duration: 5000,
            style: {
              background: "#e7e5e4",
              color: "#991b1b",
            },
          },
        }}
      />
      <div className="sticky top-0 w-full z-30 flex flex-col items-center">
        <Header />
      </div>
      <div
        className="relative w-full flex justify-center items-center grow"
        ref={animationParentRef}
      >
        <Outlet />
      </div>

      <ButtonComponent
        type="button"
        onClick={scrollToTop}
        className={`z-40 bg-green-400 fixed bottom-16 max-w-[10rem] right-16 hover:bg-green-500 focus:ring-green-500 inline-flex items-center rounded-full p-3 text- shadow-md transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      >
        <BiArrowFromBottom className="h-6 w-6" aria-hidden="true" />
      </ButtonComponent>
    </div>
  );
}

export default App;
