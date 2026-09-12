import { View } from 'react-native';
import Tab from './Tab';

type TabsProps = {
  tabs: { label: string; value: string }[];
  setActiveTab: (tab: string) => void;
  activeTab: string;
};

export default function Tabs({ activeTab, setActiveTab, tabs }: TabsProps) {
  return (
    <View className="mt-4 flex-row flex-wrap gap-2">
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          isActive={activeTab === tab.value}
          label={tab.label}
          onPress={() => setActiveTab(tab.value)}
        />
      ))}
    </View>
  );
}