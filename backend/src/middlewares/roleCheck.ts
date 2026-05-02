export const verifyRole = () => {
  return (req: any, res: any, next: any) => {
    const user = req.user;

    if (!user || user.role != "ADMIN") {
      return res.status(403).json({ message: "Forbidden" });
    }

    next();
  };
};