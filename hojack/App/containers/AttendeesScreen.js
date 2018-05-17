import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight, Image, Platform, } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { connect } from 'react-redux';

import { Colors, Styles } from '../Themes/';


class AttendeesScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'All Attendees',
        headerTitleStyle: Styles.nav.title,
    });
    
    _onItemClick(item) {
        switch (item.id) {
            case 0:
                break;
            default:
                break;
        }
    }

    render() {
        const attendeesList = [
            {
                id: '0',
                name: 'Rick Bortle',
                exist: true,
            },
            {
                id: '1',
                name: 'Bill Brasky',
                exist: true,
            },
            {
                id: '2',
                name: 'Greg Chalmers',
                exist: false,
            },
        ];

        return (
            <View style={Styles.container}>
                <View style={styles.totalEventsContainer}>
                    <Text style={{ color: '#895353' }}>Total Attendees: 1,249</Text>
                </View>
                <FlatList
                    data={attendeesList}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableHighlight onPress={() => this._onItemClick(item)}>
                                <View style={styles.listItemContainer}>
                                    <Icon name={item.exist ? "check-square" : "minus-square"} size={18} color={item.exist ? '#34bd3e' : '#ff575c'} />
                                    <Text style={styles.name}>{item.name}</Text>
                                    <Icon name="chevron-right" size={16} color={'#797979'} style={styles.arrow} />
                                </View>
                            </TouchableHighlight>
                        );
                    }}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    totalEventsContainer: {
        height: 42,
        backgroundColor: Colors.darkBlack,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: 20, 
    },
    listItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 40,
        paddingVertical: 10, 
        paddingHorizontal: 10, 
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    name: {
        marginLeft: 10, 
    },
    arrow: {
        position: 'absolute',
        right: 10,
        top: 13,
    },
});

const mapStateToProps = state => ({
    // connectivity: state.connectivity.connectivity,
});

export default connect(mapStateToProps, null)(AttendeesScreen);
