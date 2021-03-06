import { StyleSheet } from 'react-native';

import Constants from 'expo-constants';

import { adjustHorizontalMeasure, adjustVerticalMeasure } from '../../utils/adjustMeasures';
import adjustFontSize from '../../utils/adjustFontSize';

import colors from '../../assets/var/colors'; 
import fonts from '../../assets/var/fonts'; 

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
  },
  headerContainer:{
    backgroundColor: colors.background,
    borderBottomWidth: 1,
    borderBottomColor: colors.bordarCinza, 
    width: '100%',
    height: adjustVerticalMeasure(61.5) + Constants.statusBarHeight,
  },
  headerButtonContainer: {
    flexDirection: 'row',
    marginTop: adjustVerticalMeasure(37) + Constants.statusBarHeight,
    marginLeft: adjustHorizontalMeasure(19.5),
  },
  orderButton: {
    marginRight: adjustHorizontalMeasure(21.6),
  },
  orderButtonText: {
    fontFamily: fonts.montserratSemiBold,
    fontSize: adjustFontSize(15),
    color: colors.cinza,
  },
  serviceListButton: {
    marginRight: adjustHorizontalMeasure(21.6),
  },
  serviceListButtonText: {
    fontFamily: fonts.montserratSemiBold,
    fontSize: adjustFontSize(15),
    color: colors.primary,
    borderBottomColor: colors.primary,
    borderBottomWidth: 2,
  },
  contentContainer: {
    height: adjustVerticalMeasure(638),
    width: '100%',
  },
  companySellingItemsContainer: {
    marginTop: adjustVerticalMeasure(24),
    height: adjustVerticalMeasure(570),
    alignItems: 'center',
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: adjustVerticalMeasure(20),
    right: adjustHorizontalMeasure(39),
  },
  button: {
    backgroundColor: colors.primary
  }

});

export default styles;