import { useAcademicStore } from "@/api/useAcademicStore";
import AcademicForm from "@/components/formcompoents/academic-form";
import EducationCard from "@/components/formcompoents/education-card";

const AcademicFormations: React.FC = () => {
  const {
    academics,
    fetchAcademics,
    deleteAcademic,
    createAcademic,
    loading,
    error
  } = useAcademicStore();

  return academics && academics.length > 0 ? (
    <div className="p-6">
      <EducationCard
        academics={academics}
        fetchAcademics={fetchAcademics}
        loading={loading}
        error={error}
        deleteAcademic={deleteAcademic}
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
