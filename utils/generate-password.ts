import crypto from "crypto";

export function generatePassword(password: string)
{
    const salt = crypto.randomBytes(32).toString("hex");
    const genHash = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
    return {
        salt,
        hash: genHash
    };
}

export function validatePassword(password: string, hash: string, salt: string): boolean
{
    const hashVerify = crypto.pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
    return hash === hashVerify;
}
