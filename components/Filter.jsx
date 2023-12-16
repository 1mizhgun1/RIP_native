import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function Filter({ search, setSearch, minPrice, setMinPrice, maxPrice, setMaxPrice, send }) {
    const handleMinPriceInput = (text) => {
        if (parseInt(text) || text == "") {
            setMinPrice(text);
        }
    }

    const handleMaxPriceInput = (text) => {
        if (parseInt(text) || text == "") {
            setMaxPrice(text);
        }
    }

    const handleSend = () => {
        send((prev_count) => prev_count + 1)
    }

    return (
        <View style={styles.page}>
            <Text style={styles.filter_title}>Фильтр</Text>
            <View style={styles.filter}>
                <View style={styles.left_column}>
                    <Text style={styles.column_title}>Розничная цена</Text>
                    <View style={styles.price_block}>
                        <Text>от</Text>
                        <TextInput style={styles.input}
                            keyboardType="numeric"
                            placeholder="мин. цена"
                            value={minPrice}
                            onChangeText={(text) => handleMinPriceInput(text)}
                        />
                        <Text>до</Text>
                        <TextInput style={styles.input}
                            keyboardType="numeric"
                            placeholder="макс. цена"
                            value={maxPrice}
                            onChangeText={(text) => handleMaxPriceInput(text)}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.column_title}>Наименование</Text>
                    <TextInput style={styles.input}
                        autoComplete="off"
                        placeholder="Название"
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                    />
                </View>
            </View>
            <Button title="применить" onPress={() => handleSend()} />
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#ffffff',
    },
    filter_title: {
        marginTop: 10,
        fontSize: 22,
        textAlign: 'center',
    },
    filter: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5,
        padding: 5,
        borderColor: '#d8d8d8',
        borderWidth: 1,
        marginBottom: 10,
    },
    column_title: {
        marginBottom: 10,
        fontSize: 18,
    },
    left_column: {
        paddingRight: 10,
        borderRightColor: '#d8d8d8',
        borderRightWidth: 1,
    },
    price_block: {
        display: 'flex',
        flexDirection: 'row',
        gap: 7,
    },
    input: {
        position: 'relative',
        top: -7,
        paddingTop: 1,
        paddingBottom: 1,
        paddingLeft: 2,
        paddingRight: 2,
        borderColor: '#d8d8d8',
        borderWidth: 1,
        borderRadius: 5,
    }
});