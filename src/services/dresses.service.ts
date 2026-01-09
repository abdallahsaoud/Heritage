import { DressType } from '../types/index';
import type { Dress } from '../types/index';
import type { Accessory } from '../types/index';
import { accessoriesService } from './accessories.service';

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

// Helper function to get related accessories for a dress
export const getRelatedAccessories = async (
  dress: Dress,
  minCount: number = 2
): Promise<Accessory[]> => {
  const allAccessories = await accessoriesService.getAll();
  
  // Get linked accessories by ID
  const linkedAccessories: Accessory[] = [];
  if (dress.relatedAccessories && dress.relatedAccessories.length > 0) {
    for (const accessoryId of dress.relatedAccessories) {
      const accessory = allAccessories.find((a) => a.id === accessoryId);
      if (accessory && accessory.available) {
        linkedAccessories.push(accessory);
      }
    }
  }
  
  // If we don't have enough, add random available accessories
  if (linkedAccessories.length < minCount) {
    const availableAccessories = allAccessories.filter(
      (a) => a.available && !linkedAccessories.find((la) => la.id === a.id)
    );
    
    // Shuffle and take what we need
    const shuffled = [...availableAccessories].sort(() => Math.random() - 0.5);
    const needed = minCount - linkedAccessories.length;
    linkedAccessories.push(...shuffled.slice(0, needed));
  }
  
  return linkedAccessories.slice(0, 3); // Max 3 accessories
};

export const dressesService = {
  getAll: async (type?: DressType): Promise<Dress[]> => {
    const products = await loadProducts();
    
    // Filter out unavailable products
    const availableProducts = products.filter((product) => product.available);
    
    if (!type) {
      return availableProducts;
    }
    
    return availableProducts.filter((product) => product.type === type);
  },

  getById: async (id: string): Promise<Dress> => {
    const products = await loadProducts();
    const product = products.find((p) => p.id === id);
    
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }
    
    // Check if product is available
    if (!product.available) {
      throw new Error(`Product with id ${id} is not available`);
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

