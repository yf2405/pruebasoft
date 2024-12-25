import AcademicFormation from "./page/academic-formations";
import ComplementaryData from "./page/complementary-data";
import ProfileConfiguration from "./page/ConfiigPage";
import ProfilePage from "./page/Profile";
import ProfileForm from "./page/profile-form";
import WorkExperience from "./page/work-experience";

export default function App() {
  return (
    <div>
      <ProfilePage />
      <ProfileConfiguration />
      <ProfileForm />
      <AcademicFormation />
      <WorkExperience />
      <ComplementaryData />
    </div>
  );
}
