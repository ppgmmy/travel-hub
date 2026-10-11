"use client";

import { useCallback, useMemo, useSyncExternalStore } from "react";

const listeners = new Map<string, Set<() => void>>();

function emit(key: string) {
  const set = listeners.get(key);
  if (!set) {
    return;
  }
  for (const listener of set) {
    listener();
  }
}

function subscribeToKey(key: string, onStoreChange: () => void) {
  let set = listeners.get(key);
  if (!set) {
    set = new Set();
    listeners.set(key, set);
  }
  set.add(onStoreChange);

  const onStorage = (event: StorageEvent) => {
    if (event.key === key || event.key === null) {
      onStoreChange();
    }
  };
  window.addEventListener("storage", onStorage);

  return () => {
    set.delete(onStoreChange);
    window.removeEventListener("storage", onStorage);
  };
}

export function useLocalJson<T>(key: string): [T | null, (next: T | null) => void] {
  const subscribe = useCallback(
    (onStoreChange: () => void) => subscribeToKey(key, onStoreChange),
    [key],
  );
  const getSnapshot = useCallback(() => window.localStorage.getItem(key), [key]);
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => null);

  const value = useMemo(() => {
    if (raw === null) {
      return null;
    }
    try {
      return JSON.parse(raw) as T;
    } catch {
      return null;
    }
  }, [raw]);

  const setValue = useCallback(
    (next: T | null) => {
      if (next === null) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(next));
      }
      emit(key);
    },
    [key],
  );

  return [value, setValue];
}
