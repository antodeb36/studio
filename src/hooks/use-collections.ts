"use client";

import { useState, useEffect, useCallback } from 'react';
import { useToast } from './use-toast';

const COLLECTIONS_KEY = 'imageflow_collections';

export const useCollections = () => {
  const [collection, setCollection] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(COLLECTIONS_KEY);
      if (item) {
        setCollection(JSON.parse(item));
      }
    } catch (error) {
      console.error("Failed to read collections from localStorage", error);
    }
  }, []);

  const updateLocalStorage = (newCollection: string[]) => {
    try {
      window.localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(newCollection));
      setCollection(newCollection);
    } catch (error) {
      console.error("Failed to save collections to localStorage", error);
      toast({
        title: "Error",
        description: "Could not save your collection. Your browser's storage might be full.",
        variant: "destructive",
      });
    }
  };

  const addToCollection = useCallback((imageId: string) => {
    if (collection.includes(imageId)) return;
    const newCollection = [...collection, imageId];
    updateLocalStorage(newCollection);
    toast({
      title: "Added to Collection",
      description: "The image has been added to your collection.",
    });
  }, [collection, toast]);

  const removeFromCollection = useCallback((imageId: string) => {
    const newCollection = collection.filter((id) => id !== imageId);
    updateLocalStorage(newCollection);
    toast({
      title: "Removed from Collection",
      description: "The image has been removed from your collection.",
    });
  }, [collection, toast]);

  const isInCollection = useCallback((imageId: string) => {
    return collection.includes(imageId);
  }, [collection]);
  
  const getCollection = useCallback(() => {
    return collection;
  }, [collection]);

  return { addToCollection, removeFromCollection, isInCollection, getCollection };
};
