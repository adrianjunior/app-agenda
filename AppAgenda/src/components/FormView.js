import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Form, Container, Button, Icon, Text } from 'native-base';

import FormItem from './FormItem'

const formView = props => {
    return (
        <Container>
            <Form style={styles.form}>
                <FormItem iconName={"contact"}
                          itemLabel={"Nome"}
                          inputValue={props.name}
                          update={props.updateName}
                          keyboard-type={""}
                          onBlur={""}/>

                <FormItem iconName={"mail"}
                          itemLabel={"Email"}
                          inputValue={props.email}
                          update={props.updateEmail}
                          keyboard-type={"email-address"}
                          onBlur={props.validateEmail}/>

                <FormItem iconName={"call"}
                          itemLabel={"Telefone"}
                          inputValue={props.phone}
                          update={props.updatePhone}
                          keyboard-type={"phone-pad"}
                          onBlur={""}/>
            </Form>
            <View style={styles.buttons}>
                <Button full success onPress={props.addContact}>
                    <Icon name={props.buttonIcon}/>
                    <Text>{props.buttonLabel}</Text>
                </Button>
            </View>
        </Container>   
    )
}

const styles = StyleSheet.create({
    form: {
        paddingRight: 16
    },
    buttons: {
      flex: 1,
      justifyContent: 'flex-end'
    }
});

export default formView;