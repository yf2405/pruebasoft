import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Save, Facebook, Twitter, Instagram } from "lucide-react";
import useCandidateStore from "@/api/candidates";

export default function ComplementaryData() {
  const { formData, addCandidate } = useCandidateStore();

  const handleSave = async () => {
    try {
      await addCandidate(formData);
      alert("Información guardada exitosamente");
    } catch (error) {
      console.error("Error al guardar la información:", error);
      alert("Ocurrió un error al guardar la información.");
    }
  };
  return (
    <div className="flex justify-center items-center py-9 bg-gray-50">
      <div className="w-full max-w-[1118px] p-6 bg-white rounded-lg shadow-md">
        {/* Form Content */}
        <div className="space-y-8">
          <div className="flex flex-wrap items-center gap-4">
            <h2 className="text-blue-900 text-lg font-medium">
              Datos complementarios
            </h2>
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-700 rounded-full font-normal"
            >
              Opcional
            </Badge>
          </div>

          <div className="space-y-6">
            <Textarea
              placeholder="Añade información complementaria útil para reclutadores"
              className="min-h-[100px] bg-gray-50 rounded-md"
            />

            <div className="space-y-4">
              <Label className="text-blue-900">
                Elige las 5 competencias que más te caracterizan
              </Label>
              <Select>
                <SelectTrigger className="bg-gray-50 rounded-md">
                  <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Liderazgo</SelectItem>
                  <SelectItem value="2">Trabajo en equipo</SelectItem>
                  <SelectItem value="3">Comunicación efectiva</SelectItem>
                  <SelectItem value="4">Resolución de problemas</SelectItem>
                  <SelectItem value="5">Adaptabilidad</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-center">
              <Button
                onClick={handleSave}
                className="bg-gradient-to-r from-purple-600 to-cyan-500 text-white hover:from-purple-700 hover:to-cyan-600 px-6 py-3 rounded-[50px]"
              >
                <Save className="mr-2 h-4 w-4" />
                Guardar información
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-8 border-t mt-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-6">
                <p className="text-sm text-gray-600">
                  Powered by SolutionSoft.com
                </p>
                <div className="flex gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-gray-100"
                  >
                    <Facebook className="h-5 w-5 text-gray-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-gray-100"
                  >
                    <Twitter className="h-5 w-5 text-gray-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="hover:bg-gray-100"
                  >
                    <Instagram className="h-5 w-5 text-gray-600" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
