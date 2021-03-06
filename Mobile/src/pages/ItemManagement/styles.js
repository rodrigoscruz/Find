import { StyleSheet } from 'react-native';

import Constants from 'expo-constants';

import { adjustHorizontalMeasure, adjustVerticalMeasure } from '../../utils/adjustMeasures';
import adjustFontSize from '../../utils/adjustFontSize';

import colors from '../../assets/var/colors';
import fonts from '../../assets/var/fonts';

const styles = StyleSheet.create({
    screenContainer:{
        flex: 1,
        top: Constants.statusBarHeight,
    },
    headerContainer:{
        backgroundColor: colors.background,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        height: adjustVerticalMeasure(63.5),
        borderBottomWidth: 1,
        borderBottomColor: colors.bordarCinza,
        paddingLeft: adjustHorizontalMeasure(19.5),
    },
    headerButton:{
        marginRight: adjustHorizontalMeasure(21.67),
    },
    bodyContainer:{
        width: '100%',
        height: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    myProductsContainer:{
        backgroundColor: colors.background,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: adjustVerticalMeasure(5.5),
        paddingBottom: adjustVerticalMeasure(140),
    },
    topicContainer:{
        width: '100%',
        justifyContent: 'center',
        paddingHorizontal: adjustHorizontalMeasure(24),
    },
    topicTitleText:{
        fontFamily: fonts.montserratBold,
        fontSize: adjustFontSize(15),
        marginTop: adjustVerticalMeasure(25),
    },
    input:{
        backgroundColor: colors.textInput,
        fontFamily: fonts.montserratRegular,
        fontSize: adjustFontSize(15),
        color: colors.cinza,
        borderRadius: 7,
        paddingLeft: adjustHorizontalMeasure(15),
        marginTop: adjustVerticalMeasure(6),
        height: adjustVerticalMeasure(40),
    },
    multilineInput:{
        backgroundColor: colors.textInput,
        fontFamily: fonts.montserratRegular,
        fontSize: adjustFontSize(15),
        borderRadius: 7,
        paddingLeft: adjustHorizontalMeasure(15),
        paddingTop: adjustVerticalMeasure(7),
        marginTop: adjustVerticalMeasure(6),
        height: adjustVerticalMeasure(64),
        alignContent: 'flex-start',
        textAlignVertical: 'top',
    },
    picker:{
        marginTop: adjustVerticalMeasure(6),
        paddingVertical: adjustVerticalMeasure(7),
        paddingLeft: adjustHorizontalMeasure(15),
        color: colors.cinza,
        fontFamily: fonts.montserratRegular,
        fontSize: adjustFontSize(15),
        height: adjustVerticalMeasure(40),
        backgroundColor: colors.textInput,
    },
    pickerItem:{
        fontFamily: fonts.montserratRegular,
        fontSize: adjustFontSize(13),
        color: colors.cinza,
    },
    doneButton:{
        marginTop: adjustVerticalMeasure(40),
    },
    imageToChoose:{
        marginTop: adjustVerticalMeasure(4),
        justifyContent: 'center',
        alignItems: 'center',
        width: adjustHorizontalMeasure(88),
        height: adjustHorizontalMeasure(88),
        backgroundColor: colors.textInput,
    },
    verticalView:{
        position: 'absolute',
        width: adjustHorizontalMeasure(5),
        height: adjustVerticalMeasure(25),
        backgroundColor: colors.cinza,
        borderRadius: 3,
    },
    horizontalView:{
        position: 'absolute',
        width: adjustHorizontalMeasure(20),
        height: adjustVerticalMeasure(5),
        backgroundColor: colors.cinza,
        borderRadius: 3,
    },
    image:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: adjustVerticalMeasure(4),
        width: adjustHorizontalMeasure(88),
        height: adjustHorizontalMeasure(88),
        resizeMode: 'cover'
    },
    loadingContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles;