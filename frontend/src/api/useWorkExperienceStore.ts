import { create } from "zustand";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/work"; // Reemplaza con tu URL base de la API

// Define el tipo para una experiencia laboral
export type WorkExperience = {
  _id: string;
  cargo: string;
  empresa: string;
  fechaInicio: Date;
  trabajaActualmente: boolean;
  logros: string[];
  recursosAdicionales: string[];
  fechaTerminacion?: Date | null | undefined;
};

// Define el estado de la tienda
interface WorkExperienceStore {
  workExperiences: WorkExperience[];
  loading: boolean;
  error: string | null;

  // Métodos
  fetchWorkExperiences: () => Promise<void>;
  createWorkExperience: (newExperience: Omit<WorkExperience, "_id">) => Promise<void>;
  deleteWorkExperience: (id: string) => Promise<void>;
}

const useWorkExperienceStore = create<WorkExperienceStore>((set) => ({
  workExperiences: [],
  loading: false,
  error: null,

  // Obtener todas las experiencias laborales
  fetchWorkExperiences: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get<WorkExperience[]>(`${API_BASE_URL}/work-experiences`);
      set({ workExperiences: response.data, loading: false });
    } catch (error) {
      console.error(error);
      set({ error: "Error al cargar las experiencias laborales", loading: false });
    }
  },

  // Crear una nueva experiencia laboral
  createWorkExperience: async (newExperience) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post<WorkExperience>(`${API_BASE_URL}/work-experiences`, newExperience);
      set((state) => ({
        workExperiences: [...state.workExperiences, response.data],
        loading: false,
      }));
    } catch (error) {
      console.error(error);
      set({ error: "Error al crear la experiencia laboral", loading: false });
    }
  },

  // Eliminar una experiencia laboral
  deleteWorkExperience: async (id) => {
    set({ loading: true, error: null });
    try {
      await axios.delete(`${API_BASE_URL}/work-experiences/${id}`);
      set((state) => ({
        workExperiences: state.workExperiences.filter((experience) => experience._id !== id),
        loading: false,
      }));
    } catch (error) {
      console.error(error);
      set({ error: "Error al eliminar la experiencia laboral", loading: false });
    }
  },
}));

export default useWorkExperienceStore;
