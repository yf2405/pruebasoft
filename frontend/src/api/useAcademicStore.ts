import { create } from "zustand";
import axios from "axios";

// URL base de la API
const API_BASE_URL = "http://localhost:5000/api/academy";

// Define la interfaz para los datos académicos
interface Academic {
  _id: string;
  titulo: string;
  institucion: string;
  fechaInicio: string;
  fechaTerminacion: string;
}

// Define la interfaz para el estado del store
interface AcademicStore {
  academics: Academic[];
  loading: boolean;
  error: string | null;
  fetchAcademics: () => Promise<void>;
  createAcademic: (newAcademic: Omit<Academic, "_id">) => Promise<void>;
  updateAcademic: (id: string, updatedData: Partial<Academic>) => Promise<void>;
  deleteAcademic: (id: string) => Promise<void>;
}

// Define el store de Zustand
export const useAcademicStore = create<AcademicStore>((set) => ({
  academics: [],
  loading: false,
  error: null,

  // Obtener todos los registros académicos
  fetchAcademics: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<Academic[]>(`${API_BASE_URL}/academics`);
      set({ academics: response.data, loading: false });
    } catch (error) {
      set({
        error: "Error al cargar los datos académicos",
        loading: false,
      });
    }
  },

  // Crear un nuevo registro académico
createAcademic: async (newAcademic) => {
  set({ loading: true, error: null });
  try {
    // Llamada a la API
    const response = await axios.post<Academic>(`${API_BASE_URL}/academics`, newAcademic);

    // Verificar si la respuesta es válida
    if (response.status !== 201 || !response.data) {
      throw new Error("Respuesta inesperada del servidor");
    }

    // Actualizar el estado con el nuevo registro
    set((state) => ({
      academics: [...state.academics, response.data],
      loading: false,
    }));
  } catch (error:any) {
    // Capturar detalles del error
    console.error("Error al crear el registro académico:", error);

    // Actualizar el estado con el mensaje de error
    set({
      error: error.response?.data?.message || "Error al crear el registro académico",
      loading: false,
    });

    // Lanzar el error para manejarlo en el componente
    throw error;
  }
},

  // Actualizar un registro académico existente
  updateAcademic: async (id, updatedData) => {
    set({ loading: true, error: null });
    try {
      await axios.put(`${API_BASE_URL}/academics/${id}`, updatedData);
      set((state) => ({
        academics: state.academics.map((academic) =>
          academic._id === id ? { ...academic, ...updatedData } : academic
        ),
        loading: false,
      }));
    } catch (error) {
      set({
        error: "Error al actualizar el registro académico",
        loading: false,
      });
    }
  },

  // Eliminar un registro académico
  deleteAcademic: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${API_BASE_URL}/academics/${id}`);
      set((state) => ({
        academics: state.academics.filter((academic) => academic._id !== id),
        loading: false,
      }));
    } catch (error) {
      set({
        error: "Error al eliminar el registro académico",
        loading: false,
      });
    }
  },
}));
