import { NextFunction } from "express";

export const CatchAsncError =
    (theFunc: any) => (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(theFunc(req, res, next)).catch(next);
    }
