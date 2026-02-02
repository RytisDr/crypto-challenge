"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { ReactNode } from "react";

const KEY = "crypto_quick_favorites";

type FavoritesContextValue = {
  favorites: string[];
  isHydrated: boolean;
  isFavorite: (id: string) => boolean;
  toggle: (id: string) => void;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(
  undefined,
);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      setFavorites(raw ? JSON.parse(raw) : []);
    } catch {
      setFavorites([]);
    } finally {
      setIsHydrated(true);
    }

    const onStorage = (e: StorageEvent) => {
      if (e.key === KEY) {
        try {
          setFavorites(e.newValue ? JSON.parse(e.newValue) : []);
        } catch {
          setFavorites([]);
        }
      }
    };

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const toggle = useCallback((cryptoId: string) => {
    setFavorites((previousFavorites) => {
      const updatedFavorites = previousFavorites.includes(cryptoId)
        ? previousFavorites.filter((id) => id !== cryptoId)
        : [...previousFavorites, cryptoId];
      try {
        localStorage.setItem(KEY, JSON.stringify(updatedFavorites));
      } catch {}
      return updatedFavorites;
    });
  }, []);

  const isFavorite = useCallback(
    (id: string) => favorites.includes(id),
    [favorites],
  );

  return (
    <FavoritesContext.Provider
      value={{ favorites, isHydrated, isFavorite, toggle }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavoritesContext() {
  const context = useContext(FavoritesContext);
  if (!context)
    throw new Error(
      "useFavoritesContext must be used within FavoritesProvider",
    );
  return context;
}
