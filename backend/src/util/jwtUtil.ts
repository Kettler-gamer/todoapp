import Jwt from "jsonwebtoken";
import { JwtPayload } from "../types/jwtPayload";
import fs from "fs";

const privateKey = fs.readFileSync(__dirname.replace("\\util", "") + "\\config\\private-key.pem");
const publicKey = fs.readFileSync(__dirname.replace("\\util", "") + "\\config\\public-key.pem");

function createToken(payload: JwtPayload): string {
    return Jwt.sign(payload, privateKey, {algorithm:"RS256"});
}

function verifyToken(token: string) {
    return Jwt.verify(token,publicKey,{});
}

export default { createToken, verifyToken };