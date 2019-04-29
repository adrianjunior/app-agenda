import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Button, Text, Icon, StyleProvider } from 'native-base';
import material from '../../native-base-theme/variables/material';
import getTheme from '../../native-base-theme/components';
import { Navigation } from 'react-native-navigation';

import UserView from './components/UserView';

export default class ViewContactScreenn extends Component {

  static options(passProps) {
    return {
        topBar: {
            title: {
                text: passProps.user.name,
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

  render() {
    return (
      <StyleProvider style={getTheme(material)}>
        <Container>
          <UserView user={this.props.user} />
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
    );
  }
}

const styles = StyleSheet.create({
  buttons: {
    flex: 1,
    justifyContent: 'flex-end'
  }
});