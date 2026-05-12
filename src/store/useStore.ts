import { create } from 'zustand';

const useStore = create((set) => ({
  // Cursor state
  cursorVariant: 'default',
  setCursorVariant: (variant) => set({ cursorVariant: variant }),

  // Active section for navbar highlighting
  activeSection: 'home',
  setActiveSection: (section) => set({ activeSection: section }),

  // Mobile menu
  isMobileMenuOpen: false,
  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),
  closeMobileMenu: () => set({ isMobileMenuOpen: false }),

  // Loading state
  isLoaded: false,
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),
}));

export default useStore;
