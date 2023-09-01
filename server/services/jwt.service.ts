const { verifyJWT } = require("../dist/utils/jwt.utils");

const reIssueAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  const { decode } = verifyJWT(refreshToken);
  if (!decode) {
    return false;
  }
};
export default reIssueAccessToken;
