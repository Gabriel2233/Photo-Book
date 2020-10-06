import { NextApiRequest, NextApiResponse } from "next";
import firebase, { db } from "../../../appUtils/initFirebase";

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

    const album: firebase.firestore.DocumentData = data.docs.map((doc) =>
      doc.data()
    )[0];

    const update = await db

      .collection("albums")
      .doc(body.title)
      .update({
        title: album.title,
        creatorId: album.creatorId,
        photos: [...album.photos, body.imageUrl],
      });

    console.log(update);

    return res.status(201).json({ update });
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
