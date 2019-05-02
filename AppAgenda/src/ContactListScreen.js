import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Text, Icon, StyleProvider, Root, Header, Button } from 'native-base';
import material from '../native-base-theme/variables/material';
import getTheme from '../native-base-theme/components';
import firebase from 'react-native-firebase';
import { Navigation } from 'react-native-navigation';

import UserList from "./components/UserList";
import Spinner from "./components/Spinner";
import SearchBar from "./components/SearchBar"

export default class ContactListScreen extends Component {

    constructor() {
        super();
        this.contactsRef = firebase.firestore().collection('contacts');
        this.unsubscribe = null;
    }

    componentDidMount() {
        this.unsubscribe = this.contactsRef.onSnapshot(this.onCollectionUpdate) 
    }
    
    componentWillUnmount() {
        this.unsubscribe();
    }

    state = {
        users: [],
        loading: true,
        search: '',
        searchBarIcon: 'people'
    }

    static options(passProps) {
        return {
            topBar: {
                title: {
                    text: 'Lista de Contatos',
                    color: '#FFFFFF',
                    fontFamily: 'Helvetica',
                    component: {
                        alignment: 'center'
                    }
                },
                background: {
                    color: material.brandPrimary
                },
                visible: false,
                drawBehind: true
            }
        };
    }

    goToAddUser = () => {
        Navigation.push(this.props.componentId, {
            component: {
              name: 'AddContactScreen',
              passProps: {
                  user: {name: '', phone: '', email: '', id: undefined}
              }
            }
        });
    }

    goToViewUser = (user) => {
        Navigation.push(this.props.componentId, {
            component: {
              name: 'ViewContactScreen',
              passProps: {
                userId: user.id,
                userName: user.name
              }
            }
        });
    }

    updateSearch = (e) => {
        text =  e.nativeEvent.text
        if(text.length >= 1) {
            this.setState({searchBarIcon: 'close'})
        } else {
            this.setState({searchBarIcon: 'people'})
        }
        this.setState({search: text})
    }

    resetSearch = () => {
        if(this.state.searchBarIcon === 'close') {
            this.setState({search: '', searchBarIcon: 'people'})
        }
    }

    onCollectionUpdate = (querySnapshot) => {
        let users = [];
        querySnapshot.forEach((doc) => {
            const { name, email, phone } = doc.data();
            
            users.push({
                id: doc.id,
                doc, // DocumentSnapshot
                name,
                email,
                phone
            });
        });

        users = users.sort((a, b) => {
            let nameA=a.name.toLowerCase(), nameB=b.name.toLowerCase()
            if(nameA < nameB)
                return -1
            if(nameA > nameB)
                return 1
            return 0
        })

        this.setState({ 
            users,
            loading: false,
        });
    }
    
    render() {
        let content
        let searchBar
        if(!this.state.loading) {
            if(this.state.users.length > 0) {
                searchBar = <Header searchBar rounded info>
                                <SearchBar searchIcon="search"
                                           placeholder="Buscar Contato"
                                           update={this.updateSearch}
                                           value={this.state.search}
                                           onPressClose={this.resetSearch}
                                           iconName={this.state.searchBarIcon}/>
                            </Header>
                content = <UserList data={this.state.users}
                                    searchState={this.state.search}/>
            } else {
                searchBar = null
                content = <Container style={styles.center}>
                            <Text style={{textAlign: 'center'}}>Você não possui contatos cadastrados!</Text>
                            <Text style={{textAlign: 'center'}}>Para cadastrar um contato, clique no botão de 'Cadastrar Novo Contato'!</Text>                            
                          </Container>
            }
        } else {
            searchBar = null
            content = <Spinner style={styles.center}
                               label="Carregando Contatos..."/>

        }
        return (
            <Root>
                <StyleProvider style={getTheme(material)}>
                    <Container>
                        {searchBar}
                        {content}
                        <View style={styles.buttons}>
                            <Button full success onPress={this.goToAddUser}>
                                <Icon name="add"/>
                                <Text>Cadastrar Novo Contato</Text>
                            </Button>
                        </View>
                    </Container>
                </StyleProvider>
            </Root>
        );
    }
}

const styles = StyleSheet.create({
    buttons: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center'
    }
  });