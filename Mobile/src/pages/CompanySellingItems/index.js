import React, { useState, useEffect } from 'react';
import { View, FlatList, Alert } from 'react-native';

import { useAuth } from '../../contexts/auth'

import styles from './styles';

import adjustFontSize from '../../utils/adjustFontSize';

import ProductCard from '../../components/ProductCard';
import CircleButton from '../../components/CircleButton';
import UnderlinedTextButton from '../../components/UnderlinedTextButton';

import api from '../../services/api';

const CompanySellingItems = ({ onOrderPress, onItemCreation, onItemRemoval, editItem }) => {
  const [sellingItemsData, setSellingItemsData] = useState([]);

  const {loggedUser} = useAuth();

  const fetchCompanySellingItems = async () => {
    const user = loggedUser;
    let response = {};
    if(user.data.type === 'product') response = await api.get(`/my-products/${user.data.id}`)
    else if(user.data.type === 'service') response = await api.get(`/my-services/${user.data.id}`)
    setSellingItemsData(response.data);
  }

  const handleItemRemoval = (id) => {
    Alert.alert(
      'Confirmar',
      `Deseja mesmo remover o ${loggedUser.data.type === 'product' ? 'produto' : 'serviço'} em questão?`,
      [
        { 
          text: 'Sim', 
          onPress: async () => {
            try{
              const response = await api.delete(`${loggedUser.data.type === 'product' ? `my-products/${id}` : `my-services/${id}`}`);
            
              if(response.status === 200)
                Alert.alert('Concluído', 'Produto deletado com sucesso!');
              else
                Alert.alert('Erro', `Falha na remoção do ${loggedUser.data.type === 'product' ? 'produto' : 'serviço'}!`);
            }
            catch(error){
              Alert.alert('Erro', `O ${loggedUser.data.type === 'product' ? 'produto' : 'serviço'} não pode ser removido pois está incluso em algum pedido!`);
            }
            onItemRemoval();
          } 
        },
        {text: 'Não'}
      ],
      { cancelable: false }
    );
  }
  useEffect(() => {
    fetchCompanySellingItems();
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.headerButtonContainer}>
          <UnderlinedTextButton 
            fontSize={adjustFontSize(15)}
            selected={false}
            style={styles.orderButton}
            onPress={() => onOrderPress()}
          >
            Pedidos
          </UnderlinedTextButton>

          <UnderlinedTextButton 
            fontSize={adjustFontSize(15)}
            selected={true}
            style={styles.serviceListButton}
          >
          {
            loggedUser.data.type === 'product' ?
            "Meus Produtos" : "Meus Serviços"
          }
          </UnderlinedTextButton>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.companySellingItemsContainer}>
          <FlatList 
            data={sellingItemsData}
            keyExtractor={(item, index) => String(index)}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ProductCard 
                Title={item.name}
                Price={item.price}
                Image={item.img_url}
                Description={item.description}
                onDelete={() => handleItemRemoval(item.id)}
                onPress={() => editItem(item.id)}//TODO DIA 10, ESSA FUNÇÃO POSSIVELMENTE DEVE RECEBER O ID DO PRODUTO
                removable
              />
            )}
          />
        </View>
        <View style={styles.addButtonContainer}>
          <CircleButton 
            onPress={() => onItemCreation()} 
            style={styles.button}
            fontSize={35} 
            selected={true} 
            width={52}
            height={52}
          />
        </View>
      </View>
    </View>
  );
}

export default CompanySellingItems;