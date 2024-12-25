import useWorkExperienceStore from "@/api/useWorkExperienceStore";
import WorkForm from "@/components/form_work_components/form-work";
import WorkExperienceCard from "@/components/form_work_components/work-card";
import { useEffect } from "react";

export default function WorkExperience() {
  const {
    loading,
    error,
    fetchWorkExperiences,
    createWorkExperience,
    workExperiences
  } = useWorkExperienceStore();

  useEffect(() => {
    fetchWorkExperiences(); // Cargar las experiencias laborales al montar el componente.
  }, [fetchWorkExperiences]);

  return (
    <div className="p-6">
      {workExperiences && workExperiences.length > 0 ? (
        <WorkExperienceCard />
      ) : (
        <WorkForm
          loading={loading}
          error={error}
          createWorkExperience={createWorkExperience}
        />
      )}
    </div>
  );
}
