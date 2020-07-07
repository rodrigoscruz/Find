import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, TouchableWithoutFeedback, TouchableOpacity, Text, TextInput, Keyboard, Alert } from 'react-native';

import RoundedButton from '../../components/RoundedButton';
import ServiceHourGrade from '../../components/ServiceHourGrade';

import { MaterialIcons } from '@expo/vector-icons';

import { adjustHorizontalMeasure, adjustVerticalMeasure } from '../../utils/adjustMeasures';

import colors from '../../assets/var/colors';

import styles from './styles';
import { useNavigation } from '@react-navigation/native';
import {useCart} from '../../contexts/cart'
import {useScheduledHour} from '../../contexts/serviceScheduling'
import api from '../../services/api';
// const hours = ['16:00', '16:30', 
//     '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', 
//     '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', 
//     '23:00', '23:30'];

const ServiceScheduling = () => {
    const navigation = useNavigation();
    const {requestInfo, setRequestInfo} = useCart();
    const { scheduledHour } = useScheduledHour();
    const [hours, setHours] = useState(["00:00"])

    const handleScheduleSetting = async () => {
        if(!scheduledHour) return Alert.alert('Error', 'Seleciona um horario para agendar');
        await setRequestInfo({
            id_company: requestInfo.id_company,
            id_client: requestInfo.id_client,
            payment: requestInfo.payment,
            local: requestInfo.local,
            schedule: scheduledHour
        });
        navigation.navigate('PaymentOptions');
    }

    const fetchTime = async () => {
        const response = await api.get(`/time?id_company=${requestInfo.id_company}`);
        console.log(response);
        setHours(response.data);
    }

    useEffect(() => {
        fetchTime();
    }, []) 

    return (
        <SafeAreaView style={styles.screenContainer}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={adjustHorizontalMeasure(20)} color={colors.cinzaEscuro}/>
                </TouchableOpacity>
                <View style={styles.centeredContainer}>
                    <Text style={styles.headerText}>Local do Profissional</Text>
                </View>
            </View>
            <TouchableWithoutFeedback style={styles.bodyContainer} onPress={()=>Keyboard.dismiss()}>
                <View style={styles.bodyContainer}>
                    <Text style={styles.inputTitle}>Quem irá até o local?</Text>
                    <TextInput style={styles.input} placeholder="Digite o nome completo" placeholderTextColor={colors.cinza}/>
                    <Text style={styles.text}>Agende um horário</Text>
                    <Text style={styles.text}>Hoje</Text>
                    <ServiceHourGrade datasource={hours} style={styles.hourGrade}/>
                    <View style={styles.buttonContainer}>
                        <RoundedButton
                            text="Continuar"
                            width={adjustHorizontalMeasure(256)}
                            height={adjustVerticalMeasure(50)}
                            selected={true}
                            onPress={() => handleScheduleSetting()}
                        />
                    </View>
                </View>
                
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

export default ServiceScheduling;