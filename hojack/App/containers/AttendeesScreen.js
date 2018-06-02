import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableHighlight, Platform, } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { connect } from 'react-redux';

import { Colors, Styles } from '../Themes/';

class AttendeesScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'All Attendees',
        headerTitleStyle: Styles.nav.title,
        headerBackTitle: 'Back',
    });
    
    _onItemClick(attendee) {
        this.props.navigation.navigate('AttendeeSummaryScreen', { attendee });
    }

    render() {
        const { attendees } = this.props;

        return (
            <View style={Styles.container}>
                <View style={styles.totalEventsContainer}>
                    <Text style={{ color: '#895353' }}>Total Attendees: {attendees.length}</Text>
                </View>
                <FlatList
                    data={attendees}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableHighlight onPress={() => this._onItemClick(item)}>
                                <View style={styles.listItemContainer}>
                                    <Icon name={item.isFilled ? "check-square" : "minus-square"} size={18} color={item.isFilled ? '#34bd3e' : '#ff575c'} />
                                    <Text style={styles.name}>{item.firstname} {item.lastname}</Text>
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
    attendees: state.attendee.attendees,
});

export default connect(mapStateToProps, null)(AttendeesScreen);
