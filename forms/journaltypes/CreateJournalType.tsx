
import { createJournalType } from "@/services/journaltypes";
import { useFormik } from "formik";
import { JournalTypeSchema } from "@/validation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "react-hot-toast";
import { Loader2, Settings2, Plus, X } from "lucide-react"; // Added X to import
import useAxiosAuth from "@/hooks/authentication/useAxiosAuth";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

interface CreateJournalTypeProps {
  rolePrefix?: string;
  onSuccess?: () => void;
}

export default function CreateJournalType({
  rolePrefix = "finance",
  onSuccess,
  className,
  onClose,
}: CreateJournalTypeProps & { className?: string; onClose?: () => void }) {
  const header = useAxiosAuth();
  const router = useRouter();
  const queryClient = useQueryClient();

  const primaryColor = rolePrefix === "director" ? "#D0402B" : "#045138";

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      is_active: true,
    },
    validationSchema: JournalTypeSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        await createJournalType(values, header);
        toast.success("Journal type defined successfully");
        window.location.reload();
        queryClient.invalidateQueries({ queryKey: ["journal_types"] });
        resetForm();
        router.refresh();
        if (onSuccess) onSuccess();
      } catch (error: any) {
        toast.error(
          error?.response?.data?.message || "Failed to define journal type",
        );
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Card
      className={`w-full border-black/5 shadow-2xl rounded-xl overflow-hidden bg-white/80 backdrop-blur-xl ${className}`}
    >
      <CardHeader className="p-8 border-b border-black/5 bg-gradient-to-r from-white to-gray-50/50">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center text-white shadow-lg"
              style={{
                backgroundColor: primaryColor,
                boxShadow: `0 10px 15px -3px ${primaryColor}4D`,
              }}
            >
              <Settings2 className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold text-black tracking-tight">
                New Journal Type
              </CardTitle>
              <CardDescription className="text-black/50 font-medium text-sm mt-1">
                Ledger Configuration
              </CardDescription>
            </div>
          </div>
          {onClose && (
            <Button
              type="button"
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="hover:bg-red-50 hover:text-red-500 rounded-full"
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-8">
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-semibold uppercase tracking-widest text-black/40 ml-1 flex items-center gap-1"
              >
                Type Name{" "}
                <span className="text-red-500 text-xs font-bold">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                placeholder="e.g., Accrual, Payment"
                className="h-14 rounded-md border-black/5 bg-black/5 focus:bg-white transition-all font-medium px-5"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest ml-1">
                  {formik.errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="description"
                className="text-sm font-bold uppercase tracking-widest text-black/40 ml-1 flex items-center gap-1"
              >
                Description{" "}
                <span className="text-red-500 text-xs font-bold">*</span>
              </Label>
              <Textarea
                id="description"
                name="description"
                required
                placeholder="Describe this journal type..."
                className="min-h-[120px] rounded-md border-black/5 bg-black/5 focus:bg-white transition-all font-medium p-5"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.description}
              />
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-orange-50/30 rounded-md border border-black/5">
            <input
              id="is_active"
              name="is_active"
              type="checkbox"
              className="w-5 h-5 rounded-lg border-black/5 text-corporate-primary focus:ring-corporate-primary/20"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              checked={formik.values.is_active}
            />
            <Label
              htmlFor="is_active"
              className="text-sm font-bold text-black"
            >
              Enable for Operations
            </Label>
          </div>

          <div className="pt-6">
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              className="w-full h-16 text-white rounded-md font-bold text-lg transition-all shadow-xl active:scale-[0.98] group"
              style={{
                backgroundColor: primaryColor,
                boxShadow: `0 10px 20px -5px ${primaryColor}4D`,
              }}
            >
              {formik.isSubmitting ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <div className="flex items-center gap-3">
                  <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                  Define Journal Type
                </div>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
