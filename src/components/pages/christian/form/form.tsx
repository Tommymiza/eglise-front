"use client";
import { ErrorMessage } from "@/components/tools/error-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import christianStore from "@/store/christian";
import churchStore from "@/store/church";
import { Select } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import ChipSacrament from "./chip-sacrament";

const schema = z.object({
  name: z.string().trim().min(1, { message: "Nom invalide" }),
  surname: z.string().trim(),
  genre: z.enum(["H", "F"], {
    message: "Genre invalide",
  }),
  birthdate: z.string().date("Date de naissance invalide"),
  church_id: z.string().optional(),
  apv_id: z.string().uuid("APV invalide"),
});
type ChristianSchema = z.infer<typeof schema>;

export default function AddFormChristian() {
  const {
    cancelEdit,
    christian,
    createChristian,
    updateChristian,
    loading,
    getChristians,
  } = christianStore();
  const { churchList } = churchStore();

  const submit: SubmitHandler<ChristianSchema> = async (values) => {
    try {
      const data = {
        name: values.name,
        surname: values.surname,
        genre: values.genre,
        birthdate: new Date(values.birthdate).toISOString(),
        apv_id: values.apv_id,
      };
      if (christian) {
        await updateChristian({ id: christian.id, christian: data });
      } else {
        await createChristian(data);
      }
      getChristians();
      reset({
        name: "",
        surname: "",
        genre: "H",
        birthdate: "",
        church_id: "",
        apv_id: "",
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
    watch,
    setValue,
  } = useForm<ChristianSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  useEffect(() => {
    if (christian) {
      reset({
        ...christian,
        genre: christian.genre === "H" ? "H" : "F",
        birthdate: format(new Date(christian.birthdate), "yyyy-MM-dd"),
        church_id: christian.apv.church_id,
      });
    }
  }, [christian]);
  const churchId = watch("church_id");
  return (
    <div className="p-4 relative">
      <h1 className="text-xl font-bold text-center">
        {christian ? "Modifier" : "Ajouter"} un chrétien
      </h1>
      <form onSubmit={handleSubmit(submit)} className="p-4 flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <Input type="text" placeholder="Nom" {...register("name")} />
          {errors?.name && <ErrorMessage>{errors?.name?.message}</ErrorMessage>}
        </div>
        <div className="flex flex-col gap-2">
          <Input type="text" placeholder="Prénom" {...register("surname")} />
          {errors?.surname && (
            <ErrorMessage>{errors?.surname?.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2 border dark:border-zinc-800 border-slate-200 rounded-md p-4">
          <label htmlFor="genre" className="dark:text-slate-400 text-zinc-500">
            Genre
          </label>
          <RadioGroup
            id="genre"
            value={watch("genre")}
            className="flex"
            onValueChange={(value: "H" | "F") => {
              setValue("genre", value);
            }}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="H" id="option-one" />
              <Label htmlFor="option-one">Homme</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="F" id="option-two" />
              <Label htmlFor="option-two">Femme</Label>
            </div>
          </RadioGroup>
          {errors?.genre && (
            <ErrorMessage>{errors?.genre?.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Input
            type="date"
            placeholder="Date de naissance"
            {...register("birthdate")}
          />
          {errors?.birthdate && (
            <ErrorMessage>{errors?.birthdate?.message}</ErrorMessage>
          )}
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
        <div className="flex flex-col gap-2">
          <Select
            {...register("apv_id")}
            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900 dark:ring-offset-slate-950 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
          >
            <option value="">Sélectionner un APV</option>
            {churchList
              .find((c) => c.id === churchId)
              ?.apvs?.map((apv) => (
                <option key={apv.id} value={apv.id}>
                  {apv.name}
                </option>
              ))}
          </Select>
          {errors?.apv_id && (
            <ErrorMessage>{errors?.apv_id?.message}</ErrorMessage>
          )}
        </div>
        {christian && christian.sacraments?.length > 0 && (
          <div className="flex flex-row gap-2 flex-wrap">
            {christian.sacraments.map((i) => (
              <ChipSacrament key={i.id} item={i} />
            ))}
          </div>
        )}
        <Button type="submit" disabled={loading}>
          Enregistrer
        </Button>
      </form>
    </div>
  );
}
