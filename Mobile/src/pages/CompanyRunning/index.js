import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../contexts/auth';

import { MaterialIcons } from '@expo/vector-icons'; 
import api from '../../services/api';

import styles from './styles';
import colors from '../../assets/var/colors';

import { adjustHorizontalMeasure } from '../../utils/adjustMeasures';
import adjustFontSize from '../../utils/adjustFontSize';

import OrderCard from '../../components/OrderCard';
import RoundedButton from '../../components/RoundedButton';

import CompanySellingItems from '../CompanySellingItems'
import ProductManagement from '../ProductManagement';

const ordersDataModel = [
  {title: 'Corte Masculino', user: 'Lucas B.'},
  {title: 'Corte Masculino, Barba Masculina', user: 'Evandro S.'},
  {title: 'Sobrancelha Masculina, Corte Masculino', user: 'Tiago V.'},
];

const CompanyRunning = (props) => {
  //const [showSellingItems, setShowSellingItems] = useState(false);
  const [screenMode, setScreenMode] = useState('orders'); //3 states: 1 is default (Orders) 2 is My Products and 3 is register new product

  const navigation = useNavigation();

  const [orders, setOrders] = useState([]);

  const { loggedUser } = useAuth();

  const fetchOrders = async () => {
    const { data: orders } = await api.get(`/orders/${loggedUser.data.id}`);

    setOrders(orders);
  }

  useEffect(() => {
    fetchOrders();
  }, [screenMode]);

  const navigateToOrderDetails = (id) => {
    navigation.navigate('OrderDetails', {orderId: id});
  }

  if(screenMode === 'list-products')
    return <CompanySellingItems onPress={() => setScreenMode('orders')}/>;
  
  if(screenMode === 'create-product')
    return <ProductManagement onPress={() => setScreenMode('orders')}/>;

  if(screenMode === 'orders'){
    return (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <View style={styles.headerButtonContainer}>
              <TouchableOpacity 
                style={styles.orderButton}
              >
                <Text style={styles.orderButtonText}>Pedidos</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.serviceListButton}
                onPress={() => setScreenMode('list-products')}
              >
                <Text style={styles.serviceListButtonText}>Meus Produtos</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.roundedButtonContainer}>
              <RoundedButton 
                text="Encerrar Expediente" 
                onPress={props.onPressButton} 
                style={styles.button}
                fontSize={adjustFontSize(15)} 
                selected={true} 
                width={256}
                height={40}
              />
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.ordersListContainer}>
              <FlatList 
                data={orders}
                keyExtractor={(item, index) => String(item.id)}
                showsVerticalScrollIndicator={false}
                renderItem={({ item }) => (
                 
                    <OrderCard 
                      title={`Pedido #${item.id}`}
                      user={item.name}
                      onPress={() => navigateToOrderDetails(item.id)}
                    />
                
                )}
              />
            </View>
          </View>
        </View>
    );
  }
  return null;
}

export default CompanyRunning;