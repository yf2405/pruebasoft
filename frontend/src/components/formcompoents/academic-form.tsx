import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Calendar, Trash2, Plus, Save } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Section = {
  title: string;
  institution: string;
  startDate: Date | null;
  endDate: Date | null | string;
};

interface Academic {
  _id: string;
  titulo: string;
  institucion: string;
  fechaInicio: string;
  fechaTerminacion: string;
}
interface AcademicFormProps {
  createAcademic: (data: Omit<Academic, "_id">) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const AcademicForm: React.FC<AcademicFormProps> = ({
  createAcademic,
  error,
  loading
}) => {
  const [sections, setSections] = useState<Section[]>([
    {
      title: "Diseño de medios interactivos",
      institution: "Universidad Icesi",
      startDate: null,
      endDate: null
    }
  ]);

  const addSection = () => {
    setSections([
      ...sections,
      { title: "", institution: "", startDate: null, endDate: null }
    ]);
  };

  const updateSection = (
    index: number,
    field: keyof Section,
    value: string | Date | null
  ) => {
    const updatedSections = sections.map((section, i) =>
      i === index ? { ...section, [field]: value } : section
    );
    setSections(updatedSections);
  };

  const removeSection = (index: number) => {
    setSections(sections.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      for (const section of sections) {
        // Validar campos obligatorios
        if (
          !section.title ||
          !section.institution ||
          !section.startDate ||
          !section.endDate
        ) {
          alert("Por favor completa todos los campos antes de guardar.");
          return;
        }

        const newAcademic = {
          titulo: section.title.trim(),
          institucion: section.institution.trim(),
          fechaInicio:
            section.startDate instanceof Date
              ? section.startDate.toISOString()
              : new Date(section.startDate).toISOString(),
          fechaTerminacion:
            section.endDate instanceof Date
              ? section.endDate.toISOString()
              : new Date(section.endDate).toISOString()
        };

        // Llamar a la API para guardar
        await createAcademic(newAcademic);
      }
    } catch (error) {
      console.error("Error guardando la sección", error);
      alert("Ocurrió un error al guardar la información.");
    }
  };
  if (loading) {
    return <p>Cargando información académica...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="p-8 bg-gray-200">
      <h2 className="text-2xl font-medium text-blue-900 mb-6">
        Formación académica
      </h2>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <div
            key={index}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start"
          >
            <div className="space-y-2">
              <Label htmlFor={`title-${index}`}>Título obtenido</Label>
              <Input
                id={`title-${index}`}
                value={section.title}
                onChange={(e) => updateSection(index, "title", e.target.value)}
                className="bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`institution-${index}`}>Institución</Label>
              <Input
                id={`institution-${index}`}
                value={section.institution}
                onChange={(e) =>
                  updateSection(index, "institution", e.target.value)
                }
                className="bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label>Fecha de inicio</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white",
                      !section.startDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {section.startDate
                      ? format(section.startDate, "dd/MM/yy")
                      : "DD/MM/YY"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarIcon
                    mode="single"
                    selected={section.startDate ?? undefined} // Usamos startDate aquí
                    onSelect={(date) => {
                      // Actualizamos la fecha de inicio
                      updateSection(index, "startDate", date ?? null);
                    }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label>Fecha de terminación</Label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-white",
                        !section.endDate && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {section.endDate
                        ? format(section.endDate, "dd/MM/yy")
                        : "DD/MM/YY"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarIcon
                      mode="single"
                      selected={
                        section.endDate instanceof Date
                          ? section.endDate
                          : section.endDate
                          ? new Date(section.endDate)
                          : undefined
                      }
                      onSelect={(date) => {
                        // Actualizamos la fecha de terminación
                        updateSection(index, "endDate", date ?? null);
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => removeSection(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-end gap-2">
          <Button
            className="bg-cyan-400 hover:bg-cyan-500 text-white"
            onClick={handleSave}
          >
            <Save className="mr-2 h-4 w-4" />
            Guardar
          </Button>
          <Button variant="outline" className="bg-white" onClick={addSection}>
            <Plus className="mr-2 h-4 w-4" />
            Añadir
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AcademicForm;
