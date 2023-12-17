import { View, Text, StyleSheet, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { resetProduct, setProduct } from '../store/productSlice';
import { axiosInstance } from '../API';
import Loading from '../components/Loading';

export default function ProductScreen({ route }) {
    const [ loading, setLoading ] = useState(true);

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
                dispatch(setProduct(response?.data));
                setParameters(getParams(response?.data));
            });
        }

        getProduct().then(() => {
            setLoading(false)
        }).catch((error) => {
            console.log(error)
            setLoading(false)
        });

        return () => {
            dispatch(resetProduct());
        };
    }, [dispatch]);

    return (
        !loading ?
        <View style={styles.page}>
            <Text style={styles.title}>{product.title}</Text>
            {product.cnt > 0 ?<Text style={styles.status_green}>в наличии</Text> : <Text style={styles.status_red}>раскупили</Text>}
            <Image style={styles.image} source={{ uri: product.image }} resizeMode='contain'/>
            <Text style={styles.price}>{product.price} ₽</Text>
            <Text style={styles.param_title}>Характеристики</Text>
            <View style={styles.container}>
                {parameters.map((parameter, index) => (
                    <View key={index} style={styles.row}>
                        <View style={styles.column}>
                            <Text style={styles.param_text}>{parameter.key}</Text>
                            <View style={styles.param_dots}></View>
                        </View>
                        <View style={styles.column}>
                            <Text style={styles.param_text}>{parameter.value}</Text>
                        </View>
                    </View>
                ))}
            </View>
        </View>
        : <Loading />
    );
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#ffffff',
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
    },
    title: {
        color: '#006bd5',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        fontSize: 20,
        textAlign: 'center',
    },
    price: {
        fontSize: 28,
        fontWeight: '300',
        margin: 5,
        textAlign: 'center',
    },
    image: {
        height: 250,
        alignSelf: 'stretch',
        marginLeft: 20,
        marginRight: 20,
    },
    param_title: {
        marginTop: 25,
        padding: 4,
        backgroundColor: '#00b90e',
        fontWeight: '500',
        fontSize: 22,
        color: '#ffffff',
        marginLeft: 20,
        marginRight: 20,
        textAlign: 'center',
    },
    param_text: {
        fontSize: 16,
    },
    param_dots: {
        flex: 1,
        position: 'relative',
        marginHorizontal: 3,
        top: -3,
        height: '100%',
        borderStyle: 'dotted',
        borderBottomWidth: 2,
        borderBottomColor: '#777777',
    },
    status_green: {
        textAlign: 'center',
        marginVertical: 15,
        padding: 6,
        textTransform: 'uppercase',
        backgroundColor: '#00b90e',
        fontWeight: 'bold',
        color: '#ffffff',
        marginLeft: 145,
        marginRight: 145,
    },
    status_red: {
        textAlign: 'center',
        marginVertical: 15,
        padding: 6,
        textTransform: 'uppercase',
        backgroundColor: '#ff7200',
        fontWeight: 'bold',
        marginLeft: 145,
        marginRight: 145,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    row: {
        flexDirection: 'row',
    },
    column: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        paddingBottom: 20,
    },
  });