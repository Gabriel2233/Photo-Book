import { NextApiRequest, NextApiResponse } from "next";
import firebase from "../../../appUtils/initFirebase";

import { firestore } from "firebase";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const response = await firebase.firestore().collection("albums").get();

    const data = response.forEach((doc) => doc.id);

    return res.json({ data });
  } catch (error) {
    return res.json({ message: error.message });
  }
};
