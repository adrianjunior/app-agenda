import React, {Component} from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Container, Button, Text, Icon, StyleProvider, Root, Spinner } from 'native-base';
import material from '../native-base-theme/variables/material';
import getTheme from '../native-base-theme/components';
import firebase from 'react-native-firebase';
import { Navigation } from 'react-native-navigation';

import UserListItem from "./components/UserListItem";

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
        loading: true
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
                }
            }
        };
    }

    goToAddUser = () => {
        Navigation.push(this.props.componentId, {
            component: {
              name: 'AddContactScreen',
              passProps: {
                  user: {name: '', phone: '', email: ''}
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

    onCollectionUpdate = (querySnapshot) => {
        const users = [];
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

        this.setState({ 
            users,
            loading: false,
        });
    }
    
    render() {
        let content;
        if(!this.state.loading) {
            if(this.state.users.length > 0) {
                content =   <FlatList 
                                data={this.state.users} 
                                renderItem={({item}) => <UserListItem
                                                            key={item.id}
                                                            userName={item.name}
                                                            onItemPressed = {() => this.goToViewUser(item)}
                                                        />
                                            }
                            />
            } else {
                content = <Container>
                            <Text>Você não possui contatos cadastrados!</Text>
                            <Text>Para cadastrar um contato, clique no botão de Adicionar Contato</Text>
                          </Container>
            }
        } else {
            content = <Container style={styles.loading}>
                        <Spinner/>
                        <Text>Carregando Contatos...</Text>
                      </Container>
        }
        return (
            <Root>
                <StyleProvider style={getTheme(material)}>
                    <Container>
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
    loading: {
        justifyContent: 'center',
        alignItems: 'center'
    }
  });