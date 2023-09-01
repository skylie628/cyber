"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { verifyJWT } = require("../dist/utils/jwt.utils");
const reIssueAccessToken = async ({ refreshToken }) => {
    const { decode } = verifyJWT(refreshToken);
    if (!decode) {
        return false;
    }
};
//# sourceMappingURL=jwt.service.js.map