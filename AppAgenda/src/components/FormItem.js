import React from 'react';
import { StyleSheet } from 'react-native'
import { Icon, Input, Item, Label } from 'native-base';

const formItem = props => {
    return (
        <Item inlineLabel>
            <Icon style={styles.icons} name={props.iconName}/>
            <Label>{props.itemLabel}</Label>
            <Input value={props.inputValue} onChange={props.update} />
        </Item>  
    )
}

const styles = StyleSheet.create({
    icons: {
      fontSize: 16,
      paddingRight: 5,
      color: '#AAAAAA'
    }
});

export default formItem;