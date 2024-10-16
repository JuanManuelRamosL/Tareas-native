// useUserStore.js
import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null, // Estado inicial para el usuario
  workspaces: [],
  task:[],
  workspaceActual:null,
  setUser: (newUser) => set({ user: newUser }),
  setWorkspaces: (workspaces) => set({ workspaces }),
  setTask: (task) => set({ task }),
  setWorkspaceActual: (wk) => set({ workspaceActual: wk }),
}));

export default useUserStore;
