import { ErrorMessage } from "@/components/tools/error-message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import christianStore from "@/store/christian";
import { ChristianItem } from "@/store/christian/type";
import churchStore from "@/store/church";
import sacramentStore from "@/store/sacrament";
import { Select } from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const schema = z.object({
  church_id: z.string().uuid("Église invalide"),
  sacrament_id: z.string().uuid("Sacrament invalide"),
  createdAt: z.string().date("Date d'ajout invalide"),
});
type ChristianSacramentSchema = z.infer<typeof schema>;

export default function SacramentForm({
  selected,
}: {
  selected: ChristianItem[];
}) {
  const { getSacraments, sacramentList } = sacramentStore();
  const { getChurchs, churchList } = churchStore();
  const { createManyChristianSacrament, loading } = christianStore();
  const submit: SubmitHandler<ChristianSacramentSchema> = async (values) => {
    try {
      const realChristian = selected.filter(
        (item) =>
          !item.sacraments?.some((c) => c.sacrament_id === values.sacrament_id)
      );
      if (realChristian.length !== 0) {
        await createManyChristianSacrament({
          selected,
          church_id: values.church_id,
          sacrament_id: values.sacrament_id,
          createdAt: new Date(values.createdAt).toISOString(),
        });
      } else {
        toast.error("Ces chrétiens ont déjà ce sacrament");
      }
      reset({
        church_id: "",
        sacrament_id: "",
        createdAt: "",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<ChristianSacramentSchema>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });
  useEffect(() => {
    getSacraments();
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-4">
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
            {...register("sacrament_id")}
            className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-slate-950 placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-800 dark:bg-zinc-900 dark:ring-offset-slate-950 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300"
          >
            <option value="">Sélectionner un sacrament</option>
            {sacramentList.map((sacrament) => (
              <option key={sacrament.id} value={sacrament.id}>
                {sacrament.name}
              </option>
            ))}
          </Select>
          {errors?.sacrament_id && (
            <ErrorMessage>{errors?.sacrament_id?.message}</ErrorMessage>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <Input
            type="date"
            placeholder="Date d'ajout"
            {...register("createdAt")}
          />
          {errors?.createdAt && (
            <ErrorMessage>{errors?.createdAt?.message}</ErrorMessage>
          )}
        </div>
        <Button type="submit" disabled={loading}>
          Enregistrer
        </Button>
      </form>
    </div>
  );
}
