import React from 'react';
import { ListItem, Left, Right, Text, Icon } from 'native-base';

const userListItem = props => {
    return (
        <ListItem>
            <Left>
                <Text>{props.userName}</Text>
            </Left>
            <Right>
                <Icon name="arrow-forward" />
            </Right>
        </ListItem> 
    )
}

export default userListItem;