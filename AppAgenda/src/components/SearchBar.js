import React from 'react';
import { TouchableWithoutFeedback } from 'react-native'
import { Icon, Input, Item } from 'native-base';

const searchBar = props => {
    return (
        <Item>
            <Icon name={props.searchIcon} />
            <Input placeholder={props.placeholder} onChange={props.update} value={props.value}/>
            <TouchableWithoutFeedback onPress={props.onPressClose}>
                <Icon name={props.iconName} />
            </TouchableWithoutFeedback>
        </Item> 
    )
}

export default searchBar;