import {
  PenSquare,
  Trash2,
  GraduationCap,
  Building2,
  Calendar
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect } from "react";

export default function EducationCard({
  academics,
  fetchAcademics,
  loading,
  error,
  deleteAcademic
}: any) {
  // Fetch data when the component is mounted
  useEffect(() => {
    fetchAcademics();
  }, [fetchAcademics]);

  if (loading) {
    return <p>Cargando información académica...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  // Identificar el último estudio realizado
  const lastStudyId =
    academics.length > 0 ? academics[academics.length - 1]._id : null;

  return (
    <div className="gap-6 flex flex-col-reverse md:flex-row-reverse justify-center">
      {academics.map((study: any) => (
        <Card
          key={study._id}
          className="w-full rounded-xl  max-w-md bg-gray-50"
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <h3 className="text-lg font-medium text-blue-900">
              Formación académica
            </h3>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <PenSquare className="h-4 w-4" />
              </Button>
              <Button
                onClick={() => deleteAcademic(study._id)}
                variant="ghost"
                size="icon"
                className="h-8 w-8"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {study._id === lastStudyId && (
              <Badge
                variant="secondary"
                className="bg-blue-900 text-white rounded-full text-xs font-normal"
              >
                Último estudio realizado
              </Badge>
            )}
            <div className="space-y-3">
              <div className="flex gap-2 items-start">
                <GraduationCap className="h-4 w-4 text-blue-900 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Nivel de formación</p>
                  <p className="text-sm text-blue-900">{study.titulo}</p>
                </div>
              </div>

              <div className="flex gap-2 items-start">
                <Building2 className="h-4 w-4 text-blue-900 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">Institución</p>
                  <p className="text-sm text-blue-900">{study.institucion}</p>
                </div>
              </div>

              <div className="flex gap-2 items-start">
                <Calendar className="h-4 w-4 text-blue-900 mt-1" />
                <div>
                  <p className="text-sm text-gray-500">
                    Fecha de certificación
                  </p>
                  <p className="text-sm text-blue-900">
                    {new Date(study.fechaInicio).toLocaleDateString()} -{" "}
                    {new Date(study.fechaTerminacion).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
