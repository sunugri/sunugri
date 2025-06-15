export interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  region: string;
  department: string;
  commune: string;
  language: 'wolof' | 'french' | 'pulaar' | 'serere' | 'diola';
  farmerType: 'cereals' | 'vegetables' | 'livestock' | 'mixed';
  experience: 'beginner' | 'intermediate' | 'expert';
  totalArea: number;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Plot {
  id: string;
  userId: string;
  name: string;
  area: number;
  latitude: number;
  longitude: number;
  soilType: string;
  currentCrops: string[];
  plantingDate?: Date;
  expectedHarvest?: Date;
  photos: string[];
  notes?: string;
}

export interface Region {
  name: string;
  departments: string[];
  climateZone: 'sahelien' | 'soudano-sahelien' | 'soudanien' | 'cotier';
  mainCrops: string[];
  rainySeasonStart: string;
  rainySeasonEnd: string;
}

export const SENEGAL_REGIONS: Region[] = [
  {
    name: 'Dakar',
    departments: ['Dakar', 'Guédiawaye', 'Pikine', 'Rufisque'],
    climateZone: 'cotier',
    mainCrops: ['maraîchage', 'horticulture'],
    rainySeasonStart: 'juin',
    rainySeasonEnd: 'octobre'
  },
  {
    name: 'Thiès',
    departments: ['Thiès', 'Mbour', 'Tivaouane'],
    climateZone: 'soudano-sahelien',
    mainCrops: ['arachide', 'mil', 'maraîchage'],
    rainySeasonStart: 'juin',
    rainySeasonEnd: 'octobre'
  },
  {
    name: 'Fatick',
    departments: ['Fatick', 'Foundiougne', 'Gossas'],
    climateZone: 'soudano-sahelien',
    mainCrops: ['arachide', 'mil', 'sorgho', 'niébé'],
    rainySeasonStart: 'juin',
    rainySeasonEnd: 'octobre'
  },
  {
    name: 'Kaolack',
    departments: ['Kaolack', 'Guinguinéo', 'Nioro du Rip'],
    climateZone: 'soudano-sahelien',
    mainCrops: ['arachide', 'mil', 'sorgho'],
    rainySeasonStart: 'juin',
    rainySeasonEnd: 'octobre'
  },
  {
    name: 'Saint-Louis',
    departments: ['Saint-Louis', 'Dagana', 'Podor'],
    climateZone: 'sahelien',
    mainCrops: ['riz', 'tomate industrielle', 'oignon'],
    rainySeasonStart: 'juillet',
    rainySeasonEnd: 'septembre'
  }
];