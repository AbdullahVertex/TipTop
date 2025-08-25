import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import AddCardInput from '../../../components/AddCard/AddCardInput/AddCardInput';
import AddCardDescription from '../../../components/AddCard/AddCardDescription/AddCardDescription';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import AppSafeAreaView from '../../../components/General/SafeAreaView/SafeAreaView';
import Header from '../../../components/General/Headers/GeneralHeader';
import { Switch } from '../../../components';
import { hp } from '../../../utils/helpers/responsive';

const AddCardScreen = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [saveCard, setSaveCard] = useState(false);

  return (
    <AppSafeAreaView>
      <Header title="Add Card" />
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#fff' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView>
          <View style={styles.container}>
            <AddCardDescription />

            <View style={styles.formSection}>
              <AddCardInput
                label="Card Number"
                value={cardNumber}
                onChangeText={setCardNumber}
                placeholder="0000 0000 0000 0000"
                keyboardType="number-pad"
                rightIcon={<Icon name="card" size={24} color="#D16FFF" />}
              />

              <View style={styles.row}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <AddCardInput
                    label="Expiry Date"
                    value={expiry}
                    onChangeText={setExpiry}
                    placeholder="MM/YY"
                    keyboardType="number-pad"
                    rightIcon={
                      <Icon name="calendar-outline" size={22} color="#CBD0DC" />
                    }
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <AddCardInput
                    label="CVV"
                    value={cvv}
                    onChangeText={setCvv}
                    placeholder="•••"
                    keyboardType="number-pad"
                    rightIcon={
                      <Icon
                        name="alert-circle-outline"
                        size={22}
                        color="#CBD0DC"
                      />
                    }
                    secureTextEntry
                  />
                </View>
              </View>

              <AddCardInput
                label="Cardholder’s Name"
                value={name}
                onChangeText={setName}
                placeholder="Enter cardholder’s full name"
              />

              <View style={styles.saveRow}>
                <Switch value={saveCard} onValueChange={setSaveCard} />
                <Text style={styles.saveText}>Save Card</Text>
              </View>
            </View>

            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#A066F7', '#F472B6']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.gradientButton}
              >
                <Icon
                  name="card-outline"
                  size={22}
                  color="#fff"
                  style={{ marginRight: 8 }}
                />
                <Text style={styles.buttonText}>Add Card</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity style={styles.closeButton}>
              <View style={styles.closeCircle}>
                <Icon name="close" size={32} color="#B0B0B0" />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 8,
    backgroundColor: '#fff',
  },
  formSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 0,
  },
  saveRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 18,
  },
  saveText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#B0B0B0',
    fontWeight: '500',
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 18,
    borderRadius: 12,
    overflow: 'hidden',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: Platform.OS === 'ios' ? hp(6) : undefined,
    paddingVertical: Platform.OS === 'android' ? hp(1.7) : undefined,
    borderRadius: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  closeButton: {
    alignItems: 'center',
    marginTop: 10,
  },
  closeCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#E5E5E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddCardScreen;
