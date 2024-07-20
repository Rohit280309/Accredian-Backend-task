import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import prisma from "../config/prisma";
import { sendMail } from "../../services/email.service";

export const ReferHandler = async (req: AuthRequest, res: Response) => {
  try {
    
    const { yourName, yourEmail, friendName, friendEmail, friendPhone, course } = req.body;

    const referral = await prisma.referral.create({
      data: {
        referrerName: yourName,
        referrerEmail: yourEmail,
        referredName: friendName,
        referredEmail: friendEmail,
        course: course,
        friendPhone: friendPhone | 0,
        status: "PENDING"
      }
    });

    const mail = await sendMail({
      email: friendEmail,
      type: "RefSend",
      id: referral.id,
      course: course
    });

    await prisma.referral.update({
      where: {
        id: referral.id
      },
      data: {
        status: "SENT"
      }
    });

    res.status(200).json({ success: true, message: "Referral send" })

  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
}

export const addReferralHandler = async (req: Request, res: Response) => {
  try {
    
    const { course, id } = req.body;

    const referral = await prisma.referral.update({
      where: {
        id: parseInt(id),
        course: course
      },
      data: {
        status: "COMPLETED"
      }
    });

    return res.status(200).json({ success: true, message: "Referral Added" });

  } catch (error: any) {
    console.log(error);
    return res.status(500).json({ error: error });
  }
}