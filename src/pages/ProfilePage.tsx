import React, { useState } from 'react';
import { User, MapPin, Phone, Globe, Sprout, Camera, Save, X } from 'lucide-react';

// Types définis localement
interface UserType {
  name?: string;
  phone?: string;
  region?: string;
  department?: string;
  commune?: string;
  language?: 'wolof' | 'french' | 'pulaar' | 'serere' | 'diola';
  farmerType?: 'cereals' | 'vegetables' | 'livestock' | 'mixed';
  experience?: 'beginner' | 'intermediate' | 'expert';
  totalArea?: number;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<UserType>({
    name: 'Moussa Diop',
    phone: '+221 77 123 45 67',
    region: 'Fatick',
    department: 'Fatick',
    commune: 'Fatick',
    language: 'wolof',
    farmerType: 'mixed',
    experience: 'intermediate',
    totalArea: 5.5
  });

  const [isEditing, setIsEditing] = useState(false);

  const regions = ['Dakar', 'Thiès', 'Saint-Louis', 'Fatick', 'Kaolack'];

  const languages = [
    { code: 'french', name: 'Français', flag: '🇫🇷' },
    { code: 'wolof', name: 'Wolof', flag: '🇸🇳' },
    { code: 'pulaar', name: 'Pulaar', flag: '🇸🇳' },
    { code: 'serere', name: 'Sérère', flag: '🇸🇳' },
    { code: 'diola', name: 'Diola', flag: '🇸🇳' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8">
      <div className="max-w-4xl mx-auto px-4 space-y-8">
        
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
              <User className="w-12 h-12 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
              <p className="text-gray-600 flex items-center mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {user.commune}, {user.department}, {user.region}
              </p>
              <p className="text-gray-600 flex items-center mt-1">
                <Phone className="w-4 h-4 mr-1" />
                {user.phone}
              </p>
            </div>
          </div>
        </div>

        {/* Informations */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold mb-6">Profil Agricole</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nom complet
              </label>
              <p className="px-4 py-3 bg-gray-50 rounded-lg font-medium">{user.name}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Région
              </label>
              <p className="px-4 py-3 bg-gray-50 rounded-lg font-medium">{user.region}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Langue préférée
              </label>
              <p className="px-4 py-3 bg-gray-50 rounded-lg font-medium">
                {languages.find(l => l.code === user.language)?.flag} {languages.find(l => l.code === user.language)?.name}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Superficie totale
              </label>
              <p className="px-4 py-3 bg-gray-50 rounded-lg font-medium">{user.totalArea} hectares</p>
            </div>
          </div>
        </div>

        {/* Statistiques */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-green-500 text-white p-6 rounded-2xl">
            <h3 className="text-lg font-semibold">Conseils reçus</h3>
            <p className="text-3xl font-bold">47</p>
          </div>
          <div className="bg-blue-500 text-white p-6 rounded-2xl">
            <h3 className="text-lg font-semibold">Photos analysées</h3>
            <p className="text-3xl font-bold">12</p>
          </div>
          <div className="bg-purple-500 text-white p-6 rounded-2xl">
            <h3 className="text-lg font-semibold">Communauté</h3>
            <p className="text-3xl font-bold">156</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;