import express, { Request, Response } from "express";
import { body, validationResult } from "express-validator";
import { authMiddleware, AuthRequest } from "../middleware/authMiddleware";
import { addReferralHandler, ReferHandler } from "../controllers/refer";

const router = express.Router();

router.post("/refer", [
    body("yourName", "Enter your name").isLength({ min: 2 }),
    body("yourEmail", "Enter valid email").isEmail(),
    body("friendName", "Enter your friend name").isLength({ min: 2 }),
    body("friendEmail", "Enter your friend email").isEmail(),
    body("course", "Provide a course name").isLength({ min: 2 }),
], authMiddleware, async (req: AuthRequest, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    await ReferHandler(req, res);
});

router.post("/addReferral", [
    body("course", "Enter course").isLength({ min:2 }),
    body("id", "Enter id").isNumeric(),
], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    await addReferralHandler(req, res);
})


export default router;