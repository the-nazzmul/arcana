import { createRouteHandler } from "uploadthing/next";
import { myFileRouter } from "./core";

export const maxDuration = 60;

export const { GET, POST } = createRouteHandler({
  router: myFileRouter,
});
