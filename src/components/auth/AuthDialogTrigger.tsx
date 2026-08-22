"use client";

import { User } from "lucide-react";
import { useTranslations } from "next-intl";

import { googleSignInAction } from "@/src/actions/auth";
import GoogleSignInButton from "@/src/components/auth/GoogleSignInButton";
import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog";

export default function AuthDialogTrigger() {
  const t = useTranslations("auth");

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          aria-label={t("openAuthDialog")}
          className="rounded-full"
        >
          <User className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t("signInTitle")}</DialogTitle>
          <DialogDescription>{t("signInDescription")}</DialogDescription>
        </DialogHeader>
        <form action={googleSignInAction}>
          <GoogleSignInButton label={t("signInWithGoogle")} />
        </form>
      </DialogContent>
    </Dialog>
  );
}
