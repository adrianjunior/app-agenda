import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Button, Text, Icon, StyleProvider, Root, Spinner } from 'native-base';
import material from '../native-base-theme/variables/material';
import getTheme from '../native-base-theme/components';
import firebase from 'react-native-firebase';
import { Navigation } from 'react-native-navigation';

import UserView from './components/UserView';

export default class ViewContactScreenn extends Component {

  constructor(props) {
    super(props);
    this.contactRef = firebase.firestore().collection('contacts').doc(props.userId);
    this.unsubscribe = null;
  }

  componentDidMount() {
    this.unsubscribe = this.contactRef.onSnapshot(this.onCollectionUpdate) 
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  state = {
    user: {},
    loading: true
  }

  static options(passProps) {
    return {
        topBar: {
            title: {
                text: passProps.userName,
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

  onCollectionUpdate = (doc) => {
    let user = {};
    const { name, email, phone } = doc.data();

    user = {
      id: doc.id,
      doc, // DocumentSnapshot
      name,
      email,
      phone
    }

    this.setState({ 
      user,
      loading: false,
    });
}

  render() {
    console.log("PROPS -> " + this.props.userId)
    let content;
    if(!this.state.loading) {
      content = <UserView user={this.state.user} />
    } else {
      content = <Container style={styles.loading}>
                  <Spinner/>
                  <Text>Carregando Informações...</Text>
                </Container>
    }
    return (
      <Root>
        <StyleProvider style={getTheme(material)}>
          <Container>
            {content}
            <View style={styles.buttons}>
              <Button full info>
                  <Icon name="create"/>
                  <Text>Editar Contato</Text>
              </Button>
              <Button full danger>
                  <Icon name="trash"/>
                  <Text>Excluir Contato</Text>
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