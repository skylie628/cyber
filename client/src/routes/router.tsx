import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { Suspense } from "react";
import ProtectedRoute from "@/components/ProtectedRoute";
import LoadingPage from "@/pages/LoadingPage";
import { getMovieGenresQuery, getTVGenresQuery } from "../queries";
import App from "../App";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SkeletonTheme } from "react-loading-skeleton";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "jotai";

export const appLoader = async (queryClient: QueryClient) => {
  return await Promise.all(
    [getMovieGenresQuery, getTVGenresQuery].map((query) =>
      queryClient.ensureQueryData(query())
    )
  );
};
const queryClient = new QueryClient();
export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <SkeletonTheme baseColor="#1c1917">
        <Provider>
          <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </Provider>
      </SkeletonTheme>
    ),
    loader: () => appLoader(queryClient),
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/profile",
        element: (
          <Suspense fallback={<LoadingPage />}>
            <ProtectedRoute>
              <div>aaaaaaaaaa</div>
            </ProtectedRoute>
          </Suspense>
        ),
      },
    ],
  },
]);
