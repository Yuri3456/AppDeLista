import React, { useState ,useEffect }from 'react';
import { View, Text, Image, StyleSheet,TouchableOpacity, AsyncStorage, FlatList, ScrollView } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';

const Money = ({navigation}) => {

    const [books, setBooks] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem("books").then(data => {
            const book = JSON.parse(data);

            console.log("data ", data);
            setBooks(book);
        })

        
    }, []);

    const onBookEdit = (bookId) => {
        const book = books.find(item => item.id === bookId);
        navigation.navigate('Main', {book: book, isEdit: true});
    }


    const onBookDelete = async (bookId) => {
        const newBooks = books.filter(item => item.id !== bookId);
        await AsyncStorage.setItem("books", JSON.stringify(newBooks));
        setBooks(newBooks);
    }

    const onBookRead = async (bookId) => {
        const newBooks = books.map(item => {
            if(item.id === bookId) {
                item.read = !item.read;
            }
            return item;
        })
        
        await AsyncStorage.setItem("books", JSON.stringify(newBooks));
        setBooks(newBooks); 
    }

    return(
        <ScrollView style={styles.container}>
            <TouchableOpacity onPress={() => {
                navigation.goBack();
            }}>
                <Image style={{alignSelf: "center" ,width: 200, height: 100}} source={require('../assets/img/logo.png')} />
            </TouchableOpacity>
            <View >
                <FlatList 
                    data={books}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => (
                        <View style={styles.itemContainer}>
                            <TouchableOpacity onPress={() => onBookRead(item.id)} style={styles.results}>
                                <Text style={[styles.textTouchable, item.read ? styles.itemRead : '']}>Nome: {item.deved} R$</Text>
                                <Text style={[styles.textTouchable, item.read ? styles.itemRead : '']}>{item.custo}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity 
                            onPress={() => onBookEdit(item.id)} 
                            style={styles.editButton}>
                                <Icon name="search-dollar" size={30} color="white" />
                            </TouchableOpacity>

                            <TouchableOpacity 
                            onPress={() => onBookDelete(item.id)} 
                            style={styles.deleteButton}>
                                <Icon name="delete" size={30} color="red" />
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#1a1a1a',
    },
    voltar: {
        fontSize: 25,
        color: "black",
        textAlign: "center",
    },
    results: {
        flexDirection: "row",
        flex: 1,
    },
    textTouchable: {
        marginTop: 20,
        marginVertical: 10,
        padding: 2,
        fontSize: 20,
        color: "white"
    },
    editButton: {

    },
    itemRead: {
        textDecorationLine: "line-through",
        color: "#95a5a6",
    },
    itemContainer: {
        flexDirection: "row",
    },
    deleteButton: {

    }
})

export default Money;