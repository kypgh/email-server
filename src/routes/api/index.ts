import { RouteConfig, RouteHandler } from "utils/folderRouter";
import zod from "zod";

const TestSchema = zod.object({
  name: zod.string(),
  age: zod.number({ coerce: true }),
});

export const GET: RouteHandler = async (req, res) => {
  // this parse will throw a ZodError if invalid
  // that error is handled by the defaultErrorHandler
  const values = TestSchema.parse(req.query);

  res.status(200).json({ message: "Server live and running." });
};

const config: RouteConfig = {
  middleware: {
    all: [
      (req, res, next) => {
        console.log("All middleware");
        next();
      },
    ],
    get: [
      (req, res, next) => {
        console.log("GET middleware");
        next();
      },
    ],
    // post, put, patch, delete
  },
};

export default config;
