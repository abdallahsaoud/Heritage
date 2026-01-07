import type { Accessory } from '../types/index';
import { DressType } from '../types/index';

// Types d'accessoires
const accessoryTypes = [
  'ceinture',
  'sfifa',
  'broche',
  'collier',
  'boucles-oreilles',
  'bracelet',
  'diademe',
  'parure',
];

// Load products from static JSON file (same as dresses)
let productsCache: (Accessory | any)[] | null = null;

const loadProducts = async (): Promise<any[]> => {
  if (productsCache) {
    return productsCache;
  }

  try {
    const response = await fetch('/data/products.json');
    if (!response.ok) {
      throw new Error('Failed to load products');
    }
    productsCache = await response.json();
    return productsCache || [];
  } catch (error) {
    console.error('Error loading products:', error);
    return [];
  }
};

const getAllAccessories = async (): Promise<Accessory[]> => {
  const products = await loadProducts();
  // Filtrer uniquement les accessoires (tous les types qui ne sont pas des robes)
  const dressTypes = Object.values(DressType) as string[];
  return products.filter(
    (product) => !dressTypes.includes(product.type) && accessoryTypes.includes(product.type)
  ) as Accessory[];
};

export const accessoriesService = {
  getAll: getAllAccessories,

  getById: async (id: string): Promise<Accessory> => {
    const accessories = await getAllAccessories();
    const accessory = accessories.find((a: Accessory) => a.id === id);
    
    if (!accessory) {
      throw new Error(`Accessory with id ${id} not found`);
    }
    
    return accessory;
  },
};

