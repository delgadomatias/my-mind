import { toast } from "sonner";
import Swal, { SweetAlertOptions } from "sweetalert2";

interface AskOrCancelAlert {
  callback: () => void;
  options: SweetAlertOptions;
}

export class Alerts {
  static async askOrCancel({ callback, options }: AskOrCancelAlert) {
    const askOrCancelAlert = await Swal.fire(options);
    if (askOrCancelAlert.isConfirmed) {
      callback();
      toast.success("Note deleted successfully", {
        duration: 1000,
      });
    }
  }
}
