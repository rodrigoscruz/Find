import React from 'react';
import { View, SafeAreaView, Text, TouchableOpacity } from 'react-native'; 

import { MaterialIcons } from '@expo/vector-icons'; 

import { SCREEN_WIDTH } from '../../utils/constants';

import adjustFontSize from '../../utils/adjustFontSize';

import RoundedButton from '../../components/RoundedButton';
import HourGrade from '../../components/HourGrade';
import ThreeWayPhase from '../../components/ThreeWayPhase';

import styles from './styles';
import colors from '../../assets/var/colors';
import { adjustHorizontalMeasure } from '../../utils/adjustMeasures';

const hours = [
    '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', 
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30', 
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', 
    '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', 
    '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', 
    '23:00', '23:30', '00:00'
];

const OpeningHours = () => {
    return (
        <SafeAreaView style={styles.screenContainer}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton} onPress={() => {}}>
                    <MaterialIcons name="arrow-back" size={adjustHorizontalMeasure(20)} color={colors.cinzaEscuro}/>
                </TouchableOpacity>
                <View style={styles.centeredContainer}>
                    <Text style={styles.headerText}>Cadastre-se</Text>
                </View>
            </View>
            <View style={styles.bodyContainer}>
                <ThreeWayPhase phase={3} style={styles.dots}/>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>
                        Defina horários que seus {'\n'}
                        clientes podem agendar para {'\n'}
                        ir até seu comércio:
                    </Text>
                </View>
                

                <HourGrade datasource={hours} style={styles.hourGrade}/>

                <RoundedButton style={styles.doneButton} 
                    text="Concluir" 
                    selected={true} 
                    width={328}
                    height={50} 
                    fontSize={adjustFontSize(16)}
                />
                
            </View>
        </SafeAreaView>
    );
}

export default OpeningHours;