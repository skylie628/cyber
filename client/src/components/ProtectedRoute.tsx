import { useGetUserQuery } from "@/features/profile";
import AuthPage from "@/pages/AuthPage";
import LoadingPage from "@/pages/LoadingPage";
import Wrapper from "./handling/Wrapper";
interface ProtectedRouteProps {
  children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { data } = useGetUserQuery();
  return data ? children : null;
};
export default (props: ProtectedRouteProps) => (
  <Wrapper suspenseComponent={<LoadingPage />} errorComponent={AuthPage}>
    <ProtectedRoute {...props} />
    <AuthPage></AuthPage>
  </Wrapper>
);
