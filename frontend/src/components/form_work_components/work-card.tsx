import {
  PenSquare,
  Briefcase,
  Building2,
  Clock,
  Award,
  Trash2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import useWorkExperienceStore from "@/api/useWorkExperienceStore";
import { useEffect } from "react";
const WorkExperienceCard: React.FC = () => {
  const {
    loading,
    error,
    fetchWorkExperiences,
    workExperiences,
    deleteWorkExperience
  } = useWorkExperienceStore();

  useEffect(() => {
    fetchWorkExperiences();
  }, [fetchWorkExperiences]);

  if (loading) {
    return <p>Cargando experiencias laborales...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (workExperiences.length === 0) {
    return <p>No hay experiencias laborales registradas.</p>;
  }

  return (
    <div className="gap-6 flex flex-col-reverse md:flex-row-reverse justify-center">
      {workExperiences.map((experience) => (
        <Card
          key={experience._id}
          className="w-full max-w-md rounded-lg bg-[#023D6A] text-white"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-lg font-medium">Experiencia laboral</h3>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:text-white/90"
              >
                <PenSquare className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => deleteWorkExperience(experience._id)}
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-white hover:text-white/90"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <Badge
              variant="secondary"
              className="bg-blue-400/20 text-white rounded-full text-xs font-normal"
            >
              {experience.trabajaActualmente ? "Trabaja aquí actualmente" : ""}
            </Badge>

            <div className="space-y-3">
              <div className="flex gap-2 items-start">
                <Briefcase className="h-4 w-4 mt-1" />
                <div>
                  <p className="text-sm text-blue-100">Cargo</p>
                  <p className="text-sm">{experience.cargo}</p>
                </div>
              </div>

              <div className="flex gap-2 items-start">
                <Building2 className="h-4 w-4 mt-1" />
                <div>
                  <p className="text-sm text-blue-100">Empresa</p>
                  <p className="text-sm">{experience.empresa}</p>
                </div>
              </div>

              <div className="flex gap-2 items-start">
                <Clock className="h-4 w-4 mt-1" />
                <div>
                  <p className="text-sm text-blue-100">Tiempo de duración</p>
                  <p className="text-sm">
                    {new Date(experience.fechaInicio).toLocaleDateString()} -{" "}
                    {experience.trabajaActualmente
                      ? "Actualidad"
                      : experience.fechaTerminacion
                      ? new Date(
                          experience.fechaTerminacion
                        ).toLocaleDateString()
                      : "Fecha no disponible"}
                  </p>
                </div>
              </div>

              <div className="flex gap-2 items-start">
                <Award className="h-4 w-4 mt-1" />
                <div>
                  <p className="text-sm text-blue-100">Logros</p>
                  <ul className="text-sm list-disc list-inside">
                    {experience.logros.map((logro, index) => (
                      <li key={index}>{logro}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {experience.recursosAdicionales?.length > 0 && (
                <div className="flex gap-2 items-start">
                  <Briefcase className="h-4 w-4 mt-1" />
                  <div>
                    <p className="text-sm text-blue-100">
                      Recursos adicionales
                    </p>
                    <ul className="text-sm list-disc list-inside">
                      {experience.recursosAdicionales.map((recurso, index) => (
                        <li key={index}>{recurso}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default WorkExperienceCard;
