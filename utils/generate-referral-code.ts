import { v4 as uuid } from "uuid";
export const generateReferalCode = () =>
{
    return uuid().replace(/-/g, "").substr(0, 6);
};
