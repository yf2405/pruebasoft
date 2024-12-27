import { LinkedinIcon } from "lucide-react";

interface Candidate {
  salaryRange: string;
  professionalLevel: string;
  fullName: string;
  profession: string;
  specialization?: string;
  documentNumber: string;
  city: string;
  willingToRelocate: boolean;
  email: string;
  phoneNumber: string;
  linkedin?: string;
  addedValue: string;
  addedHappyWorkValue: string;
  addedProfessionalValue: string;
  ideasProject: string;
}

interface ProfileDataProps {
  candidates: Candidate[];
}

export default function ProfileData({ candidates }: ProfileDataProps) {
  return (
    <div>
      <div>
        <h1>Lista de Candidatos</h1>
        <div className="max-w-full p-6 space-y-6">
          {candidates.map((candidate, index) => (
            <div key={index} className="space-y-4">
              {/* Header Section */}
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
                <p className="text-[#023D6A]">{candidate.professionalLevel}</p>

                <div className="flex gap-2 items-center text-sm pt-2">
                  <span className="text-gray-500">💰</span>
                  <span>Rango salarial</span>
                </div>
                <p className="text-[#023D6A]">{candidate.salaryRange}</p>
              </div>

              {/* Personal Details */}
              <div className="space-y-4 border-t border-b border-dashed border-gray-200 py-4">
                {[
                  { label: "Nombre", value: candidate.fullName },
                  { label: "Profesión", value: candidate.profession },
                  {
                    label: "Especialización",
                    value: candidate.specialization || "No especificado"
                  },
                  {
                    label: "Número de documento",
                    value: candidate.documentNumber
                  },
                  { label: "Ciudad donde busco", value: candidate.city },
                  {
                    label: "Abierto a nueva ubicación",
                    value: (
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-full ${
                            candidate.willingToRelocate
                              ? "bg-blue-600"
                              : "bg-gray-400"
                          }`}
                        ></div>
                        <span>{candidate.willingToRelocate ? "Sí" : "No"}</span>
                      </div>
                    )
                  },
                  { label: "Correo electrónico", value: candidate.email },
                  { label: "Número de celular", value: candidate.phoneNumber },
                  {
                    label: "Red profesional",
                    value: candidate.linkedin ? (
                      <div className="flex items-center gap-2">
                        <LinkedinIcon className="h-4 w-4" />
                        <span>{candidate.linkedin}</span>
                      </div>
                    ) : (
                      "No especificado"
                    )
                  }
                ].map((detail, detailIndex) => (
                  <div
                    key={detailIndex}
                    className="md:flex md:items-center md:gap-4"
                  >
                    <div className="bg-[#CDFDF3] text-xs font-medium px-3 py-1 rounded-full w-fit h-[22px] mb-1 md:mb-0 md:w-[140px] md:flex md:items-center">
                      {detail.label}
                    </div>
                    <div className="text-[#023D6A] md:flex-1">
                      {detail.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Additional Sections */}
              <div className="space-y-4">
                {[
                  {
                    icon: "👥",
                    title: "Valor agregado personal",
                    content: candidate.addedValue
                  },
                  {
                    icon: "❤️",
                    title: "Lo que me hace feliz",
                    content: candidate.addedHappyWorkValue
                  },
                  {
                    icon: "⭐",
                    title: "Talento profesional",
                    content: candidate.addedProfessionalValue
                  },
                  {
                    icon: "💡",
                    title: "Ideas, proyectos o actividades a futuro",
                    content: candidate.ideasProject
                  }
                ].map((section, sectionIndex) => (
                  <div key={sectionIndex}>
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
          ))}
        </div>
      </div>
    </div>
  );
}
