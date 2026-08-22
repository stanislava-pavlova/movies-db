"use server";

import { signIn, signOut } from "@/src/auth";

export async function googleSignInAction() {
  await signIn("google");
}

export async function signOutAction() {
  await signOut();
}
