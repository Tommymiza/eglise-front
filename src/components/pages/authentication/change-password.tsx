"use client";
import { ErrorMessage } from "@/components/tools/error-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import authStore from "@/store/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z
  .object({
    password: z.string().min(6, "6 caractères minimum"),
    c_password: z.string(),
  })
  .refine(({ password, c_password }) => password === c_password, {
    message: "Les mot de passe sont différentes",
    path: ["c_password"],
  });
type UserSchema = z.infer<typeof schema>;

export default function ChangePassword() {
  const { loading, updatePassword } = authStore();

  const submit: SubmitHandler<UserSchema> = async (values) => {
    try {
      await updatePassword(values);
      reset({
        password: "",
        c_password: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<UserSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  return (
    <div className="p-4 relative">
      <h1 className="text-xl font-bold text-center">
        Modifier le mot de passe
      </h1>
      <form onSubmit={handleSubmit(submit)} className="p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Input
            type="password"
            placeholder="Nouveau mot de passe"
            {...register("password")}
          />
          {errors?.password && (
            <ErrorMessage>{errors?.password?.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Input
            type="password"
            placeholder="Confirmer le mot de passe"
            {...register("c_password")}
          />
          {errors?.c_password && (
            <ErrorMessage>{errors?.c_password?.message}</ErrorMessage>
          )}
        </div>
        <Button type="submit" disabled={loading}>
          Enregistrer
        </Button>
      </form>
    </div>
  );
}
