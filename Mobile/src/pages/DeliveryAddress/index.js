import React, { useState } from 'react';

import { SafeAreaView, View, Text, TouchableOpacity, TextInput } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons';

import RoundedButton from '../../components/RoundedButton';

import { adjustHorizontalMeasure } from '../../utils/adjustMeasures';
import adjustFontSize from '../../utils/adjustFontSize';

import styles from './styles';
import colors from '../../assets/var/colors';
import { useNavigation } from '@react-navigation/native';
import {useCart} from '../../contexts/cart'

const DeliveryAddress = () => {
    const navigation = useNavigation();
    const {setAddressInfo} = useCart();

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [additional, setAdditional] = useState('');

    const getName = (typed) => setName(typed);
    const getPhone = (typed) => setPhone(typed);
    const getAddres = (typed) => setAddress(typed);
    const getAdditional = (typed) => setAdditional(typed);

    const handleAddressSetting = () => {
        setAddressInfo({
            street: address,
            neighborhood: "ponta da praia",
            ad_number: "55",
            additional: additional,
            landmark: "mercado" 
        });
        navigation.navigate('PaymentOptions');
    }

    return (
        <SafeAreaView style={styles.screenContainer}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={adjustHorizontalMeasure(20)}/>
                </TouchableOpacity>
                <View style={styles.centeredContainer}>
                    <Text style={styles.headerText}>Entregar pra mim</Text>
                </View>
            </View>
            <View style={styles.bodyContainer}>
                <View style={styles.topInputContainer}>
                    <Text style={styles.bodyText}>Nome</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="Digite seu nome completo"
                        placeholderTextColor={colors.cinza}
                        onChangeText={getName}
                        value={name}
                    />
                </View>
                <View style={styles.middleInputContainer}>
                    <Text style={styles.bodyText}>Telefone ou Celular</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="(00) 00000-0000"
                        placeholderTextColor={colors.cinza}
                        onChangeText={getPhone}
                        value={phone}
                    />
                </View>
                <View style={styles.middleInputContainer}>
                    <Text style={styles.bodyText}>Endereço</Text>
                    <TextInput style={styles.input} 
                        placeholder="Ex.: Rua Olha de Almeida Machado, 123"
                        placeholderTextColor={colors.cinza}
                        onChangeText={getAddres}
                        value={address}
                    />
                </View>
                <View style={styles.bottomInputContainer}>
                    <Text style={styles.bodyText}>Complemento (casa, apartamento, etc)</Text>
                    <TextInput 
                        style={styles.input}
                        placeholder="Digite seu complemento"
                        placeholderTextColor={colors.cinza}
                        onChangeText={getAdditional}
                        value={additional}
                    />
                </View>
                <RoundedButton 
                    onPress={handleAddressSetting}
                    selected={true} 
                    text="Continuar" 
                    width={256} 
                    height={48} 
                    fontSize={16}
                />
            </View>
        </SafeAreaView>
    );
}

export default DeliveryAddress;