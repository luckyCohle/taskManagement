"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyRole = void 0;
const verifyRole = () => {
    return (req, res, next) => {
        const user = req.user;
        if (!user || user.role != "ADMIN") {
            return res.status(403).json({ message: "Forbidden" });
        }
        next();
    };
};
exports.verifyRole = verifyRole;
//# sourceMappingURL=roleCheck.js.map