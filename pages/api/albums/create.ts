import { NextApiRequest, NextApiResponse } from "next";
import firebase, { db } from "../../../appUtils/initFirebase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST")
    return res.status(500).end({ message: "Only POST requests are accepted." });

  try {
    const body = JSON.parse(req.body);

    await db.collection("albums").add({
      title: body.title,
      photos: [],
      creatorId: body.creatorId,
    });

    return res.status(201).json({});
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
