import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Form, Button, Text, Icon, StyleProvider, Input, Item, Label, Container, Toast, Root } from 'native-base';
import material from '../native-base-theme/variables/material';
import getTheme from '../native-base-theme/components';
import firebase from 'react-native-firebase';
import { Navigation } from 'react-native-navigation';

export default class ContactListScreen extends Component {

  constructor() {
    super();
    this.contactsRef = firebase.firestore().collection('contacts');
  }

  state = {
    name: '',
    email: '',
    phone: ''
  }

  static options(passProps) {
    return {
      topBar: {
        title: {
            text: 'Adicionar Contato',
            color: '#FFFFFF',
            fontFamily: 'Helvetica',
            component: {
                alignment: 'center'
            }
        },
        backButton: {
          color: '#fff'
        },
        background: {
          color: material.brandPrimary
        }
      }
    };
  }


  updateName = (e) => {
    this.setState({name: e.nativeEvent.text})
  }

  updateEmail = (e) => {
    this.setState({email: e.nativeEvent.text})
  }

  updatePhone = (e) => {
    this.setState({phone: e.nativeEvent.text})
  }

  //Firebase
  addContact = () => {
    if(this.state.name != '' && (this.state.email !='' || this.state.phone !='')) {
      this.contactsRef.add({
        name: this.state.name,
        email: this.state.email,
        phone: this.state.phone
      })
      .then(() => {
        Toast.show({
          text: 'Contato adicionado com sucesso!.',
          buttonText: 'Ok'
        })
        this.setState({
          name: '',
          email: '',
          phone: ''
        })
        //Navigation.pop(this.props.componentId)
      })
      .catch(() => {
        Toast.show({
          text: 'O banco de dados não está respondendo no momento. Tente novamente mais tarde.',
          buttonText: 'Ok'
        })
      })
    } else {
      Toast.show({
        text: 'Um contato deve ter um nome e, pelo menos, um email ou número.',
        buttonText: 'Ok'
      })
    }
  }

  render() {
    return (
      <Root>
        <StyleProvider style={getTheme(material)}>
          <Container>
            <Form style={styles.form}>
              <Item inlineLabel>
                  <Icon style={styles.icons} name="person"/>
                  <Label>Nome</Label>
                  <Input value={this.state.name} onChange={this.updateName} />
              </Item>
              <Item inlineLabel>
                  <Icon style={styles.icons} name="mail"/>
                  <Label>Email</Label>
                  <Input keyboardType={"email-address"} value={this.state.email} onChange={this.updateEmail} />
              </Item>
              <Item inlineLabel>
                  <Icon style={styles.icons} name="call"/>
                  <Label>Telefone</Label>
                  <Input keyboardType={"phone-pad"} value={this.state.phone} onChange={this.updatePhone} />
              </Item>
            </Form>
            <View style={styles.buttons}>
                <Button full success onPress={this.addContact}>
                    <Icon name="add"/>
                    <Text>Adicionar Contato</Text>
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
  form: {
    paddingRight: 16
  },
  icons: {
    fontSize: 16,
    paddingRight: 5,
    color: '#AAAAAA'
  }
});
