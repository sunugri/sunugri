import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  Dimensions,
  SafeAreaView,
  StatusBar,
  Modal,
} from 'react-native';
import { 
  Leaf, Cloud, TrendingUp, Users, User, Camera, Bell, ArrowRight,
  Home, MapPin, Newspaper, Settings, LogOut, Shield, UserCheck, 
  Globe, ChevronRight, Eye, Edit, Trash2, ChevronLeft, Send,
  Phone, Mail, HelpCircle, ThumbsUp, MessageCircle
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function SunuGriApp() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState(null);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});

  // Données des régions du Sénégal
  const senegalRegions = [
    {
      name: 'Dakar', zone: 'Côtier', population: '3,732,284',
      mainCrops: ['Maraîchage', 'Horticulture', 'Légumes'],
      weather: { temp: 26, condition: 'Venteux' },
      markets: ['Sandaga', 'Tilène', 'Castors']
    },
    {
      name: 'Thiès', zone: 'Soudano-sahélien', population: '2,016,601',
      mainCrops: ['Arachide', 'Mil', 'Maraîchage'],
      weather: { temp: 28, condition: 'Ensoleillé' },
      markets: ['Thiès Central', 'Mbour', 'Tivaouane']
    },
    {
      name: 'Saint-Louis', zone: 'Sahélien', population: '1,053,074',
      mainCrops: ['Riz', 'Tomate industrielle', 'Oignon'],
      weather: { temp: 32, condition: 'Chaud' },
      markets: ['Saint-Louis', 'Richard Toll', 'Dagana']
    }
  ];

  const cropsInfo = {
    'Arachide': {
      wolof: 'Tigadeg',
      description: 'Culture de rente principale du Sénégal',
      season: 'Hivernage (Juin-Octobre)',
      diseases: ['Rosette', 'Cercosporiose'],
      tips: 'Semis après premières pluies'
    }
  };

  const newsData = [
    {
      id: 1, 
      title: 'Nouvelle variété de mil résistante à la sécheresse',
      region: 'National', 
      date: '2 heures', 
      excerpt: 'L\'ISRA présente une variété qui résiste 45 jours sans pluie',
      category: 'Innovation'
    },
    {
      id: 2, 
      title: 'Prix de l\'arachide en hausse de 15%',
      region: 'Kaolack', 
      date: '4 heures', 
      excerpt: 'Les producteurs bénéficient d\'une meilleure valorisation',
      category: 'Marché'
    }
  ];

  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => setCurrentScreen('onboarding'), 2500);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const sendOTP = (phone) => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    Alert.alert('Code OTP', `Code envoyé au ${phone}: ${otp}`);
    setOtpCode(otp.toString());
    setOtpSent(true);
  };

  const translate = (text, targetLang) => {
    const translations = {
      'wolof': {
        'Bonjour': 'Asalamu aleykum',
        'Région': 'Dëkk'
      }
    };
    return translations[targetLang]?.[text] || text;
  };

  // Écran de démarrage
  const SplashScreen = () => (
    <View style={styles.splashContainer}>
      <StatusBar barStyle="light-content" />
      <View style={styles.splashContent}>
        <Leaf size={80} color="white" />
        <Text style={styles.splashTitle}>SunuGri</Text>
        <Text style={styles.splashSubtitle}>Sunu Liox, Sunu Gox</Text>
        <Text style={styles.splashDescription}>
          Plateforme Agricole Nationale du Sénégal
        </Text>
      </View>
    </View>
  );

  // Écran d'onboarding
  const OnboardingScreen = () => (
    <SafeAreaView style={styles.onboardingContainer}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.onboardingHeader}>
        <Leaf size={60} color="#059669" />
        <Text style={styles.onboardingTitle}>Bienvenue sur SunuGri</Text>
        <Text style={styles.onboardingSubtitle}>
          L'assistant agricole intelligent pour tous les agriculteurs du Sénégal
        </Text>
      </View>

      <ScrollView style={styles.onboardingFeatures}>
        {[
          { icon: Globe, title: '14 Régions', desc: 'Conseils adaptés à chaque zone', color: '#3b82f6' },
          { icon: Camera, title: 'Diagnostic IA', desc: 'Identifiez les maladies par photo', color: '#059669' },
          { icon: TrendingUp, title: 'Prix Marchés', desc: 'Tous les marchés du Sénégal', color: '#f59e0b' },
          { icon: Newspaper, title: 'Actualités Agricoles', desc: 'Infos et innovations', color: '#8b5cf6' }
        ].map((feature, index) => (
          <View key={index} style={styles.featureCard}>
            <View style={[styles.featureIcon, { backgroundColor: `${feature.color}15` }]}>
              <feature.icon size={24} color={feature.color} />
            </View>
            <View style={styles.featureText}>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDesc}>{feature.desc}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.onboardingButton}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => setCurrentScreen('auth')}
        >
          <Text style={styles.startButtonText}>Commencer</Text>
          <ArrowRight size={20} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );

  // Écran d'authentification
  const AuthScreen = () => {
    const [phone, setPhone] = useState('');
    const [inputOtp, setInputOtp] = useState('');
    const [name, setName] = useState('');
    const [region, setRegion] = useState('');

    const handleSendOTP = () => {
      if (phone.length >= 9) {
        sendOTP(phone);
      } else {
        Alert.alert('Erreur', 'Veuillez entrer un numéro de téléphone valide');
      }
    };

    const handleVerifyOTP = () => {
      if (inputOtp === otpCode) {
        if (phone === '771234567') {
          setUser({ phone, name: 'Admin SunuGri', region: 'Dakar', role: 'admin' });
          setIsAdmin(true);
          setCurrentScreen('admin');
        } else {
          setUser({ phone, name, region, role: 'user' });
          setCurrentScreen('home');
        }
      } else {
        Alert.alert('Erreur', 'Code OTP incorrect');
      }
    };

    return (
      <SafeAreaView style={styles.authContainer}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.authHeader}>
          <Leaf size={40} color="#059669" />
          <Text style={styles.authTitle}>
            {otpSent ? 'Vérification OTP' : 'Connexion'}
          </Text>
          <Text style={styles.authSubtitle}>
            {otpSent ? 'Entrez le code reçu par SMS' : 'Connectez-vous avec votre téléphone'}
          </Text>
        </View>

        <ScrollView style={styles.authForm}>
          <View style={styles.authCard}>
            {!otpSent ? (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Nom complet</Text>
                  <TextInput
                    style={styles.textInput}
                    value={name}
                    onChangeText={setName}
                    placeholder="Votre nom complet"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Téléphone</Text>
                  <TextInput
                    style={styles.textInput}
                    value={phone}
                    onChangeText={setPhone}
                    placeholder="+221 77 123 45 67"
                    keyboardType="phone-pad"
                  />
                </View>

                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Région</Text>
                  <TouchableOpacity
                    style={styles.selectButton}
                    onPress={() => {
                      Alert.alert(
                        'Choisir une région',
                        'Sélectionnez votre région',
                        senegalRegions.map(r => ({
                          text: r.name,
                          onPress: () => setRegion(r.name)
                        }))
                      );
                    }}
                  >
                    <Text style={styles.selectText}>
                      {region || 'Sélectionnez votre région'}
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={[styles.authButton, (!phone || !name || !region) && styles.authButtonDisabled]}
                  onPress={handleSendOTP}
                  disabled={!phone || !name || !region}
                >
                  <Text style={styles.authButtonText}>Envoyer le code OTP</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <View style={styles.inputGroup}>
                  <Text style={styles.inputLabel}>Code OTP (4 chiffres)</Text>
                  <TextInput
                    style={[styles.textInput, styles.otpInput]}
                    value={inputOtp}
                    onChangeText={setInputOtp}
                    placeholder="0000"
                    keyboardType="numeric"
                    maxLength={4}
                    textAlign="center"
                  />
                </View>

                <TouchableOpacity
                  style={[styles.authButton, inputOtp.length !== 4 && styles.authButtonDisabled]}
                  onPress={handleVerifyOTP}
                  disabled={inputOtp.length !== 4}
                >
                  <Text style={styles.authButtonText}>Vérifier le code</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setOtpSent(false)}>
                  <Text style={styles.linkText}>Modifier le numéro</Text>
                </TouchableOpacity>
              </>
            )}

            <View style={styles.adminHint}>
              <Text style={styles.adminHintText}>💡 Admin test: 771234567</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  // Page d'accueil
  const HomeScreen = () => {
    const userLanguage = user?.language || 'wolof';
    
    return (
      <SafeAreaView style={styles.homeContainer}>
        <StatusBar barStyle="light-content" />
        
        <View style={styles.homeHeader}>
          <View style={styles.homeHeaderContent}>
            <View>
              <Text style={styles.homeGreeting}>
                {translate('Bonjour', userLanguage)} {user?.name?.split(' ')[0] || 'Agriculteur'} 👋
              </Text>
              <Text style={styles.homeLocation}>
                {translate('Région', userLanguage)}: {user?.region || 'Sénégal'}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.profileButton}
              onPress={() => setCurrentScreen('profile')}
            >
              <User size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.homeContent} showsVerticalScrollIndicator={false}>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Actions rapides</Text>
            <View style={styles.quickActions}>
              <TouchableOpacity
                style={styles.actionCard}
                onPress={() => Alert.alert('Diagnostic IA', 'Fonctionnalité caméra bientôt disponible')}
              >
                <Camera size={32} color="#059669" />
                <Text style={styles.actionText}>Diagnostic</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionCard}
                onPress={() => Alert.alert('Prix Marchés', 'Mil: 450 FCFA/kg\nArachide: 520 FCFA/kg')}
              >
                <TrendingUp size={32} color="#3b82f6" />
                <Text style={styles.actionText}>Prix Marchés</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionCard}
                onPress={() => Alert.alert('Météo', 'Temps ensoleillé\nTempérature: 28-32°C')}
              >
                <Cloud size={32} color="#8b5cf6" />
                <Text style={styles.actionText}>Météo</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.actionCard}
                onPress={() => setCurrentScreen('qna')}
              >
                <Users size={32} color="#f59e0b" />
                <Text style={styles.actionText}>Communauté</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Actualités Agricoles</Text>
              <TouchableOpacity onPress={() => Alert.alert('Actualités', 'Toutes les actualités')}>
                <Text style={styles.seeAllText}>Voir tout</Text>
              </TouchableOpacity>
            </View>

            {newsData.slice(0, 2).map(news => (
              <TouchableOpacity
                key={news.id}
                style={styles.newsCard}
                onPress={() => Alert.alert(news.title, news.excerpt)}
              >
                <View style={styles.newsHeader}>
                  <Text style={styles.newsCategory}>{news.category}</Text>
                  <Text style={styles.newsDate}>{news.date}</Text>
                </View>
                <Text style={styles.newsTitle}>{news.title}</Text>
                <Text style={styles.newsExcerpt}>{news.excerpt}</Text>
                <View style={styles.newsFooter}>
                  <Text style={styles.newsRegion}>📍 {news.region}</Text>
                  <ChevronRight size={16} color="#8b5cf6" />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Régions du Sénégal</Text>
            {senegalRegions.map((region, index) => (
              <View key={index} style={styles.regionCard}>
                <View style={styles.regionHeader}>
                  <View>
                    <Text style={styles.regionName}>{region.name}</Text>
                    <Text style={styles.regionInfo}>Zone {region.zone} • {region.population} hab.</Text>
                  </View>
                  <View style={styles.weatherInfo}>
                    <Text style={styles.temperature}>{region.weather.temp}°C</Text>
                    <Text style={styles.condition}>{region.weather.condition}</Text>
                  </View>
                </View>
                
                <View style={styles.cropsSection}>
                  <Text style={styles.cropsLabel}>Cultures principales:</Text>
                  <View style={styles.cropsContainer}>
                    {region.mainCrops.slice(0, 3).map((crop, idx) => (
                      <TouchableOpacity
                        key={idx}
                        style={styles.cropTag}
                        onPress={() => Alert.alert(`Information sur ${crop}`, `Culture de la région ${region.name}`)}
                      >
                        <Text style={styles.cropTagText}>{crop}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>

                <View style={styles.regionFooter}>
                  <Text style={styles.marketsText}>
                    Marchés: {region.markets.slice(0, 2).join(', ')}
                  </Text>
                  <TouchableOpacity
                    style={styles.detailsButton}
                    onPress={() => Alert.alert(`Région: ${region.name}`, `Population: ${region.population}\nZone: ${region.zone}`)}
                  >
                    <Text style={styles.detailsButtonText}>Détails</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>

        <BottomNavigation />
      </SafeAreaView>
    );
  };

  // Page Questions & Réponses
  const QnaScreen = () => {
    const [newQuestion, setNewQuestion] = useState('');

    return (
      <SafeAreaView style={styles.qnaContainer}>
        <StatusBar barStyle="light-content" />
        
        <View style={styles.qnaHeader}>
          <View style={styles.backButtonRow}>
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => setCurrentScreen('home')}
            >
              <ChevronLeft size={24} color="white" />
            </TouchableOpacity>
            <View>
              <Text style={styles.qnaTitle}>Questions & Réponses</Text>
              <Text style={styles.qnaSubtitle}>Entraide entre agriculteurs</Text>
            </View>
          </View>
        </View>

        <ScrollView style={styles.qnaContent}>
          <View style={styles.questionForm}>
            <Text style={styles.formTitle}>Posez votre question</Text>
            <TextInput
              style={styles.questionInput}
              value={newQuestion}
              onChangeText={setNewQuestion}
              placeholder="Décrivez votre problème agricole..."
              multiline
              numberOfLines={4}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => {
                if (newQuestion.trim()) {
                  Alert.alert('Succès', 'Question publiée !');
                  setNewQuestion('');
                }
              }}
            >
              <Text style={styles.submitButtonText}>Publier</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.questionCard}>
            <Text style={styles.questionText}>Comment traiter la chenille légionnaire sur le maïs ?</Text>
            <View style={styles.questionMeta}>
              <Text style={styles.questionAuthor}>Amadou Ba • Fatick</Text>
              <Text style={styles.questionAnswers}>3 réponses</Text>
            </View>
            
            <View style={styles.responseCard}>
              <View style={styles.responseHeader}>
                <Text style={styles.responseAuthor}>Dr. Sow (Expert)</Text>
                <View style={styles.likesContainer}>
                  <ThumbsUp size={12} color="#6b7280" />
                  <Text style={styles.likesCount}>12</Text>
                </View>
              </View>
              <Text style={styles.responseContent}>
                Utilisez du Bt (Bacillus thuringiensis) en pulvérisation le soir
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  };

  // Page Profil
  const ProfileScreen = () => (
    <SafeAreaView style={styles.profileContainer}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.profileHeader}>
        <View style={styles.profileInfo}>
          <View style={styles.profileAvatar}>
            <User size={32} color="white" />
          </View>
          <View>
            <Text style={styles.profileName}>{user?.name || 'Utilisateur'}</Text>
            <Text style={styles.profileLocation}>
              {user?.region || 'Sénégal'} • {user?.role === 'admin' ? 'Administrateur' : 'Agriculteur'}
            </Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.profileContent}>
        <TouchableOpacity
          style={styles.profileMenuItem}
          onPress={() => Alert.alert('Modifier profil', 'Fonctionnalité en cours de développement')}
        >
          <Edit size={20} color="#059669" />
          <Text style={styles.profileMenuText}>Modifier le profil</Text>
          <ChevronRight size={20} color="#6b7280" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profileMenuItem}
          onPress={() => Alert.alert('Notifications', '• Prix arachide en hausse\n• Nouvelle formation ANCAR')}
        >
          <Bell size={20} color="#059669" />
          <Text style={styles.profileMenuText}>Notifications</Text>
          <View style={styles.notificationBadge} />
          <ChevronRight size={20} color="#6b7280" />
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profileMenuItem}
          onPress={() => Alert.alert('Paramètres', 'Interface de paramètres')}
        >
          <Settings size={20} color="#059669" />
          <Text style={styles.profileMenuText}>Paramètres</Text>
          <ChevronRight size={20} color="#6b7280" />
        </TouchableOpacity>

        {isAdmin && (
          <TouchableOpacity
            style={[styles.profileMenuItem, styles.adminMenuItem]}
            onPress={() => setCurrentScreen('admin')}
          >
            <Shield size={20} color="#dc2626" />
            <Text style={[styles.profileMenuText, { color: '#dc2626' }]}>Dashboard Admin</Text>
            <ChevronRight size={20} color="#6b7280" />
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={[styles.profileMenuItem, styles.logoutMenuItem]}
          onPress={() => {
            setUser(null);
            setIsAdmin(false);
            setCurrentScreen('auth');
          }}
        >
          <LogOut size={20} color="#dc2626" />
          <Text style={[styles.profileMenuText, { color: '#dc2626' }]}>Déconnexion</Text>
          <ChevronRight size={20} color="#6b7280" />
        </TouchableOpacity>
      </ScrollView>

      <BottomNavigation />
    </SafeAreaView>
  );

  // Dashboard Admin
  const AdminDashboard = () => (
    <SafeAreaView style={styles.adminContainer}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.adminHeader}>
        <View style={styles.adminHeaderContent}>
          <View>
            <Text style={styles.adminTitle}>Dashboard Admin</Text>
            <Text style={styles.adminSubtitle}>Gestion SunuGri</Text>
          </View>
          <View style={styles.adminActions}>
            <TouchableOpacity
              style={styles.adminActionButton}
              onPress={() => setCurrentScreen('home')}
            >
              <Eye size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.adminActionButton}
              onPress={() => {
                setUser(null);
                setIsAdmin(false);
                setCurrentScreen('auth');
              }}
            >
              <LogOut size={20} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView style={styles.adminContent}>
        <View style={styles.adminStatsGrid}>
          <View style={styles.adminStatCard}>
            <UserCheck size={32} color="#059669" />
            <Text style={styles.adminStatNumber}>1,247</Text>
            <Text style={styles.adminStatLabel}>Utilisateurs actifs</Text>
          </View>
          <View style={styles.adminStatCard}>
            <Globe size={32} color="#3b82f6" />
            <Text style={styles.adminStatNumber}>14</Text>
            <Text style={styles.adminStatLabel}>Régions couvertes</Text>
          </View>
          <View style={styles.adminStatCard}>
            <Camera size={32} color="#8b5cf6" />
            <Text style={styles.adminStatNumber}>3,891</Text>
            <Text style={styles.adminStatLabel}>Diagnostics IA</Text>
          </View>
          <View style={styles.adminStatCard}>
            <Newspaper size={32} color="#f59e0b" />
            <Text style={styles.adminStatNumber}>127</Text>
            <Text style={styles.adminStatLabel}>Articles publiés</Text>
          </View>
        </View>

        <View style={styles.adminSection}>
          <View style={styles.adminSectionHeader}>
            <Phone size={20} color="#dc2626" />
            <Text style={styles.adminSectionTitle}>Configuration Twilio</Text>
          </View>
          
          <View style={styles.configForm}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Account SID</Text>
              <TextInput
                style={styles.textInput}
                placeholder="ACxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
              />
            </View>
            <TouchableOpacity
              style={styles.configButton}
              onPress={() => Alert.alert('Succès', 'Configuration sauvegardée !')}
            >
              <Text style={styles.configButtonText}>Sauvegarder</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );

  // Navigation bottom
  const BottomNavigation = () => (
    <View style={styles.bottomNav}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => setCurrentScreen('home')}
      >
        <Home size={24} color={currentScreen === 'home' ? '#059669' : '#9ca3af'} />
        <Text style={[styles.navText, { color: currentScreen === 'home' ? '#059669' : '#9ca3af' }]}>
          Accueil
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => Alert.alert('Régions', 'Liste des 14 régions du Sénégal')}
      >
        <MapPin size={24} color="#9ca3af" />
        <Text style={[styles.navText, { color: '#9ca3af' }]}>
          Régions
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => Alert.alert('Actualités', 'Dernières nouvelles agricoles')}
      >
        <Newspaper size={24} color="#9ca3af" />
        <Text style={[styles.navText, { color: '#9ca3af' }]}>
          Actualités
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => setCurrentScreen('profile')}
      >
        <User size={24} color={currentScreen === 'profile' ? '#059669' : '#9ca3af'} />
        <Text style={[styles.navText, { color: currentScreen === 'profile' ? '#059669' : '#9ca3af' }]}>
          Profil
        </Text>
      </TouchableOpacity>
    </View>
  );

  // Rendu principal
  switch(currentScreen) {
    case 'splash':
      return <SplashScreen />;
    case 'onboarding':
      return <OnboardingScreen />;
    case 'auth':
      return <AuthScreen />;
    case 'home':
      return <HomeScreen />;
    case 'qna':
      return <QnaScreen />;
    case 'profile':
      return <ProfileScreen />;
    case 'admin':
      return <AdminDashboard />;
    default:
      return <SplashScreen />;
  }
}

