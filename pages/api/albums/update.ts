import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../appUtils/initFirebase";

interface Album {
  creatorId: string;
  photos: Array<string>;
  title: string;
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PUT")
    return res.status(500).end({ message: "Only PUT requests are accepted" });

  try {
    const body = JSON.parse(req.body);

    const data = await db
      .collection("albums")
      .where("title", "==", body.title)
      .get();

    const albumId = data.docs.map((doc) => doc.id)[0];

    const albumData = data.docs.map((doc) => doc.data())[0];

    await db
      .collection("albums")
      .doc(albumId)
      .update({
        title: albumData.title,
        photos: [...albumData.photos, body.imageUrl],
        creatorId: albumData.creatorId,
      });

    const response = await db.collection("albums").doc(albumId).get();

    const updatedAlbum = response.data();

    return res.status(201).json({ updatedAlbum });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
