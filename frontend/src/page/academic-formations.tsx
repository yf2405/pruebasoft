import { useAcademicStore } from "@/api/useAcademicStore";
import AcademicForm from "@/components/formcompoents/academic-form";
import EducationCard from "@/components/formcompoents/education-card";

const AcademicFormations: React.FC = () => {
  const { academics, fetchAcademics, createAcademic, loading, error } =
    useAcademicStore();

  return academics ? (
    <div className="p-6">
      <EducationCard
        academics={academics}
        fetchAcademics={fetchAcademics}
        loading={loading}
        error={error}
      />
    </div>
  ) : (
    <div>
      <AcademicForm
        createAcademic={createAcademic}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default AcademicFormations;
