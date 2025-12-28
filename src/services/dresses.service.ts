import { DressType } from '../types/index';
import type { Dress } from '../types/index';

// Load products from static JSON file
let productsCache: Dress[] | null = null;

const loadProducts = async (): Promise<Dress[]> => {
  if (productsCache) {
    return productsCache;
  }

  try {
    const response = await fetch('/data/products.json');
    if (!response.ok) {
      throw new Error('Failed to load products');
    }
    productsCache = await response.json() as Dress[];
    return productsCache;
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
};

export const dressesService = {
  getAll: async (type?: DressType): Promise<Dress[]> => {
    const products = await loadProducts();
    
    if (!type) {
      return products;
    }
    
    return products.filter((product) => product.type === type);
  },

  getById: async (id: string): Promise<Dress> => {
    const products = await loadProducts();
    const product = products.find((p) => p.id === id);
    
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    
    return product;
  },

  // These methods are kept for type compatibility but won't work without backend
  // They can be removed later if not needed
  create: async (): Promise<Dress> => {
    throw new Error('Create operation not available in static mode');
  },

  update: async (): Promise<Dress> => {
    throw new Error('Update operation not available in static mode');
  },

  delete: async (): Promise<void> => {
    throw new Error('Delete operation not available in static mode');
  },
};

