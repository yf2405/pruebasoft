import {
  Users,
  Wallet,
  Handshake,
  Truck,
  Settings,
  Building2,
  MonitorSmartphone,
  MonitorCheck,
  UserCheck,
  Heart,
  Atom,
  Cloud,
  Factory,
  Brain
} from "lucide-react";

export default function ProfileConfiguration() {
  return (
    <div className=" mx-auto flex flex-col items-center p-8 bg-gray-50 rounded-lg">
      <h1 className="text-center text-2xl font-semibold text-blue-900 mb-8">
        Configura esta sección para un perfil más detallado.
      </h1>

      {/* Training and Employment Section */}
      <div className="mb-12">
        <h2 className="text-lg font-medium text-blue-900 mb-6">
          Tipo de formación y empleo que buscas:
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-[32px]">
          <IconButton
            icon={<Users className="h-8 w-8" />}
            label="Áreas humanas"
            gradient
          />
          <IconButton
            icon={<Wallet className="h-8 w-8" />}
            label="Áreas Financieras"
          />
          <IconButton
            icon={<Handshake className="h-8 w-8" />}
            label="Área Comerciales"
          />
          <IconButton
            icon={<Truck className="h-8 w-8" />}
            label="Áreas de Logística"
          />
          <IconButton
            icon={<Settings className="h-8 w-8" />}
            label="Genérica"
          />
        </div>
      </div>

      {/* Schedule Options Section */}
      <div className="mb-12 ">
        <h2 className="text-lg font-medium text-blue-900 mb-6">
          Opciones de jornadas:
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-6  gap-[32px]">
          <IconButton
            icon={<Building2 className="h-8 w-8" />}
            label="Presencial"
          />
          <IconButton
            icon={<MonitorSmartphone className="h-8 w-8" />}
            label="Remoto"
          />
          <IconButton
            icon={<MonitorCheck className="h-8 w-8" />}
            label="Híbrido"
          />
          <IconButton
            icon={<UserCheck className="h-8 w-8" />}
            label="Me es indiferente"
          />
        </div>
      </div>

      {/* Culture Types Section */}
      <div className="mb-8 ">
        <h2 className="text-lg font-medium text-blue-900 mb-6">
          Qué tipos de culturas te gustan más:
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-[32px] ">
          <IconButton
            icon={<Heart className="h-8 w-8" />}
            label="Emocionales"
          />
          <IconButton
            icon={<Atom className="h-8 w-8" />}
            label="Conocimiento"
          />
          <IconButton icon={<Cloud className="h-8 w-8" />} label="Remoto" />
          <IconButton
            icon={<Factory className="h-8 w-8" />}
            label="Producción"
          />
          <IconButton icon={<Brain className="h-8 w-8" />} label="Intuitiva" />
          <IconButton
            icon={<UserCheck className="h-8 w-8" />}
            label="Me es indiferente"
          />
        </div>
      </div>

      <p className="text-center text-sm text-gray-600 mt-6">
        Elegir una cultura específica no te descarta de ningún proceso.
      </p>
    </div>
  );
}

interface IconButtonProps {
  icon: React.ReactNode;
  label: string;
  gradient?: boolean;
}

function IconButton({ icon, label, gradient = false }: IconButtonProps) {
  return (
    <button className="flex w-[160px] flex-col items-center gap-[10px] ">
      <div
        className={`w-[112px] h-[112px] rounded-full flex items-center justify-center ${
          gradient
            ? "bg-gradient-to-br from-purple-600 to-cyan-500"
            : "bg-purple-600"
        }`}
      >
        <div className="text-white">{icon}</div>
      </div>
      <span className="text-center text-sm text-gray-700">{label}</span>
    </button>
  );
}
