import { RouteHandler } from "utils/folderRouter";

export const GET: RouteHandler = (req, res) => {
  res.status(200).json({ message: "Server live and running." });
};