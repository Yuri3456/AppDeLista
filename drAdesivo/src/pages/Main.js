import React, {useState, useEffect} from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, AsyncStorage} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';


const Main = ({navigation}) => {

    const book = navigation.getParam("book", {
        deved: '', 
        custo: '',
        read: false
    });

    const isEdit = navigation.getParam("isEdit", false)
     
    const [deved, setDeved] = useState(book.deved);
    const [custo, setCusto] = useState(book.custo);
    const [read, setRead] = useState(book.read);

    const [books, setBooks] = useState([]);

    useEffect(() => {
        AsyncStorage.getItem("books").then(data => {
            const book = JSON.parse(data);
            setBooks(book);
        })

        
    }, []);


    const isValid = () => {
        if((deved !== undefined) && (deved !== '') , (custo !== undefined) && (custo !== '')){
            return true;
        }

        return false;
    }

    const onSave = async () => {
        if(isValid()){

            if(isEdit){
                let newBooks = books;

                newBooks.map(item => {
                    if(item.id === book.id){
                        item.deved = deved;
                        item.custo = custo;
                        item.read = read;
                    }
                    return item;
                })

                console.log("books", books);
                console.log("newBooks", newBooks);

                await AsyncStorage.setItem("books", JSON.stringify(newBooks));
            }else{
                const id = Math.random(5000).toString();
                const data = {
                  id,
                  deved,
                  custo
                };


                  books.push(data);

                  console.log(JSON.stringify(data));
                  await AsyncStorage.setItem("books", JSON.stringify(books));
            }

            navigation.navigate("Money");
        }else{
            console.log('Invalido')
        }
    }

    const onNewBook = () => {
        navigation.navigate('Money')
    }


    return(
        <View style={styles.container}>
            <View style={styles.toolBox}>
                <TouchableOpacity style={styles.logo}>
                    <Image style={{ alignSelf: "center" ,width: 150, height: 70}} source={require('../assets/img/logo.png')} />
                </TouchableOpacity>
                {/* <Text style={styles.logo}>RecoM</Text> */}
                <TouchableOpacity 
                onPress={onNewBook}
                style={styles.toolBoxButton}>
                    <Icon name="search-dollar" size={30} color="white" />
                </TouchableOpacity>
            </View>
            <View style={styles.viewInputs}>
                <Text style={styles.textInputs}>Nome do Devedor: </Text>
                <TextInput
                    value={deved}
                    onChangeText={(text) => {
                        setDeved(text);
                    }}
                    placeholder={"Nome da Pessoa: "}
                    placeholderTextColor = "white"
                    style={styles.input1}
                />
                
                <Text style={styles.textInputs}>Quantia: </Text>
                <TextInput
                 value={custo}
                 onChangeText={(text) => {
                     setCusto(text);
                 }}
                 placeholder={"Quantia em Números: "}
                 placeholderTextColor = "white"
                 style={styles.input2}
                />

                <TouchableOpacity onPress={onSave} style={styles.arquivarBotton}>
                    <Text style={styles.arquivarText}>{ isEdit ? "Atualizar" : "Arquivar" }</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    viewInputs: {
        marginVertical: 10
    },
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#1a1a1a',
    },
    input1: {
        height: 40, 
        borderColor: '#f35b04', 
        borderWidth: 1, 
        color : "white",
        marginVertical: 5,
        borderRadius: 10,
        
    },
    input2: {
        height: 40, 
        borderColor: '#f35b04', 
        borderWidth: 1, 
        color : "white",
        marginVertical: 10,
        borderRadius: 10
    },
    textInputs: {
        textAlign: "center",
        marginVertical: 10,
        fontSize: 20,
        color: 'white',
    },
    arquivarBotton: {
       backgroundColor: '#f35b04',
       alignSelf: 'center',
       borderRadius: 30,
       paddingVertical: 10,
       paddingHorizontal: 20,
       marginBottom: 20,
       marginVertical: 20
    },
    arquivarText: {
        color: 'white',
        fontSize: 20,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    logo:{
        flex: 1,
        width: 50,
        height: 50,
        
        

        // fontSize: 25,
        // color: '#fefae0',
        // backgroundColor: '#f35b04',
        // width:100,
        // height: 40,
        // alignSelf: "center",
        // borderRadius: 20,
        // textAlign: "center",
        
    },
    toolBox: {
        marginBottom: 9,
        flexDirection: "row",
    },
    toolBoxButton: {
        backgroundColor: "#f35b04",
        width: 30,
        height: 30,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50,
        
    }
});

export default Main;