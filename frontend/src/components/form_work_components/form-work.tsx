import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Trash2, PaperclipIcon, Save, Plus } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Calendar as CalendarIcon } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface WorkExperienceProps {
  _id: string;
  cargo: string;
  empresa: string;
  fechaInicio: string;
  fechaTerminacion: string | null;
  trabajaActualmente: boolean;
  logros: string | string[];
  recursosAdicionales: File[];
}

interface WorkFormProps {
  createWorkExperience: (data: any) => Promise<void>;
  loading: boolean;
  error: string | null;
}

export default function WorkForm({
  createWorkExperience,
  loading
}: WorkFormProps) {
  const [experiences, setExperiences] = useState<WorkExperienceProps[]>([
    {
      _id: "",
      cargo: "",
      empresa: "",
      fechaInicio: "",
      fechaTerminacion: null,
      trabajaActualmente: false,
      logros: [""],
      recursosAdicionales: []
    }
  ]);

  const handleAddExperience = () => {
    setExperiences([
      ...experiences,
      {
        _id: "",
        cargo: "",
        empresa: "",
        fechaInicio: "",
        fechaTerminacion: null,
        trabajaActualmente: false,
        logros: [""],
        recursosAdicionales: []
      }
    ]);
  };

  const handleRemoveExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    field: keyof WorkExperienceProps,
    value: string | boolean | File[] | null
  ) => {
    const updated = experiences.map((exp, i) =>
      i === index ? { ...exp, [field]: value } : exp
    );
    setExperiences(updated);
  };
  const handleSave = async () => {
    for (const exp of experiences) {
      if (
        !exp.cargo ||
        !exp.empresa ||
        !exp.fechaInicio ||
        (!exp.trabajaActualmente && !exp.fechaTerminacion) ||
        !exp.logros ||
        (Array.isArray(exp.logros) && exp.logros.some((logro) => !logro.trim()))
      ) {
        alert("Por favor completa todos los campos antes de guardar.");
        return;
      }

      const formattedExp = {
        cargo: exp.cargo.trim(),
        empresa: exp.empresa.trim(),
        fechaInicio: new Date(exp.fechaInicio).toISOString(),
        fechaTerminacion: exp.fechaTerminacion
          ? new Date(exp.fechaTerminacion).toISOString()
          : null,
        trabajaActualmente: exp.trabajaActualmente,
        logros: Array.isArray(exp.logros)
          ? exp.logros.map((logro) => logro.trim()) // Limpia cada logro en el array
          : exp.logros.trim(), // Limpia el string directamente si no es un array
        recursosAdicionales: exp.recursosAdicionales
      };

      try {
        await createWorkExperience(formattedExp);
        alert("Experiencia laboral guardada con éxito.");
      } catch (err) {
        console.error(err);
        alert("Error al guardar la experiencia laboral.");
      }
    }
  };

  return (
    <div className="p-8 bg-blue-900 rounded-lg space-y-6">
      <h2 className="text-2xl font-medium text-white">Experiencia laboral</h2>

      {experiences.map((exp, index) => (
        <div key={index} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
            <div className="space-y-2">
              <Label htmlFor={`position-${index}`} className="text-white">
                Cargo
              </Label>
              <Input
                id={`position-${index}`}
                value={exp.cargo}
                onChange={(e) => handleChange(index, "cargo", e.target.value)}
                placeholder="Ingresala aquí.."
                className="bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`company-${index}`} className="text-white">
                Empresa
              </Label>
              <Input
                id={`company-${index}`}
                value={exp.empresa}
                onChange={(e) => handleChange(index, "empresa", e.target.value)}
                placeholder="Ingresala aquí.."
                className="bg-white"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-white">Fecha de inicio</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-white",
                      !exp.fechaInicio && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {exp.fechaInicio
                      ? format(new Date(exp.fechaInicio), "dd/MM/yy")
                      : "DD/MM/YY"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarIcon
                    mode="single"
                    selected={
                      exp.fechaInicio ? new Date(exp.fechaInicio) : undefined
                    }
                    onSelect={(date) =>
                      handleChange(
                        index,
                        "fechaInicio",
                        date ? date.toISOString() : ""
                      )
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label className="text-white">Fecha de terminación</Label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal bg-white",
                        !exp.fechaTerminacion && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {exp.fechaTerminacion
                        ? format(new Date(exp.fechaTerminacion), "dd/MM/yy")
                        : "DD/MM/YY"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarIcon
                      mode="single"
                      selected={
                        exp.fechaTerminacion
                          ? new Date(exp.fechaTerminacion)
                          : undefined
                      }
                      onSelect={(date) =>
                        handleChange(
                          index,
                          "fechaTerminacion",
                          date ? date.toISOString() : null
                        )
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <Button
                  onClick={() => handleRemoveExperience(index)}
                  variant="outline"
                  size="icon"
                  className="shrink-0 bg-transparent border-white/20 text-white hover:bg-white/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor={`achievements-${index}`} className="text-white">
              Menciona tus logros
            </Label>
            <Textarea
              id={`achievements-${index}`}
              value={exp.logros}
              onChange={(e) => handleChange(index, "logros", e.target.value)}
              className="bg-white min-h-[150px]"
              placeholder="Describe aquí tus logros."
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-2 text-white">
              <PaperclipIcon className="h-5 w-5" />
              <span>Añadir certificación, fotos o premios</span>
              <Button variant="link" className="text-white p-0 h-auto">
                Opcional
              </Button>
            </div>
            <p className="text-sm text-white/70">
              Si tienes fotos de tu experiencia laboral compártela con nosotros
              (fotos con el equipo de trabajo, en eventos realizados, dando una
              charla, recibiendo un premio) recuerda que el mal uso de este
              espacio puede generar que tu perfil no sea aprobado. Si no tienes
              fotos que generen valor, deja este espacio en blanco.
            </p>
          </div>
        </div>
      ))}

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Label htmlFor="current" className="text-white">
            Trabaja aquí actualmente
          </Label>
          <Switch id="current" />
          <span className="text-white">No</span>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleSave}
            className="bg-cyan-400 hover:bg-cyan-500 text-white"
            disabled={loading}
          >
            <Save className="mr-2 h-4 w-4" />
            Guardar
          </Button>
          <Button
            onClick={handleAddExperience}
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white/10"
          >
            <Plus className="mr-2 h-4 w-4" />
            Añadir
          </Button>
        </div>
      </div>
    </div>
  );
}
