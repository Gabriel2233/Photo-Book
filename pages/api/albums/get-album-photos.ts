import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../appUtils/initFirebase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET")
    return res.status(500).end({ message: "Only GET requests are accepted" });

  try {
    const body = req.query;

    const response = await db
      .collection("albums")
      .where("creatorId", "==", body.id)
      .where("title", "==", body.title)
      .get();

    const updatedAlbum = response.docs.map((doc) => doc.data())[0];

    return res.status(201).json(updatedAlbum);
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