// Styles
const styles = StyleSheet.create({
  // Splash Screen
  splashContainer: {
    flex: 1,
    backgroundColor: '#059669',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  splashSubtitle: {
    fontSize: 20,
    color: 'white',
    opacity: 0.9,
  },
  splashDescription: {
    fontSize: 14,
    color: 'white',
    opacity: 0.75,
    marginTop: 8,
    textAlign: 'center',
  },

  // Onboarding
  onboardingContainer: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  onboardingHeader: {
    alignItems: 'center',
    padding: 40,
    paddingTop: 60,
  },
  onboardingTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 16,
    marginBottom: 8,
  },
  onboardingSubtitle: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
  },
  onboardingFeatures: {
    flex: 1,
    paddingHorizontal: 24,
  },
  featureCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 14,
    color: '#6b7280',
  },
  onboardingButton: {
    padding: 24,
  },
  startButton: {
    backgroundColor: '#059669',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    gap: 8,
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  // Auth Screen
  authContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  authHeader: {
    alignItems: 'center',
    padding: 40,
    paddingTop: 60,
  },
  authTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  authSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
  },
  authForm: {
    flex: 1,
    paddingHorizontal: 24,
  },
  authCard: {
    backgroundColor: 'white',
    padding: 24,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  selectButton: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 12,
  },
  selectText: {
    fontSize: 16,
    color: '#6b7280',
  },
  otpInput: {
    textAlign: 'center',
    fontSize: 24,
    letterSpacing: 8,
  },
  authButton: {
    backgroundColor: '#059669',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  authButtonDisabled: {
    opacity: 0.5,
  },
  authButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  linkText: {
    color: '#6b7280',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 16,
  },
  adminHint: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  adminHintText: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },

  // Home Screen
  homeContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  homeHeader: {
    backgroundColor: '#059669',
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  homeHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 60,
    paddingBottom: 30,
  },
  homeGreeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  homeLocation: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  profileButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 8,
    borderRadius: 20,
  },
  homeContent: {
    flex: 1,
    paddingBottom: 100,
  },
  section: {
    paddingHorizontal: 24,
    marginTop: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  seeAllText: {
    fontSize: 14,
    color: '#8b5cf6',
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  actionCard: {
    backgroundColor: 'white',
    width: (width - 60) / 2,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  actionText: {
    fontSize: 14,
    fontWeight: '500',
    marginTop: 8,
    textAlign: 'center',
  },
  newsCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#8b5cf6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  newsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  newsCategory: {
    fontSize: 12,
    backgroundColor: '#f3f4f6',
    color: '#374151',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  newsDate: {
    fontSize: 12,
    color: '#6b7280',
  },
  newsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  newsExcerpt: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8,
    lineHeight: 16,
  },
  newsFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  newsRegion: {
    fontSize: 12,
    color: '#8b5cf6',
    fontWeight: '500',
  },
  regionCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  regionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  regionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  regionInfo: {
    fontSize: 12,
    color: '#6b7280',
  },
  weatherInfo: {
    alignItems: 'flex-end',
  },
  temperature: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#059669',
  },
  condition: {
    fontSize: 12,
    color: '#6b7280',
  },
  cropsSection: {
    marginBottom: 16,
  },
  cropsLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  cropsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  cropTag: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  cropTagText: {
    fontSize: 12,
    color: '#166534',
  },
  regionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  marketsText: {
    fontSize: 12,
    color: '#6b7280',
    flex: 1,
  },
  detailsButton: {
    borderWidth: 1,
    borderColor: '#059669',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  detailsButtonText: {
    fontSize: 12,
    color: '#059669',
  },

  // QNA Screen
  qnaContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  qnaHeader: {
    backgroundColor: '#f59e0b',
  },
  backButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 24,
    paddingTop: 60,
    gap: 16,
  },
  backButton: {
    padding: 4,
  },
  qnaTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  qnaSubtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  qnaContent: {
    flex: 1,
    padding: 24,
  },
  questionForm: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  formTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  questionInput: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    padding: 8,
    fontSize: 14,
    textAlignVertical: 'top',
    minHeight: 80,
  },
  submitButton: {
    backgroundColor: '#f59e0b',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  questionCard: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  questionText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  questionMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  questionAuthor: {
    fontSize: 12,
    color: '#6b7280',
  },
  questionAnswers: {
    fontSize: 12,
    color: '#6b7280',
  },
  responseCard: {
    backgroundColor: '#f9fafb',
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#f59e0b',
  },
  responseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  responseAuthor: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  likesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  likesCount: {
    fontSize: 12,
    color: '#6b7280',
  },
  responseContent: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 16,
  },

  // Profile Screen
  profileContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  profileHeader: {
    backgroundColor: '#059669',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 24,
  },
  profileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  profileAvatar: {
    width: 64,
    height: 64,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  profileLocation: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  profileContent: {
    flex: 1,
    padding: 24,
    paddingBottom: 100,
  },
  profileMenuItem: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  profileMenuText: {
    fontSize: 14,
    fontWeight: '500',
    flex: 1,
    marginLeft: 12,
  },
  notificationBadge: {
    width: 8,
    height: 8,
    backgroundColor: '#dc2626',
    borderRadius: 4,
    marginRight: 8,
  },
  adminMenuItem: {
    borderLeftWidth: 3,
    borderLeftColor: '#dc2626',
  },
  logoutMenuItem: {
    borderLeftWidth: 3,
    borderLeftColor: '#dc2626',
  },

  // Admin Dashboard
  adminContainer: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  adminHeader: {
    backgroundColor: '#dc2626',
  },
  adminHeaderContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
    paddingTop: 60,
  },
  adminTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  adminSubtitle: {
    fontSize: 14,
    color: 'white',
    opacity: 0.9,
  },
  adminActions: {
    flexDirection: 'row',
    gap: 8,
  },
  adminActionButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 8,
    borderRadius: 8,
  },
  adminContent: {
    flex: 1,
    padding: 24,
  },
  adminStatsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 32,
  },
  adminStatCard: {
    backgroundColor: 'white',
    width: (width - 64) / 2,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  adminStatNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginTop: 8,
    marginBottom: 4,
  },
  adminStatLabel: {
    fontSize: 12,
    color: '#6b7280',
    textAlign: 'center',
  },
  adminSection: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  adminSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  adminSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    flex: 1,
  },
  configForm: {
    gap: 12,
  },
  configButton: {
    backgroundColor: '#dc2626',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  configButtonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },

  // Bottom Navigation
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  navText: {
    fontSize: 12,
    fontWeight: '500',
  },
});