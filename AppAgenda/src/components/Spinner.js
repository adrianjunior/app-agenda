import React from 'react';
import { StyleSheet } from 'react-native'
import { Container, Spinner, Text } from 'native-base';

const spinner = props => {
    return (
        <Container style={styles.center}>
            <Spinner/>
            <Text>{props.label}</Text>
        </Container>
    )
}

const styles = StyleSheet.create({
    center: {
      justifyContent: 'center',
      alignItems: 'center'
    }
});
  

export default spinner;

