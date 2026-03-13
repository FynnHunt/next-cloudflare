"use client";

import { useEffect } from "react";
import { createUser } from "../lib/clientData";

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
    }
  }, []);

  return <></>;
}
