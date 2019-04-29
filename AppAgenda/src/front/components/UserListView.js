import React from 'react';
import { ScrollView } from 'react-native';

import UserListItem from './UserListItem';

const userListView = props => {
    const users = props.users.map((user, i) => (
        <UserListItem
            key = {i}
            userName = {user.name}
            onItemPressed = {() => props.viewUser(i)}
        />
    ))
    return <ScrollView>{users}</ScrollView>
}

export default userListView;