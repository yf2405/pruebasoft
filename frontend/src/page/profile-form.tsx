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
import useCandidateStore from "@/api/candidates";
import { useEffect } from "react";
import ProfileData from "@/components/profile_data_components/profile-data";

export default function ProfileForm() {
  const { formData, setFormData, fetchCandidates, candidates, loading, error } =
    useCandidateStore();

  useEffect(() => {
    fetchCandidates();
  }, [fetchCandidates]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSelectChange = (id: string, value: string) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSwitchChange = (checked: boolean) => {
    setFormData({ ...formData, willingToRelocate: checked });
  };
  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return candidates && candidates.length > 0 ? (
    <div>
      <ProfileData candidates={candidates} />
    </div>
  ) : (
    <div className="max-w-6xl mx-auto p-8">
      <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
        {/* Top Full Width Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="salaryRange">Rango salarial desde:</Label>
            <Select
              onValueChange={(value) =>
                handleSelectChange("salaryRange", value)
              }
            >
              <SelectTrigger id="salaryRange" className="bg-gray-50">
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
            <Label htmlFor="professionalLevel">
              ¿Cuál es tu nivel profesional?
            </Label>
            <Select
              onValueChange={(value) =>
                handleSelectChange("professionalLevel", value)
              }
            >
              <SelectTrigger id="professionalLevel" className="bg-gray-50">
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
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Escribe aquí..."
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="profession">Profesión</Label>
            <Input
              id="profession"
              value={formData.profession}
              onChange={handleChange}
              placeholder="Escribe aquí..."
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialization">Especialización</Label>
            <Input
              id="specialization"
              value={formData.specialization}
              onChange={handleChange}
              placeholder="Escribe aquí..."
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="documentNumber">Número de documento</Label>
            <Input
              id="documentNumber"
              value={formData.documentNumber}
              onChange={handleChange}
              placeholder="Escribe aquí..."
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">Ciudad donde buscas empleo</Label>
            <Select
              onValueChange={(value) => handleSelectChange("city", value)}
            >
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
            <Label htmlFor="willingToRelocate" className="block mb-2">
              ¿Estás dispuesto a trasladarte?
            </Label>
            <div className="flex items-center space-x-2">
              <Switch
                id="willingToRelocate"
                checked={formData.willingToRelocate}
                onCheckedChange={handleSwitchChange}
              />
              <Label htmlFor="willingToRelocate">
                {formData.willingToRelocate ? "Sí" : "No"}
              </Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              placeholder="Escribe aquí..."
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Número de celular</Label>
            <Input
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              type="tel"
              placeholder="Escribe aquí..."
              className="bg-gray-50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="Escribe aquí..."
              className="bg-gray-50 pr-10"
            />
          </div>
        </div>

        {/* Full Width Fields */}
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="addedValue">
              ¿Qué valor agregado le ofreces a una empresa que te contrata? ¿Qué
              te diferencia de otras personas?
            </Label>
            <Textarea
              id="addedValue"
              value={formData.addedValue}
              onChange={handleChange}
              placeholder="Escríbelo aquí..."
              className="bg-gray-50 min-h-[150px]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="addedHappyWorkValue">
                ¿Qué te hace feliz a nivel laboral?
              </Label>
              <Textarea
                id="addedHappyWorkValue"
                value={formData.addedHappyWorkValue}
                onChange={handleChange}
                placeholder="Escribe aquí..."
                className="bg-gray-50 min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="addedProfessionalValue">
                ¿Cuál es tu talento profesional?
              </Label>
              <Textarea
                id="addedProfessionalValue"
                value={formData.addedProfessionalValue}
                onChange={handleChange}
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
