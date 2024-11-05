"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Toaster } from "@/components/ui/sonner";
import authStore from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Input } from "../../ui/input";

export default function Login() {
  const { login, auth, getMe } = authStore();

  const FormSchema = z.object({
    email: z.string().email("Email invalide").min(1, "Email obligatoire"),
    password: z.string().min(6, {
      message: "Le mot de passe doit être plus de 6 caractères",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      await login(data);
      getMe();
    } catch (error) {
      console.log(error);
    }
  }

  if (auth) {
    window.location.href = "/dashboard";
  }

  useEffect(() => {
    async function getConnectedUser() {
      try {
        await getMe();
      } catch (error) {
        console.log(error);
        if (window.location.pathname !== "/") window.location.href = "/";
      }
    }
    getConnectedUser();
  }, []);

  return (
    <div className="w-full h-[100vh] bg-[#E3ECF5] flex flex-row justify-center items-center dark:bg-zinc-900">
      <Toaster richColors position="top-right" />
      <div className="flex flex-row rounded-[16px] shadow-lg overflow-hidden w-3/5 max-lg:w-4/5">
        <div className="w-1/2 max-lg:w-full bg-[#F6FAFF] px-16 py-14 flex flex-col items-center justify-center gap-5 dark:bg-zinc-800">
          <Image
            src="/image/logo.png"
            className="object-contain"
            quality={100}
            alt="logo"
            width={200}
            height={100}
          />
          <h2 className="scroll-m-20 text-slate-900 text-center text-2xl font-semibold tracking-tight dark:text-white">
            Authentification
          </h2>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="email" {...field} placeholder="Email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="password"
                          {...field}
                          placeholder="Mot de passe"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-right mt-2">
                  <Link
                    href={"/"}
                    className="text-slate-900 font-medium text-sm"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
              </div>
              <Button type="submit" className="w-full mt-2">
                Connexion
              </Button>
            </form>
          </Form>
        </div>
        <div className="w-1/2 bg-white  flex items-center justify-center max-lg:hidden">
          <Image
            src="/image/login.png"
            className="object-contain rounded-md"
            quality={100}
            alt="logo"
            width={300}
            height={300}
          />
        </div>
      </div>
    </div>
  );
}
