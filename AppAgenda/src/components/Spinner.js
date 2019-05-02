import React from 'react';
import { Container, Spinner, Text } from 'native-base';

const spinner = props => {
    return (
        <Container>
            <Spinner/>
            <Text>{props.label}ando Contato...</Text>
        </Container>
    )
}

export default spinner;

