import { NextFunction, Request, Response } from "express";
import { AnyZodObject, ZodUnion } from "zod";
const validateRequest = (schema: AnyZodObject | ZodUnion<any>) => {
  console.log("validate");
  return (rq: Request, rs: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: rq.body,
        query: rq.query,
        params: rq.params,
      });
      next();
    } catch (e: any) {
      return rs.status(400).json({
        message: "Incorrect form inputs",
        errors: e.errors,
      });
    }
  };
};
export { validateRequest };
