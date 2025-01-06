import { NextFunction, Response } from "express";
import { AuthenticationRequest } from "../shared/interfaces";
import { ForbiddenError } from "../shared/utils/app-error";
export const authorize = (allowedUserType: string) => {
    return async (
        req: AuthenticationRequest,
        res: Response,
        next: NextFunction
    ) => {
        if (req?.user?.type == allowedUserType) {
            return next();
        }
        throw new ForbiddenError(`${allowedUserType} does not have the required permission`);

    };
};
