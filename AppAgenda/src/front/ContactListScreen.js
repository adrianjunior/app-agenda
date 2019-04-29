import React, {Component} from 'react';
import { StyleSheet } from 'react-native';
import { Container, Button, Text, Icon, StyleProvider } from 'native-base';
import material from '../../native-base-theme/variables/material';
import getTheme from '../../native-base-theme/components';
import { Navigation } from 'react-native-navigation';

import UserListView from "./components/UserListView";

export default class ContactListScreen extends Component {

    state = {
        users: [
            {name: 'Adrian', phone: '(85)996649522', email: 'adrianrfpj@gmail.com'},
            {name: 'Thais', phone: '(85)985518823', email: 'thaeren7@gmail.com'}
        ]
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
    
    constructor(props) {
        super(props);
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

    goToViewUser = (index) => {
        Navigation.push(this.props.componentId, {
            component: {
              name: 'ViewContactScreen',
              passProps: {
                  user: this.state.users[index]
              }
            }
        });
    }

    deleteUser = () => {}
    
    render() {
        let content;
        if(this.state.users.length > 0) {
            content = <UserListView users={this.state.users} viewUser={this.goToViewUser}/>
        } else {
            content = <Container>
                        <Text>Você não possui contatos cadastrados!</Text>
                        <Text>Para cadastrar um contato, clique no botão de Adicionar Contato</Text>
                      </Container>
        }
        return (
            <StyleProvider style={getTheme(material)}>
                <Container>
                    {content}
                    <Button full success onPress={this.goToAddUser}>
                        <Icon name="add"/>
                        <Text>Cadastrar Novo Contato</Text>
                    </Button>
                </Container>
            </StyleProvider>
        );
    }
}