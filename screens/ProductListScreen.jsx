import { ScrollView, StyleSheet, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { axiosInstance } from '../API';
import { setProducts } from '../store/productSlice';
import ProductCard from '../components/ProductCard';
import Filter from '../components/Filter';

export default function ProductListScreen({ navigation }) {
    const dispatch = useDispatch();
    const { products } = useSelector((store) => store.product);

    const [ searchValue, setSearchValue ] = useState("")
    const [ minPriceValue, setMinPriceValue ] = useState("")
    const [ maxPriceValue, setMaxPriceValue ] = useState("")
    const [ filterSendCount, setFilterSendCount ] = useState(0)

    const price_min = () => { return parseInt(minPriceValue) ? parseInt(minPriceValue) : ""; }
    const price_max = () => { return parseInt(maxPriceValue) ? parseInt(maxPriceValue) : ""; }

    useEffect(() => {
        async function getProducts() {
            await axiosInstance.get(`/products/?status=A&title=${searchValue}&price_min=${price_min()}&price_max=${price_max()}`)
                .then((response) => dispatch(setProducts(response?.data)));
        }
        getProducts(); 
    }, [dispatch, filterSendCount]);

    return (
        <ScrollView>
            <Filter
                search={searchValue}
                setSearch={setSearchValue}
                minPrice={minPriceValue}
                setMinPrice={setMinPriceValue}
                maxPrice={maxPriceValue}
                setMaxPrice={setMaxPriceValue}
                send={setFilterSendCount}
            />
            <View style={styles.page}>
                {!!products && !!products.products &&
                    products.products.map((product, index) => <ProductCard key={index} {...product} navigation={navigation} />)}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#ffffff',
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
});