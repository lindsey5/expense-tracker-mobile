import { ScrollView, View } from 'react-native';
import Tab from './Tab';

type TabsProps = {
  tabs: { label: string; value: string | number }[];
  setActiveTab: (tab: string | number) => void;
  activeTab: string | number;
};

export default function Tabs({ activeTab, setActiveTab, tabs }: TabsProps) {
  return (
     <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingVertical: 16, gap: 8 }}>
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          isActive={activeTab === tab.value}
          label={tab.label}
          onPress={() => setActiveTab(tab.value)}
        />
      ))}
    </ScrollView>
  );
}