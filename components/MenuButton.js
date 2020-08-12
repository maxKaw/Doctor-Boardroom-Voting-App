import React from 'react';
import { StyleSheet } from 'react-native';
import { Icons, Ionicons } from '@expo/vector-icons';
import { DrawerActions } from 'react-navigation';

export default class MenuButton extends React.Component {
    render() {
        return(
            <Ionicons
            name="md-menu"
            color="#000000"
            size={32}
            style={StyleSheet.menuIcon}
            onPress={() => this.props.navigation.navigate('DrawerOpen')}
            />
        )
    }
}

const styles = StyleSheet.create({
    menuIcon: {
        zIndex: 9,
        position: 'absolute',
        top: 40,
        left: 20,
    }
})