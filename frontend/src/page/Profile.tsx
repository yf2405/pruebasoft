import useCandidateStore from "@/api/candidates";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, MoreVertical } from "lucide-react";
import { useEffect } from "react";

export default function ProfilePage() {
  const { candidates, loading, error, fetchCandidates } = useCandidateStore();

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const defaultCandidate = {
    fullName: "Francisco José Benavides",
    profession: "Ingeniero Químico",
    email: "johndoe@example.com",
    documentNumber: "0000000000"
  };

  const candidate =
    candidates && candidates.length > 0 ? candidates[0] : defaultCandidate;

  return (
    <div className="min-w-max bg-gray-100 font-sans">
      {/* Header */}
      <div
        className="bg-blue-600 relative h-[200px] md:h-[338px] top-[-1px]"
        style={{
          backgroundImage: `url('/imahead.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed"
        }}
      >
        <div className="h-[80px] md:h-[120px] rounded-b-3xl bg-gradient-to-r from-purple-700 to-cyan-500 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <h1 className="text-white text-3xl md:text-6xl font-bold">SEUS</h1>
            <div className="flex items-center gap-2 md:hidden">
              <span className="text-white">¡Bienvenido!</span>
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Edit Button - Desktop */}
        <div className="hidden md:flex absolute right-8 top-[147px]">
          <Button
            variant="secondary"
            size="sm"
            className="bg-white text-gray-800 hover:bg-gray-100 w-[107px] rounded-3xl"
          >
            Editar
          </Button>
        </div>

        {/* Edit Button - Mobile */}
        <div className="absolute right-4 top-4 md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10"
          >
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Profile Content */}
      <div className="flex justify-center -translate-y-16 md:-translate-y-8 px-4">
        <Card className="w-full max-w-[1120px] min-h-[100px] md:h-[360px] bg-transparent">
          <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-8 p-4 md:p-0">
            {/* Profile Photo */}
            <div className="md:-translate-y-24 flex justify-start">
              <div className="w-[120px] h-[120px] md:w-[255px] md:h-[255px] rounded-full bg-purple-100 flex items-center justify-center border-4 border-white shadow-md">
                <Camera className="w-8 h-8 md:w-16 md:h-16 text-purple-300" />
              </div>
            </div>

            {/* User Info */}
            <div className="flex-grow space-y-2 md:space-y-6 md:w-[832px]">
              {/* Mobile View */}
              <div className="md:hidden text-start">
                <h1 className="text-xl font-bold text-blue-900">
                  {candidate.fullName}
                </h1>
                <p className="text-gray-600">{candidate.profession}</p>
              </div>

              {/* Desktop View */}
              <div className="hidden md:block">
                <h2 className="text-2xl text-gray-600 font-light">
                  Bienvenido
                </h2>
                <h1 className="text-3xl font-bold text-blue-900">
                  {candidate.fullName}
                </h1>
                <div className="flex h-[55px] gap-[32px] mt-4">
                  <div className="w-[256px] gap-[18px]">
                    <span className="text-gray-600 text-sm">Email:</span>
                    <div className="text-gray-800">{candidate.email}</div>
                  </div>
                  <div className="w-[256px] gap-[18px]">
                    <span className="text-gray-600 text-sm">Documento:</span>
                    <div className="text-gray-800">
                      {candidate.documentNumber}
                    </div>
                  </div>
                  <div className="w-[256px] gap-[18px]">
                    <span className="text-gray-600 text-sm">Profesión:</span>
                    <div className="text-gray-800">{candidate.profession}</div>
                  </div>
                </div>
                <div className="flex justify-end mt-4">
                  <Button
                    variant="secondary"
                    className="bg-purple-100 hover:bg-purple-200 text-purple-700 text-sm font-normal rounded-full"
                  >
                    Cambiar contraseña
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
