import React, { useMemo, useState } from 'react';
import { View, Alert } from 'react-native';
import SearchBar from '../../components/Games/SearchBar/SearchBar';
import SectionGrid from '../../components/Games/SectionGrid/SectionGrid';
import AppSafeAreaView from '../../components/General/SafeAreaView/SafeAreaView';
import Header from '../../components/General/Headers/GeneralHeader';

const GAMES = [
  {
    id: '1',
    title: 'Adventure Island',
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1606112219348-204d7d8b94ee?q=80&w=1080&auto=format&fit=crop', // replace with your exact artwork
  },
  {
    id: '2',
    title: 'Puzzle Match',
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1080&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Adventure Island',
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1580237072617-8aa7e0893162?q=80&w=1080&auto=format&fit=crop',
  },
  {
    id: '4',
    title: 'Puzzle Match',
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1080&auto=format&fit=crop',
  },
];

export default function GamesTabScreen({ navigation }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return GAMES;
    return GAMES.filter(g => g.title.toLowerCase().includes(q));
  }, [query]);

  return (
    <AppSafeAreaView>
      <Header title="Games" showBack={false} />

      <SearchBar value={query} onChangeText={setQuery} />

      <View style={{ flex: 1 }}>
        <SectionGrid
          title="Popular"
          data={filtered}
          onPressItem={item =>
            Alert.alert(item.title, `Rating: ${item.rating}`)
          }
        />
      </View>
    </AppSafeAreaView>
  );
}
