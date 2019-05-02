import React from 'react';
import { FlatList } from 'react-native'

import UserListItem from "./UserListItem";

const userList = props => {
    return (
        <FlatList 
            data={props.data.filter(user => user.name.includes(props.searchState))} 
            renderItem={({item}) => <UserListItem
                                        userName={item.name}
                                        onItemPressed = {() => this.goToViewUser(item)}
                                    />
                        }
            keyExtractor={(item, index) => index.toString()}
        />
    )
}

export default userList;