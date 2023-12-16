import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React from 'react';

export default function ProductCard({ navigation, ...props }) {
    const handlePress = () => {
        navigation.navigate('Информация о товаре', { id: props.pk });
    };

    return (
        <View style={styles.card}>
            <TouchableOpacity onPress={handlePress}>
                <Image style={styles.image} source={{ uri: props.image }} resizeMode='contain'/>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>{props.price} ₽</Text>
                {props.cnt > 0 ?<Text style={styles.status_green}>в наличии</Text> : <Text style={styles.status_red}>раскупили</Text>}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        flexDirection: 'column',
        width: 300,
        height: 450,
        marginTop: 15,
        marginBottom: 15,
        borderColor: '#d8d8d8',
        borderWidth: 1,
        borderStyle: 'solid',
    },
    image: {
        height: 250,
        alignSelf: 'stretch',
        marginLeft: 20,
        marginRight: 20,
    },
    title: {
        color: '#006bd5',
        textAlign: 'center',
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
    },
    price: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: '300',
        marginTop: 15,
    },
    status_green: {
        textAlign: 'center',
        marginTop: 15,
        padding: 6,
        textTransform: 'uppercase',
        backgroundColor: '#00b90e',
        fontWeight: 'bold',
        color: '#ffffff',
        marginLeft: 95,
        marginRight: 95,
    },
    status_red: {
        textAlign: 'center',
        marginTop: 15,
        padding: 6,
        textTransform: 'uppercase',
        backgroundColor: '#ff7200',
        fontWeight: 'bold',
        marginLeft: 95,
        marginRight: 95,
    },
});