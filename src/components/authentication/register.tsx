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
import { Input } from "@/components/ui/input";
import authStore from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function Newcompte() {
  const router = useRouter();
  const { register } = authStore();
  const FormSchema = z
    .object({
      name: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
      email: z.string().email("Veuillez entrer un e-mail valide"),
      password: z.string(),
      c_password: z.string(),
    })
    .refine((data) => data.password === data.c_password, {
      message: "Les mots de passe ne correspondent pas",
      path: ["c_password"],
    });
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      c_password: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      console.log(data);
      await register(data);
      router.push("/");
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  }
  return (
    <div className="w-full h-[100vh] bg-[#E3ECF5] flex flex-row justify-center items-center">
      <div className="flex flex-row rounded-[16px] shadow-lg overflow-hidden w-3/5">
        <div className="w-1/2 bg-[#F6FAFF]  py-14 flex flex-col items-center justify-center gap-4">
          <Image
            src="/image/digitEformLogo.png"
            className="object-contain"
            quality={100}
            alt="logo"
            width={200}
            height={100}
          />
          <div>
            <h2 className="scroll-m-20 text-[#1B204A] text-center text-[20px] font-semibold tracking-tight">
              Faites nous savoir qui vous-êtes?
            </h2>
            <p className="text-[#648897] text-[12px] font-medium">
              Veuillez remplir le formulaire suivant si vous n’avez pas de
              compte
            </p>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full flex flex-col px-16 gap-1"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nom</FormLabel>
                    <FormControl>
                      <Input type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
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
                <FormField
                  control={form.control}
                  name="c_password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmer mot de passe</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type="submit" variant="primary" className="w-full mt-2">
                Envoyer un mail
              </Button>
              <div className="text-center text-[12px]">
                <Link href={"/"} className="text-[#2A9DDE] font-medium">
                  J’ai déjà un compte
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
