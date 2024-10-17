"use client";
import { ErrorMessage } from "@/components/tools/error-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import churchStore from "@/store/church";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, { message: "Nom invalide" }),
  diocese: z.string().trim().min(1, { message: "Diocèse invalide" }),
  district: z.string().trim().min(1, { message: "District invalide" }),
});
type ChurchSchema = z.infer<typeof schema>;

export default function AddFormChurch() {
  const {
    cancelEdit,
    church,
    createChurch,
    updateChurch,
    loading,
    getChurchs,
  } = churchStore();

  const submit: SubmitHandler<ChurchSchema> = async (values) => {
    try {
      if (church) {
        await updateChurch({ id: church.id, church: values });
      } else {
        await createChurch(values);
      }
      getChurchs();
      reset({
        name: "",
        diocese: "",
        district: "",
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
  } = useForm<ChurchSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  useEffect(() => {
    if (church) {
      reset(church);
    }
  }, [church]);

  return (
    <div className="p-4 relative">
      <h1 className="text-xl font-bold text-center">
        {church ? "Modifier" : "Ajouter"} une église
      </h1>
      <form onSubmit={handleSubmit(submit)} className="p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Input type="text" placeholder="Nom" {...register("name")} />
          {errors?.name && <ErrorMessage>{errors?.name?.message}</ErrorMessage>}
        </div>
        <div className="flex flex-col gap-2">
          <Input type="text" placeholder="Diocèse" {...register("diocese")} />
          {errors?.diocese && (
            <ErrorMessage>{errors?.diocese?.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Input type="text" placeholder="District" {...register("district")} />
          {errors?.district && (
            <ErrorMessage>{errors?.district?.message}</ErrorMessage>
          )}
        </div>

        <Button type="submit" disabled={loading}>
          Enregistrer
        </Button>
      </form>
    </div>
  );
}
