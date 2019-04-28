import React from 'react';
import { ScrollView } from 'react-native';
import { Container, Header, Content, Button, Text } from 'native-base';

import UserListItem from './UserListItem';

const userListView = props => {
    const users = props.users.map((user, i) => (
        <UserListItem
            key = {i}
            userName = {user.name}
        />
    ))
    return <ScrollView>{users}</ScrollView>
}

export default userListView;