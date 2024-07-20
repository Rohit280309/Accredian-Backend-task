import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { userLoginHandler, userSignUpHandler } from "../controllers/auth";

const router = express.Router();

router.post("/signup", [
    body("name", "Enter a valid name").isLength({ min: 2 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isStrongPassword({ minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    await userSignUpHandler(req, res);
});

router.post("/login", [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Enter a valid password").isStrongPassword({ minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    await userLoginHandler(req, res);
})

export default router;