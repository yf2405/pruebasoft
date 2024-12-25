import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Linkedin } from "lucide-react";
import useCandidateStore from "@/api/candidates";
import { useEffect } from "react";

export default function ProfileForm() {
  const { candidates, loading, error, fetchCandidates, deleteCandidate } =
    useCandidateStore();

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  const handleDelete = (id: string) => {
    deleteCandidate(id);
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return !candidates ? (
    <div>
      {" "}
      <div>
        <h1>Lista de Candidatos</h1>
        <div className="max-w-full p-6 space-y-6">
          {/* Header Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-[#023D6A] font-medium text-lg">
                Datos personales
              </h2>
              <button className="text-gray-400 hover:text-gray-600">
                <span className="sr-only">Edit</span>✎
              </button>
            </div>

            {/* Professional Level & Salary */}
            <div className="space-y-2">
              <div className="flex gap-2 items-center text-sm">
                <span className="text-gray-500">📋</span>
                <span>Nivel profesional</span>
              </div>
              <p className="text-[#023D6A]">
                Nivel 2 Postgrado con experiencia superior a 6 años
              </p>

              <div className="flex gap-2 items-center text-sm pt-2">
                <span className="text-gray-500">💰</span>
                <span>Rango salarial</span>
              </div>
              <p className="text-[#023D6A]">3.5ML en adelante</p>
            </div>

            {/* Personal Details */}
            <div className="space-y-4 border-t border-b border-dashed border-gray-200 py-4">
              {personalDetails.map((detail, index) => (
                <div key={index} className="md:flex md:items-center md:gap-4">
                  <div className="bg-[#CDFDF3] text-xs font-medium px-3 py-1 rounded-full w-fit h-[22px] mb-1 md:mb-0 md:w-[140px] md:flex md:items-center">
                    {detail.label}
                  </div>
                  <div className="text-[#023D6A] md:flex-1">{detail.value}</div>
                </div>
              ))}
            </div>

            {/* Additional Sections */}
            <div className="space-y-4">
              {additionalSections.map((section, index) => (
                <div key={index}>
                  <div className="flex gap-2 items-center text-sm">
                    <span>{section.icon}</span>
                    <span className="text-gray-600">{section.title}</span>
                  </div>
                  <p className="text-[#023D6A] mt-1 text-sm">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="max-w-6xl mx-auto p-8">
      <form className="space-y-8">
        {/* Top Full Width Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="salary">Rango salarial desde:</Label>
            <Select>
              <SelectTrigger id="salary" className="bg-gray-50">
                <SelectValue placeholder="Selecciona" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">$1.000.000 - $2.000.000</SelectItem>
                <SelectItem value="2">$2.000.000 - $3.000.000</SelectItem>
                <SelectItem value="3">$3.000.000 - $4.000.000</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="level">¿Cuál es tu nivel profesional?</Label>
            <Select>
              <SelectTrigger id="level" className="bg-gray-50">
                <SelectValue placeholder="Selecciona" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="junior">Junior</SelectItem>
                <SelectItem value="semi-senior">Semi-Senior</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Three Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nombre completo</Label>
            <Input
              id="fullName"
              placeholder="Escribe aquí..."
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profession">Profesión</Label>
            <Input
              id="profession"
              placeholder="Escribe aquí..."
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialization">Especialización</Label>
            <Input
              id="specialization"
              placeholder="Escribe aquí..."
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="document">Número de documento</Label>
            <Input
              id="document"
              placeholder="Escribe aquí..."
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Ciudad donde buscas empleo</Label>
            <Select>
              <SelectTrigger id="city" className="bg-gray-50">
                <SelectValue placeholder="Selecciona" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bogota">Bogotá</SelectItem>
                <SelectItem value="medellin">Medellín</SelectItem>
                <SelectItem value="cali">Cali</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="relocation" className="block mb-2">
              ¿Estás dispuesto a trasladarte?
            </Label>
            <div className="flex items-center space-x-2">
              <Switch id="relocation" />
              <Label htmlFor="relocation">No</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              type="email"
              placeholder="Escribe aquí..."
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Número de celular</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="Escribe aquí..."
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin">Linkedin</Label>
            <div className="relative">
              <Input
                id="linkedin"
                placeholder="Escribe aquí..."
                className="bg-gray-50 pr-10"
              />
              <Linkedin className="absolute right-3 top-2.5 h-5 w-5 text-[#0A66C2]" />
            </div>
          </div>
        </div>

        {/* Full Width Fields */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="value">
              ¿Qué valor agregado le ofreces a una empresa que te contrata? ¿Qué
              te diferencia de otras personas?
            </Label>
            <Textarea
              id="value"
              placeholder="Escríbelas aquí..."
              className="bg-gray-50 min-h-[150px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="happiness">
                Qué te hace feliz a nivel laboral
              </Label>
              <Textarea
                id="happiness"
                placeholder="Escribe aquí..."
                className="bg-gray-50 min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="talent">Cuál es tu talento profesional</Label>
              <Textarea
                id="talent"
                placeholder="Escribe aquí..."
                className="bg-gray-50 min-h-[100px]"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

const personalDetails = [
  { label: "Nombre", value: "Francisco José Benavides" },
  { label: "Profesión", value: "Ingeniero Civil" },
  { label: "Especialización", value: "Subsuelo" },
  { label: "Número de documento", value: "1997216534" },
  { label: "Ciudad donde busco", value: "Bogotá" },
  {
    label: "Abierto a nueva ubicación",
    value: (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-blue-600"></div>
        <span>Sí</span>
      </div>
    )
  },
  { label: "Correo electrónico", value: "FRJose@gmail.com" },
  { label: "Número de celular", value: "3006548900" },
  {
    label: "Red profesional",
    value: (
      <div className="flex items-center gap-2">
        <Linkedin className="h-4 w-4" />
        <span>@FRJose</span>
      </div>
    )
  }
];

const additionalSections = [
  {
    icon: "👥",
    title: "Valor agregado personal",
    content:
      "Habilidades de liderazgo y colaboración, con experiencia en dirigir equipos orientados hacia el logro de objetivos comunes, fomentando un ambiente de trabajo positivo y productivo."
  },
  {
    icon: "❤️",
    title: "Lo que me hace feliz",
    content: "transformar ideas creativas en campañas visualmente impactantes"
  },
  {
    icon: "⭐",
    title: "Talento profesional",
    content: "Creativo, Innovador, Analítico, Visionario, Resolutivo"
  },
  {
    icon: "💡",
    title: "Ideas, proyectos o actividades a futuro",
    content:
      "Mi objetivo final es ser reconocido como un referente en mi industria, alguien que no solo entiende y responde a las necesidades del mercado, sino que lo hace con integridad, pasión y una visión clara hacia un futuro mejor."
  }
];
