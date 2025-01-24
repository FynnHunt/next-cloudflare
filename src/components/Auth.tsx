"use client";

import { useEffect } from "react";
import { createUser } from "../app/actions/userActions";

export default function Auth() {
  useEffect(() => {
    let userId = window.localStorage.getItem("userId");

    if (!userId) {
      const uuid = crypto.randomUUID();
      window.localStorage.setItem("userId", uuid);
      userId = uuid;
      const createNewUser = async () => {
        await createUser(uuid);
      };
      createNewUser();
      window.location.reload();
    }
  }, []);

  return <></>;
}
