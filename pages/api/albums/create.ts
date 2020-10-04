import { NextApiRequest, NextApiResponse } from "next";
import firebase from "../../../appUtils/initFirebase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const title = req.body;

    await firebase.firestore().collection("albums").add({
      title,
      photos: [],
    });

    return res.status(201).json({ message: "ok" });
  } catch (error) {
    return res.json({ message: error.message });
  }
};
