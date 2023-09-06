import { verifyJWT } from "../utils/jwt.utils";
const reIssueAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  const { decoded } = verifyJWT(refreshToken);
  if (!decoded) {
    return false;
  }
};
export { reIssueAccessToken };
