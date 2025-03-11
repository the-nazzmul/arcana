import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Image from "next/image";

const LoadingComponent = ({ loading }: { loading: boolean }) => {
  return (
    <AlertDialog open={loading}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            <div className="flex flex-col items-center justify-center py-10">
              <Image src="/loader.gif" height={100} width={100} alt="loader" />
            </div>
          </AlertDialogTitle>
          <AlertDialogDescription className="text-lg font-bold text-center">
            Processing..Please wait..
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default LoadingComponent;
