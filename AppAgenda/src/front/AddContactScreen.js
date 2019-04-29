import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Form, Button, Text, Icon, StyleProvider, Input, Item, Label, Container } from 'native-base';
import material from '../../native-base-theme/variables/material';
import getTheme from '../../native-base-theme/components';
import { Navigation } from 'react-native-navigation';

export default class ContactListScreen extends Component {

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

  addContact = () => {
    console.log(`Name: ${this.state.name} / Email: ${this.state.email} / Phone: ${this.state.phone}`)
  }

  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <Form style={styles.form}>
            <Item floatingLabel>
                <Label>Nome</Label>
                <Input type="text" value={this.state.name} onChange={this.updateName} />
            </Item>
            <Item floatingLabel>
                <Label>Email</Label>
                <Input type="email" value={this.state.email} onChange={this.updateEmail} />
            </Item>
            <Item floatingLabel last>
                <Label>Telefone</Label>
                <Input type="phone" value={this.state.phone} onChange={this.updatePhone} />
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
  }
});
