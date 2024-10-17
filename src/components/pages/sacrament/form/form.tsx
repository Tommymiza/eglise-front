"use client";
import { ErrorMessage } from "@/components/tools/error-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import sacramentStore from "@/store/sacrament";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, { message: "Nom invalide" }),
});
type SacramentSchema = z.infer<typeof schema>;

export default function AddFormSacrament() {
  const {
    cancelEdit,
    sacrament,
    createSacrament,
    updateSacrament,
    loading,
    getSacraments,
  } = sacramentStore();

  const submit: SubmitHandler<SacramentSchema> = async (values) => {
    try {
      if (sacrament) {
        await updateSacrament({ id: sacrament.id, sacrament: values });
      } else {
        await createSacrament(values);
      }
      getSacraments();
      reset({
        name: "",
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
  } = useForm<SacramentSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  useEffect(() => {
    if (sacrament) {
      reset(sacrament);
    }
  }, [sacrament]);

  return (
    <div className="p-4 relative">
      <h1 className="text-xl font-bold text-center">
        {sacrament ? "Modifier" : "Ajouter"} un sacrament
      </h1>
      <form onSubmit={handleSubmit(submit)} className="p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Input type="text" placeholder="Nom" {...register("name")} />
          {errors?.name && <ErrorMessage>{errors?.name?.message}</ErrorMessage>}
        </div>
        <Button type="submit" disabled={loading}>
          Enregistrer
        </Button>
      </form>
    </div>
  );
}
