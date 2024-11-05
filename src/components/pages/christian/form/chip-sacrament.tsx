import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import christianStore from "@/store/christian";
import { ChristianSacrament } from "@/store/christian/type";
import { format } from "date-fns";
import { X } from "lucide-react";

export default function ChipSacrament({ item }: { item: ChristianSacrament }) {
  const { deleteSacrament, getChristian, getChristians } = christianStore();
  const handleDelete = async () => {
    try {
      await deleteSacrament(item.id);
      getChristian(item.christian_id, {
        include: {
          apv: true,
          sacraments: {
            include: {
              sacrament: true,
            },
          },
        },
      });
      getChristians({
        include: {
          apv: true,
          sacraments: true,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Tooltip>
      <TooltipTrigger>
        <div className="pl-3 pr-2 py-2 flex flex-row items-center gap-1 relative font-bold bg-zinc-900 text-white dark:bg-slate-50 dark:text-black rounded-[20px] text-sm">
          <span>{item?.sacrament?.name}</span>
          <Button
            size={"icon"}
            variant={"ghost"}
            className="p-0 w-6 h-6 rounded-full"
            type="button"
            onClick={handleDelete}
          >
            <X className="w-4 h4" />
          </Button>
        </div>
      </TooltipTrigger>
      <TooltipContent>
        <p>{item.createdAt && format(item.createdAt, "dd/MM/yyyy")}</p>
      </TooltipContent>
    </Tooltip>
  );
}
