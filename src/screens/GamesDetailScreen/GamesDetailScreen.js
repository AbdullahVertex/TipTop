import { ScrollView } from 'react-native';
import { AppDescription } from '../../components/GameDetail/GameDescription/GameDescription';
import { AppIcon } from '../../components/GameDetail/GameImage/GameImage';
import { AppInfo } from '../../components/GameDetail/GameInfoSection/GameInfoSection';
import { RelatedApps } from '../../components/GameDetail/RelatedApps/RelatedApps';
import Header from '../../components/General/Headers/GeneralHeader';
import AppSafeAreaView from '../../components/General/SafeAreaView/SafeAreaView';

export const GamesDetailScreen = () => {
  const appData = {
    icon: {
      uri: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1080&auto=format&fit=crop',
    }, // Random online image
    rating: 4.8,
    reviewsCount: 500,
    appName: 'Adventure Island',
    appSize: '256 MB',
    downloads: 500,
    description:
      'Adventur Island is an action-packed journey through magical lands filled with enemies, treasures, and mysteries. Unlock levels, upgrade your hero, and challenge your friends!',
    relatedApps: [
      {
        id: '1',
        image: {
          uri: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1080&auto=format&fit=crop',
        },
      }, // Random online image
      {
        id: '2',
        image: {
          uri: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1080&auto=format&fit=crop',
        },
      }, // Random online image
      {
        id: '3',
        image: {
          uri: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1080&auto=format&fit=crop',
        },
      }, // Random online image
    ],
  };

  return (
    <AppSafeAreaView>
      <ScrollView>
        <Header title="Games" />
        <AppIcon imageSource={appData.icon} />
        <AppInfo
          appName={appData.appName}
          appSize={appData.appSize}
          rating={appData.rating}
          reviewsCount={appData.reviewsCount}
          downloads={appData.downloads}
        />
        <AppDescription description={appData.description} />
        <RelatedApps apps={appData.relatedApps} />
      </ScrollView>
    </AppSafeAreaView>
  );
};
