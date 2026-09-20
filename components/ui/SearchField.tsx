import {
  TextInput,
  TextInputProps,
  useColorScheme,
  View,
} from 'react-native';
import { Search } from 'lucide-react-native';

import { Colors } from '@/constants/theme';
import { cn } from '@/utils/utils';

type SearchFieldProps = Omit<
  TextInputProps,
  'value' | 'onChangeText'
> & {
  search: string;
  setSearch: (value: string) => void;
  className?: string;
};

export default function SearchField({
  search,
  setSearch,
  className,
  placeholder = 'Search transactions...',
  ...props
}: SearchFieldProps) {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];

  return (
    <View
      className={cn(
        'mt-6 flex-row items-center rounded-[20px] border px-3',
        className,
      )}
      style={{
        backgroundColor: colors.card,
        borderColor: colors.border,
      }}
    >
      <View
        className="h-9 w-9 items-center justify-center rounded-xl"
        style={{ backgroundColor: colors.soft }}
      >
        <Search size={18} color={colors.icon} />
      </View>

      <TextInput
        {...props}
        value={search}
        onChangeText={setSearch}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholder}
        className="h-12 flex-1 px-3 text-sm font-medium"
        style={[{ color: colors.text }, props.style]}
      />
    </View>
  );
}