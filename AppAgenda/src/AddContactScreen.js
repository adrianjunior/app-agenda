import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Form, Button, Text, Icon, StyleProvider, Input, Item, Label, Container, Toast, Root, Spinner } from 'native-base';
import material from '../native-base-theme/variables/material';
import getTheme from '../native-base-theme/components';
import firebase from 'react-native-firebase';
import { Navigation } from 'react-native-navigation';

export default class ContactListScreen extends Component {

  constructor(props) {
    super(props);
    this.contactsRef = firebase.firestore().collection('contacts');
  }

  componentDidMount() {
    if(this.props.user.id != undefined) {
      this.setState({name: this.props.user.name, email: this.props.user.email, phone: this.props.user.phone, id: this.props.user.id, isAdd: false})
      this.contactRef = this.contactsRef.doc(this.props.user.id)
    }
    console.log(`IS_ADD: ${this.state.isAdd}`)
  }

  state = {
    name: '',
    email: '',
    phone: '',
    id: '',
    loading: false,
    isAdd: true
  }

  static options(passProps) {
    let title
    if(passProps.user.id != undefined) {
      title = 'Editar Contato'
    } else {
      title = 'Adicionar Contato'
    }
    return {
      topBar: {
        title: {
            text: title,
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
    //Checa se os campos estão preenchidos
    if(this.state.name != '' && (this.state.email !='' || this.state.phone !='')) {
      this.setState({loading: true})
      //Checa se é um cadastro ou uma edição
      if(this.state.isAdd) {
        //Adicionando
        this.contactsRef.add({
          name: this.state.name,
          email: this.state.email,
          phone: this.state.phone
        })
        //Deu certo
        .then(() => {
          this.setState({loading: false})
          Navigation.pop(this.props.componentId)
        })
        //Não deu certo
        .catch(() => {
          this.setState({loading: false})
          Toast.show({
            text: 'O banco de dados não está respondendo no momento. Tente novamente mais tarde.',
            buttonText: 'Ok'
          })
        })
      } else {
        //Editando
        this.contactRef.set({
          name: this.state.name,
          email: this.state.email,
          phone: this.state.phone
        })
        //Deu certo
        .then(() => {
          this.setState({loading: false})
          Navigation.pop(this.props.componentId)
        })
        //Não deu certo
        .catch(() => {
          this.setState({loading: false})
          Toast.show({
            text: 'O banco de dados não está respondendo no momento. Tente novamente mais tarde.',
            buttonText: 'Ok'
          })
        })
      }
    } else {
      Toast.show({
        text: 'Um contato deve ter um nome e, pelo menos, um email ou número.',
        buttonText: 'Ok'
      })
    }
  }

  render() {
    let content
    let doing
    let icon
    let button
    if(this.state.isAdd) {
      doing = 'Adicion'
      icon = 'add'
      button = 'Adicionar Contato'
    } else {
      doing = 'Edit'
      icon = 'checkmark'
      button = 'Salvar Alterações'
    }
    if(this.state.loading) {
      content = <Container style={styles.center}>
                  <Spinner/>
                  <Text>{doing}ando Contato...</Text>
                </Container>
    }else {
      content = <Container>
                  <Form style={styles.form}>
                    <Item inlineLabel>
                        <Icon style={styles.icons} name="contact"/>
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
                          <Icon name={icon}/>
                          <Text>{button}</Text>
                      </Button>
                  </View>
                </Container>
    }
    return (
      <Root>
        <StyleProvider style={getTheme(material)}>
          {content}
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
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});
