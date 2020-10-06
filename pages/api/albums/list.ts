import { NextApiRequest, NextApiResponse } from "next";
import firebase, { db } from "../../../appUtils/initFirebase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET")
    return res.status(500).end({ message: "Only GET requests are accepted" });

  try {
    const argument = req.query;

    const response = await db
      .collection("albums")
      .where("creatorId", "==", argument.id)
      .get();

    const data = response.docs.map((doc) => doc.data());

    return res.status(201).json(data);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
