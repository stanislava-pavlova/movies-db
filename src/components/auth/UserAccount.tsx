"use client";

import AuthDialogTrigger from "@/src/components/auth/AuthDialogTrigger";
import UserAccountMenu from "@/src/components/auth/UserAccountMenu";

import type { User } from "next-auth";

type UserAccountProps = {
  user?: User;
};

export default function UserAccount({ user }: UserAccountProps) {
  if (user) {
    return <UserAccountMenu user={user} />;
  }

  return <AuthDialogTrigger />;
}
