import { Check } from 'lucide-react-native';
import { Text, View } from 'react-native';
import { Colors } from '@/constants/theme';

type StepperProps = {
  steps: string[];
  currentStep: number;
  colors: (typeof Colors)['light'];
};

export default function Stepper({
  steps,
  currentStep,
  colors,
}: StepperProps) {
  const progress = ((currentStep - 1) / (steps.length - 1)) * 100;

  return (
    <View className="mb-8 w-full">
      <View className="mb-3 flex-row justify-between">
        {steps.map((label, index) => {
          const step = index + 1;
          const active = currentStep >= step;

          return (
            <View key={label} className="flex-row items-center gap-2">
              <View
                className="h-7 w-7 items-center justify-center rounded-full"
                style={{
                  backgroundColor: active
                    ? colors.tint
                    : colors.input,
                }}
              >
                {currentStep > step ? (
                  <Check size={14} color="#FFFFFF" />
                ) : (
                  <Text
                    className="text-[11px] font-bold"
                    style={{
                      color: active
                        ? '#FFFFFF'
                        : colors.placeholder,
                    }}
                  >
                    {step}
                  </Text>
                )}
              </View>

              <Text
                className="text-xs font-medium"
                style={{
                  color: active
                    ? colors.text
                    : colors.placeholder,
                }}
              >
                {label}
              </Text>
            </View>
          );
        })}
      </View>

      <View
        className="h-1.5 w-full overflow-hidden rounded-full"
        style={{ backgroundColor: colors.input }}
      >
        <View
          className="h-full rounded-full"
          style={{
            width: `${Math.max(progress, 5)}%`,
            backgroundColor: colors.tint,
          }}
        />
      </View>
    </View>
  );
}