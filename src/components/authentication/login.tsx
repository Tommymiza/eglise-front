"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import authStore from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "../ui/input";

export default function Login() {
  const router = useRouter();
  const { login, check } = authStore();

  const FormSchema = z.object({
    email: z.string().min(2, {
      message: "Nom d'utilisateur doit être plus de 2 caractères",
    }),
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
      await check();
    } catch (error) {
      toast.error("E-mail ou mot de passe incorrect");
    }
  }
  return (
    <div className="w-full h-[100vh] bg-[#E3ECF5] flex flex-row justify-center items-center">
      <div className="flex flex-row rounded-[16px] shadow-lg overflow-hidden w-3/5">
        <div className="w-1/2 bg-[#F6FAFF] px-16 py-14 flex flex-col items-center justify-center gap-5">
          <Image
            src="/image/digitEformLogo.png"
            className="object-contain"
            quality={100}
            alt="logo"
            width={200}
            height={100}
          />
          <h2 className="scroll-m-20 text-[#1B204A] text-center text-2xl font-semibold tracking-tight">
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
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
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
                      <FormLabel>Mot de passe</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="text-right">
                  <Link
                    href={"/compte/forgotpassword"}
                    className="text-[#2A9DDE] font-medium text-sm"
                  >
                    Mot de passe oublié ?
                  </Link>
                </div>
              </div>
              <Button type="submit" variant="primary" className="w-full mt-2">
                Connexion
              </Button>
              <div className="text-center text-[12px]">
                Vous n&apos;avez pas encore un compte&nbsp;?&nbsp;
                <Link
                  href={"/compte/newcompte"}
                  className="text-[#2A9DDE] font-medium underline"
                >
                  Créer
                </Link>
              </div>
            </form>
          </Form>
        </div>
        <div className="w-1/2 bg-white  flex items-center justify-center">
          <Image
            src="/image/camoi.png"
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
