import { Request, Response, NextFunction } from "express";
import NodeCache from "node-cache";
import { config } from "../config/config";

const cache = new NodeCache({ stdTTL: config.cacheTimeout });

export const cacheHandler = (
  req: Request | any,
  res: Response | any,
  next: NextFunction | any
) => {
  const key = req.originalUrl;
  const cachedResponse = cache.get(key);

  if (cachedResponse) {
    return res.json(cachedResponse);
  }

  const originaleJosn = res.json;
  res.json = function (body:any) {
    cache.set(key, body);
    return originaleJosn.call(this, body);
  };
  next();
};
