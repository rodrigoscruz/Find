import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, Alert, TouchableOpacity } from 'react-native';

import styles from '../CompanyProducts/styles';

import { MaterialIcons } from '@expo/vector-icons';
import ProductCard from '../../components/ProductCard';

import { useNavigation, useRoute } from '@react-navigation/native';
import api from '../../services/api';

const CompanyProducts = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const {companyId} = route.params;

  const [product, setProduct] = useState({});
  const [company, setCompany] = useState({});

  const fetchCompanyProducts = async () => {
    const getProdutct = async () => {
      const res = await api.get(`/company/?id_company=${companyId}`);
      return res.data
    }
    const res = await getProdutct();
    

    setCompany(res[0]);
    setProduct(res[0].product);
  }

  useEffect(()=> {
    fetchCompanyProducts();
  }, [])

  const navigateToProductDetails = (productId, companyId) => {
    navigation.navigate('ProductDetails', {
      productId: productId,
      companyId: companyId
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.imageContainer}>
            <View style={styles.arrowBack}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <MaterialIcons name="arrow-back" color="black" size={24}/>
              </TouchableOpacity>
            </View>
          <View style={styles.ImageCompany}>
            <Image 
              source={require('../../assets/images/CompanyLogos/logo.png')}
            />
          </View>
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.companyName}>{company.title}</Text>
          <View style={styles.rateContainer}>
            <MaterialIcons name="star" style={styles.rate}/>
            <MaterialIcons name="star" style={styles.rate}/>
            <MaterialIcons name="star" style={styles.rate}/>
            <MaterialIcons name="star" style={styles.rate}/>
            <MaterialIcons name="star-half" style={styles.rate}/>
          </View>
          <Text style={styles.companyStatus}>Aberto</Text>
          <Text style={styles.companyAddress}>{company.address}</Text>
        </View>
      </View>
      <View style={styles.productsContainer}>
        <FlatList 
          data={product}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <ProductCard 
                Image={item.image}
                Title={item.name}
                Description={item.description}
                Price={item.price}
                onPress={() => navigateToProductDetails(item.id, companyId)}
              />
            </View>
          )}
        />
      </View>

    </View>
  )
}

export default CompanyProducts;