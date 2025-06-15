import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, Alert, ScrollView, SafeAreaView, StatusBar } from 'react-native';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('splash');
  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [region, setRegion] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [inputOtp, setInputOtp] = useState('');

  // Les 14 régions du Sénégal
  const regions = [
    'Dakar', 'Thiès', 'Saint-Louis', 'Diourbel', 'Louga', 'Fatick',
    'Kaolack', 'Kaffrine', 'Tambacounda', 'Kédougou', 'Kolda', 
    'Ziguinchor', 'Sédhiou', 'Matam'
  ];

  useEffect(() => {
    if (currentScreen === 'splash') {
      setTimeout(() => setCurrentScreen('auth'), 2000);
    }
  }, [currentScreen]);

  const sendOTP = () => {
    const otp = '1234';
    Alert.alert('Code OTP', `Code envoyé: ${otp}`);
    setOtpCode(otp);
    setOtpSent(true);
  };

  if (currentScreen === 'splash') {
    return (
      <View style={{flex: 1, backgroundColor: '#059669', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{fontSize: 48, color: 'white', fontWeight: 'bold', marginBottom: 16}}>🌱</Text>
        <Text style={{fontSize: 32, color: 'white', fontWeight: 'bold', marginBottom: 8}}>SunuGri</Text>
        <Text style={{fontSize: 18, color: 'white', opacity: 0.9}}>Sunu Liox, Sunu Gox</Text>
        <Text style={{fontSize: 14, color: 'white', opacity: 0.7, marginTop: 8}}>
          Plateforme Agricole Nationale du Sénégal
        </Text>
      </View>
    );
  }

  if (currentScreen === 'auth') {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#f9fafb'}}>
        <View style={{alignItems: 'center', padding: 40}}>
          <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 8}}>
            {otpSent ? 'Vérification OTP' : 'Inscription SunuGri'}
          </Text>
          <Text style={{color: '#6b7280', textAlign: 'center'}}>
            {otpSent ? 'Entrez le code reçu' : 'Rejoignez la communauté agricole'}
          </Text>
        </View>

        <ScrollView style={{flex: 1, paddingHorizontal: 24}}>
          {!otpSent ? (
            <View style={{backgroundColor: 'white', padding: 24, borderRadius: 16}}>
              <View style={{marginBottom: 16}}>
                <Text style={{marginBottom: 8, fontWeight: '500'}}>Nom complet</Text>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder="Votre nom complet"
                  style={{borderWidth: 1, borderColor: '#d1d5db', padding: 12, borderRadius: 8, fontSize: 16}}
                />
              </View>

              <View style={{marginBottom: 16}}>
                <Text style={{marginBottom: 8, fontWeight: '500'}}>Téléphone</Text>
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="+221 77 123 45 67"
                  style={{borderWidth: 1, borderColor: '#d1d5db', padding: 12, borderRadius: 8, fontSize: 16}}
                />
              </View>

              <View style={{marginBottom: 20}}>
                <Text style={{marginBottom: 8, fontWeight: '500'}}>
                  Région ({regions.length} disponibles)
                </Text>
                <ScrollView style={{maxHeight: 200, borderWidth: 1, borderColor: '#d1d5db', borderRadius: 8}}>
                  {regions.map((r, index) => (
                    <TouchableOpacity
                      key={r}
                      onPress={() => setRegion(r)}
                      style={{
                        padding: 12,
                        backgroundColor: region === r ? '#059669' : 'white',
                        borderBottomWidth: index < regions.length - 1 ? 1 : 0,
                        borderBottomColor: '#f3f4f6'
                      }}
                    >
                      <Text style={{color: region === r ? 'white' : '#374151', fontSize: 16}}>
                        {r} {region === r ? '✓' : ''}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                {region && (
                  <Text style={{marginTop: 8, color: '#059669', fontSize: 14}}>
                    ✓ Région sélectionnée: {region}
                  </Text>
                )}
              </View>

              <TouchableOpacity
                onPress={sendOTP}
                disabled={!name || !phone || !region}
                style={{
                  backgroundColor: (!name || !phone || !region) ? '#d1d5db' : '#059669',
                  padding: 15,
                  borderRadius: 8,
                  alignItems: 'center'
                }}
              >
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                  Envoyer le code OTP
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{backgroundColor: 'white', padding: 24, borderRadius: 16}}>
              <View style={{marginBottom: 16}}>
                <Text style={{marginBottom: 8, fontWeight: '500'}}>Code OTP (4 chiffres)</Text>
                <TextInput
                  value={inputOtp}
                  onChangeText={setInputOtp}
                  placeholder="1234"
                  maxLength={4}
                  style={{
                    borderWidth: 1, borderColor: '#d1d5db', padding: 12, borderRadius: 8, 
                    fontSize: 24, textAlign: 'center', letterSpacing: 8
                  }}
                />
              </View>
              
              <TouchableOpacity
                onPress={() => {
                  if (inputOtp === otpCode) {
                    setUser({name, phone, region});
                    setCurrentScreen('home');
                  } else {
                    Alert.alert('Erreur', 'Code OTP incorrect');
                  }
                }}
                disabled={inputOtp.length !== 4}
                style={{
                  backgroundColor: inputOtp.length !== 4 ? '#d1d5db' : '#059669',
                  padding: 15, borderRadius: 8, alignItems: 'center', marginBottom: 16
                }}
              >
                <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
                  Vérifier le code
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setOtpSent(false)}>
                <Text style={{textAlign: 'center', color: '#6b7280'}}>
                  Modifier le numéro
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#f9fafb'}}>
      <View style={{backgroundColor: '#059669', padding: 24, paddingTop: 60, borderBottomLeftRadius: 24, borderBottomRightRadius: 24}}>
        <Text style={{fontSize: 24, color: 'white', fontWeight: 'bold', marginBottom: 4}}>
          Asalamu aleykum {user?.name?.split(' ')[0]} 👋
        </Text>
        <Text style={{color: 'white', opacity: 0.9}}>
          Dëkk: {user?.region} • Agriculteur
        </Text>
      </View>
      
      <ScrollView style={{flex: 1, padding: 24}}>
        <View style={{marginBottom: 24}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 16, color: '#111827'}}>
            Actions rapides
          </Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap', gap: 16}}>
            {[
              {icon: '📸', title: 'Diagnostic IA', desc: 'Analysez vos cultures'},
              {icon: '📈', title: 'Prix Marchés', desc: 'Consultez les prix'},
              {icon: '🌤️', title: 'Météo', desc: 'Prévisions agricoles'},
              {icon: '👥', title: 'Communauté', desc: 'Entraide agriculteurs'}
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => Alert.alert(item.title, item.desc)}
                style={{
                  backgroundColor: 'white', padding: 16, borderRadius: 12, 
                  width: '47%', alignItems: 'center',
                  shadowColor: '#000', shadowOffset: {width: 0, height: 1}, 
                  shadowOpacity: 0.1, shadowRadius: 3, elevation: 2
                }}
              >
                <Text style={{fontSize: 32, marginBottom: 8}}>{item.icon}</Text>
                <Text style={{fontWeight: 'bold', fontSize: 14, textAlign: 'center'}}>
                  {item.title}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={{backgroundColor: 'white', padding: 20, borderRadius: 16, shadowColor: '#000', shadowOffset: {width: 0, height: 1}, shadowOpacity: 0.1, shadowRadius: 3, elevation: 2}}>
          <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 12, color: '#059669'}}>
            🌱 Bienvenue sur SunuGri !
          </Text>
          <Text style={{lineHeight: 24, color: '#374151'}}>
            Votre plateforme agricole sénégalaise est prête ! Vous pouvez maintenant utiliser tous les services :
          </Text>
          <Text style={{marginTop: 12, color: '#6b7280'}}>
            • Diagnostic par IA de vos cultures{'\n'}
            • Suivi des prix sur tous les marchés{'\n'}
            • Conseils personnalisés pour votre région{'\n'}
            • Entraide avec la communauté agricole
          </Text>
          
          <View style={{marginTop: 16, padding: 12, backgroundColor: '#f0fdf4', borderRadius: 8}}>
            <Text style={{color: '#059669', fontSize: 14, fontWeight: '500'}}>
              ✅ Application fonctionnelle sur web
            </Text>
            <Text style={{color: '#059669', fontSize: 12, marginTop: 4}}>
              Toutes les 14 régions du Sénégal sont disponibles
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}