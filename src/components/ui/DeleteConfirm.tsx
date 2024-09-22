import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function DeleteConfirm({ fn }: { fn: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={"ghost"}
          className="p-2 w-[40px] h-[40px] text-red-500 hover:text-red-600"
        >
          <Trash2 size={20} />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Etes-vous sûre de vouloir supprimer ?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Cela supprimera définitivement vos
            données de nos serveurs.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Button variant={"destructive"}>Annuler</Button>
          </AlertDialogCancel>
          <AlertDialogAction onClick={fn}>
            <Button variant={"primary"}>Confirmer</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
