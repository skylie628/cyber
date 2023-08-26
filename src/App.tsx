import LoadingBar from "react-top-loading-bar";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import { atom, useAtom } from "jotai";
export const mediaTypeAtom = atom<"movie" | "tv">("movie");
export const currentURLPathAtom = atom<string>("home");
export const shouldDropdownDisplayAtom = atom<boolean>(false);
export const hasQueryFiltersAtom = atom<boolean>(false);
export const loadingBarProgress = atom<number>(0);
export const themeAtom = atom<string>(localStorage.getItem("theme") ?? "dark");
function App() {
  const [progress, setProgress] = useAtom(loadingBarProgress);
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
    </div>
  );
}

export default App;
