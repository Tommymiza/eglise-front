"use client";
import { ErrorMessage } from "@/components/tools/error-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import apvStore from "@/store/apv";
import churchStore from "@/store/church";
import { Select } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1, { message: "Nom invalide" }),
  church_id: z.string().uuid("Eglise invalide"),
});
type ApvSchema = z.infer<typeof schema>;

export default function AddFormApv() {
  const { cancelEdit, apv, createApv, updateApv, loading, getApvs } =
    apvStore();
  const { churchList } = churchStore();

  const submit: SubmitHandler<ApvSchema> = async (values) => {
    try {
      if (apv) {
        await updateApv({ id: apv.id, apv: values });
      } else {
        await createApv(values);
      }
      getApvs({
        include: {
          church: true,
        },
      });
      reset({
        name: "",
        church_id: "",
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
  } = useForm<ApvSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  useEffect(() => {
    if (apv) {
      reset(apv);
    }
  }, [apv]);

  return (
    <div className="p-4 relative">
      <h1 className="text-xl font-bold text-center">
        {apv ? "Modifier" : "Ajouter"} un APV
      </h1>
      <form onSubmit={handleSubmit(submit)} className="p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Input type="text" placeholder="Nom" {...register("name")} />
          {errors?.name && <ErrorMessage>{errors?.name?.message}</ErrorMessage>}
        </div>
        <div className="flex flex-col gap-2">
          <Select
            {...register("church_id")}
            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900 dark:ring-offset-slate-950 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
          >
            <option value="">Sélectionner une église</option>
            {churchList.map((church) => (
              <option key={church.id} value={church.id}>
                {church.name}
              </option>
            ))}
          </Select>
          {errors?.church_id && (
            <ErrorMessage>{errors?.church_id?.message}</ErrorMessage>
          )}
        </div>
        <Button type="submit" disabled={loading}>
          Enregistrer
        </Button>
      </form>
    </div>
  );
}
