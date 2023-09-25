import express from "express";
import {
  deleteShowHandler,
  getMultipleShowsHandler,
  getShowHandler,
  updateShowHandler,
} from "../controllers/show.controller.js";
import { requireUser } from "../middlewares/requireUser.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import {
  ShowDeleteSchema,
  ShowGetSchema,
  ShowSchema,
  ShowUpdateSchema,
} from "../schemas/show.schema.js";

const router = express.Router();

router
  .route("/:id")
  .get(requireUser, validateRequest(ShowGetSchema), getShowHandler);

router.route("/").get(requireUser, getMultipleShowsHandler);

router.put(
  "/:id",
  requireUser,
  validateRequest(ShowUpdateSchema),
  updateShowHandler
);

router.delete(
  "/:id",
  requireUser,
  validateRequest(ShowDeleteSchema),
  deleteShowHandler
);

export default router;
