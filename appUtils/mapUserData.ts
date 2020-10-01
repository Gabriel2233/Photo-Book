import { User } from "firebase";

export const mapUserData = (user: User) => {
  const { uid, email, refreshToken } = user;

  return {
    id: uid,
    email,
    token: refreshToken,
  };
};
