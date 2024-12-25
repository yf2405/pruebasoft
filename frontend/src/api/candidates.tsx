import { create } from "zustand";

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
}

interface CandidateStore {
  candidates: Candidate[];
  loading: boolean;
  error: string | null;
  fetchCandidates: () => Promise<void>;
  getCandidateById: (id: string) => Promise<Candidate | null>;
  addCandidate: (candidate: Candidate) => Promise<void>;
  updateCandidate: (id: string, candidate: Partial<Candidate>) => Promise<void>;
  deleteCandidate: (id: string) => Promise<void>;
}

const API_BASE_URL = "http://localhost:5000/api/candidate";

const useCandidateStore = create<CandidateStore>((set) => ({
  candidates: [],
  loading: false,
  error: null,

  fetchCandidates: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/candidates`);
      if (!response.ok) throw new Error("Error al obtener los datos");
      const data = await response.json();
      set({ candidates: data, loading: false });
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },

  getCandidateById: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/candidates/${id}`);
      if (!response.ok) throw new Error("Error al obtener el candidato");
      return await response.json();
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
      return null;
    }
  },

  addCandidate: async (candidate) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/candidate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidate)
      });
      if (!response.ok) throw new Error("Error al agregar el candidato");
      const newCandidate = await response.json();
      set((state) => ({
        candidates: [...state.candidates, newCandidate],
        loading: false
      }));
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },

  updateCandidate: async (id, candidate) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/candidates/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidate)
      });
      if (!response.ok) throw new Error("Error al actualizar el candidato");
      const updatedCandidate = await response.json();
      set((state) => ({
        candidates: state.candidates.map((c) =>
          c.documentNumber === updatedCandidate.documentNumber
            ? updatedCandidate
            : c
        ),
        loading: false
      }));
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  },

  deleteCandidate: async (id) => {
    set({ loading: true, error: null });
    try {
      const response = await fetch(`${API_BASE_URL}/candidates/${id}`, {
        method: "DELETE"
      });
      if (!response.ok) throw new Error("Error al eliminar el candidato");
      set((state) => ({
        candidates: state.candidates.filter((c) => c.documentNumber !== id),
        loading: false
      }));
    } catch (err) {
      set({ error: (err as Error).message, loading: false });
    }
  }
}));

export default useCandidateStore;
