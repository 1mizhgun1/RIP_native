import { View, Text, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { resetProduct, setProduct } from '../store/productSlice';
import { axiosInstance } from '../API';

export default function ProductScreen({ route }) {
    const { id } = route.params;
    const dispatch = useDispatch();
    const { product } = useSelector((store) => store.product);
    const [ parameters, setParameters ] = useState([]);

    const getParams = (source) => {
        let params = []
        source.param_sex && params.push({key: "Пол", value: source.param_sex})
        source.param_material && params.push({key: "Материал", value: source.param_material})
        source.param_type &&  params.push({key: "Тип оправы", value: source.param_type})
        source.param_color && params.push({key: "Цвет оправы", value: source.param_color})
        source.param_form && params.push({key: "Форма", value: source.param_form})
        source.param_time && params.push({key: "Время без замены", value: source.param_time})
        source.param_brand && params.push({key: "Бренд", value: source.param_brand})
        return params
    }

    useEffect(() => {
        async function getProduct() {
            await axiosInstance.get(`/products/${id}`).then((response) => {
                dispatch(setProduct(response?.data))
                setParameters(getParams(response?.data));
            });
        }

        getProduct()

        return () => {
            dispatch(resetProduct());
        };
    }, [dispatch]);

    return (
        <View style={styles.page}>
            <Text>{product.title}</Text>
            <Image source={{ uri: product.image }} resizeMode='contain'/>
            <Text>{product.price} ₽</Text>
            <Text>Характеристики</Text>
            <View style={styles.container}>
                {parameters.map((parameter, index) => (
                    <View key={index} style={styles.row}>
                        <View style={styles.column}>
                            <Text>{parameter.key}</Text>
                        </View>
                        <View style={styles.column}>
                            <Text>{parameter.value}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        flex: 1,
        padding: 10,
    },
  });