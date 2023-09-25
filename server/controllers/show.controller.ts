import { Request, Response } from "express";
import {
  ShowDeleteType,
  ShowGetType,
  ShowUpdateType,
  ShowType,
} from "../schemas/show.schema";
import {
  createShow,
  deleteShow,
  findShow,
  findShowOrShows,
  updateShow,
} from "../services/show.service.js";
const updateShowHandler = async (
  req: Request<ShowUpdateType["params"]>,
  res: Response
) => {
  try {
    const user = res.locals.user._id;
    const id = req.params.id;
    const update = req.body;
    let show = await findShow({ user, id });
    if (!show) {
      show = await createShow({ ...update, user, id });
      return res.send(show);
    }

    show = await updateShow({ user, id }, update, { new: true });
    return res.send(show);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};

const getShowHandler = async (
  req: Request<ShowGetType["params"]>,
  res: Response
) => {
  try {
    const user = res.locals.user._id;
    const id = req.params.id;
    const show = findShow({ user, id });
    if (!show) {
      return res.status(404).send(`Show with id ${id} not found.`);
    }
    return res.send(show);
  } catch (e: any) {
    return res.status(400).send(e.message);
  }
};
const getMultipleShowsHandler = (
  req: Request<ShowGetType["params"]>,
  res: Response
) => {
  try {
    const user = res.locals.user._id;
    const shows = findShowOrShows({ user });
    if (!shows) {
      res.status(404).send("No show found.");
    }
    res.send(shows);
  } catch (e: any) {
    res.status(400).send(e.message);
  }
};
const deleteShowHandler = async (
  req: Request<ShowDeleteType["params"]>,
  res: Response
) => {
  try {
    const user = res.locals.user._id;
    const id = req.params.id;
    const rst = await deleteShow({ user, id });
    if (rst) {
      res.send("Delete successfully.");
    } else {
      res.status(404).send("show not found");
    }
  } catch (e: any) {
    return res.status(400).send(e.message);
  }
};

export {
  updateShowHandler,
  deleteShowHandler,
  getShowHandler,
  getMultipleShowsHandler,
};
