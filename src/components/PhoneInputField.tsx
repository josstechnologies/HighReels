import {FieldError} from 'react-hook-form';
import {Text, View, ViewStyle} from 'react-native';
import PhoneInput from 'rn-international-phone-number';

interface PhoneInputFieldProps {
  value: string;
  onChangePhoneNumber: (value: string) => void;
  selectedCountry: any;
  onChangeSelectedCountry: (country: any) => void;
  error?: FieldError;
  placeholder?: string;
  defaultCountry?: string;
  language?: string;
}

export const PhoneInputField = ({
  value,
  onChangePhoneNumber,
  selectedCountry,
  onChangeSelectedCountry,
  error,
  placeholder,
  defaultCountry = 'US',
  language = 'eng',
}: PhoneInputFieldProps) => {
  return (
    <View className="mb-4">
      <View className="w-full">
        <PhoneInput
          value={value}
          onChangePhoneNumber={onChangePhoneNumber}
          selectedCountry={selectedCountry}
          onChangeSelectedCountry={onChangeSelectedCountry}
          defaultCountry={defaultCountry as any}
          language={language as any}
          placeholder={placeholder}
          phoneInputStyles={{
            container: {
              backgroundColor: '#FFFFFF',
              borderColor: '#ECECEC',
              borderWidth: 1,
              borderRadius: 12,
              height: 56,
            } as ViewStyle,
            input: {
              paddingLeft: 8,
              color: '#111111',
              fontSize: 16,
              fontFamily: 'PlusJakartaSans_500Medium',
            },
            flagContainer: {
              paddingRight: 0,
              borderTopLeftRadius: 12,
              borderBottomLeftRadius: 12,
              backgroundColor: 'transparent',
            },
            callingCode: {
              fontSize: 16,
              fontFamily: 'PlusJakartaSans_500Medium',
              color: '#111111',
            },
            divider: {
              backgroundColor: '#ECECEC',
            },
            caret: {
              color: '#a7a7a7',
              fontSize: 16,
            },
          }}
          modalStyles={{
            backdrop: {
              backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent dark overlay
            },
            // modal: {
            //   backgroundColor: '#FFF',
            //   borderTopLeftRadius: 16,
            //   borderTopRightRadius: 16,
            // },
            list: {
              backgroundColor: '#FFF',
            },
            searchInput: {
              borderRadius: 8,
              borderWidth: 1,
              borderColor: '#E5E7EB',
              color: '#000',
              backgroundColor: '#F9FAFB',
              height: 48,
              paddingHorizontal: 16,
              fontSize: 16,
              fontFamily: 'PlusJakartaSans_400Regular',
            },
            countryItem: {
              borderWidth: 1,
              borderColor: '#F3F4F6',
              backgroundColor: '#FFF',
              marginVertical: 4,
              paddingVertical: 12,
              borderRadius: 8,
            },
            flag: {
              fontSize: 24,
            },
            callingCode: {
              color: '#374151',
            },
            countryName: {
              color: '#000',
              fontFamily: 'PlusJakartaSans_400Regular',
            },
          }}
        />
      </View>
      {error && <Text className="text-danger-700 ml-2 mt-1 text-sm font-medium">{error.message}</Text>}
    </View>
  );
};
