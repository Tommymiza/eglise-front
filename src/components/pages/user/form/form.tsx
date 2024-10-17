"use client";
import { ErrorMessage } from "@/components/tools/error-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import userStore from "@/store/user";
import { Select } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, { message: "Nom invalide" }),
  email: z.string().email({ message: "Email invalide" }),
  role: z.enum(["ADMIN", "EVEQUE", "PRETRE", "APV"], {
    message: "Rôle invalide",
  }),
});
type UserSchema = z.infer<typeof schema>;

export default function AddFormUser() {
  const { cancelEdit, user, createUser, updateUser, loading, getUsers } =
    userStore();

  const submit: SubmitHandler<UserSchema> = async (values) => {
    try {
      if (user) {
        await updateUser({ id: user.id, user: values });
      } else {
        await createUser(values);
      }
      getUsers();
      reset({
        name: "",
        email: "",
        role: undefined,
      });
      cancelEdit();
    } catch (error) {
      console.log(error);
    }
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<UserSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  useEffect(() => {
    if (user) {
      reset(user);
    }
  }, [user]);

  return (
    <div className="p-4 relative">
      <h1 className="text-xl font-bold text-center">
        {user ? "Ajouter" : "Modifier"} un utilisateur
      </h1>
      <form onSubmit={handleSubmit(submit)} className="p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Input type="text" placeholder="Nom" {...register("name")} />
          {errors?.name && <ErrorMessage>{errors?.name?.message}</ErrorMessage>}
        </div>
        <div className="flex flex-col gap-2">
          <Input type="email" placeholder="Email" {...register("email")} />
          {errors?.email && (
            <ErrorMessage>{errors?.email?.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Select
            {...register("role")}
            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900 dark:ring-offset-slate-950 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
          >
            <option value="">Rôle...</option>
            <option value="ADMIN">ADMIN</option>
            <option value="EVEQUE">EVEQUE</option>
            <option value="PRETRE">PRETRE</option>
            <option value="APV">APV</option>
          </Select>
          {errors?.role && <ErrorMessage>{errors?.role?.message}</ErrorMessage>}
        </div>
        <Button type="submit" disabled={loading}>
          Enregistrer
        </Button>
      </form>
    </div>
  );
}
