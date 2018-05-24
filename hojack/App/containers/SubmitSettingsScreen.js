import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { connect } from 'react-redux';

import normalize from '../helpers/normalizeText';
import { Colors, Styles } from '../Themes/';

class SubmitSettingsScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Submit Settings',
        headerTitleStyle: Styles.nav.title,
        headerBackTitle: 'Back',
    });

    constructor(props) {
        super(props);

        this.state = {
            receivers1: [
                {
                    id: '0',
                    email: 'pie@piemail.com',
                },
                {
                    id: '1',
                    email: 'ian.kuchman@gmail.com',
                },
                {
                    id: '2',
                    email: 'rich.noll@ads-pipe.com',
                },
            ],
            receivers2: [
                {
                    id: '0',
                    email: '<<All Attendees>>',
                },
                {
                    id: '1',
                    email: 'ian.kuchman@gmail.com',
                },
                {
                    id: '2',
                    email: 'rich.noll@ads-pipe.com',
                },
            ],
        };
    }

    _onRemoveItem(array, index) {
        var list = JSON.parse(JSON.stringify(array));
        list.splice(index, 1);
        return list;
    }

    render() {
        const { receivers1, receivers2 } = this.state;

        return (
            <View style={Styles.container}>
                <View style={styles.section}>
                    <Text style={{ color: Colors.black, fontSize: normalize(17), fontWeight: '700', }}>Send Attendence Summary To:</Text>
                </View>
                {
                    receivers1.map((item, index) => (
                        <View key={index} style={styles.listItemContainer}>
                            <TouchableOpacity onPress={() => this.setState({ receivers1: this._onRemoveItem(receivers1, index) })}>
                                <Icon name={"minus-square"} size={20} color={Colors.black} />
                            </TouchableOpacity>
                            <Text style={styles.name}>{item.email}</Text>
                        </View>
                    ))
                }
                <View style={styles.plusContainer}>
                    <TouchableOpacity onPress={() => console.log('a')}>
                        <Icon name={"plus"} size={21} color={Colors.black} />
                    </TouchableOpacity>
                </View>

                <View style={[styles.section, { marginTop: 15, }]}>
                    <Text style={{ color: Colors.black, fontSize: normalize(17), fontWeight: '700', }}>Send Certificates of Completion To:</Text>
                </View>
                {
                    receivers2.map((item, index) => (
                        <View key={index} style={styles.listItemContainer}>
                            <TouchableOpacity onPress={() => this.setState({ receivers2: this._onRemoveItem(receivers2, index) })}>
                                <Icon name={"minus-square"} size={20} color={Colors.black} />
                            </TouchableOpacity>
                            <Text style={styles.name}>{item.email}</Text>
                        </View>
                    ))
                }
                <View style={styles.plusContainer}>
                    <TouchableOpacity onPress={() => console.log('a')}>
                        <Icon name={"plus"} size={21} color={Colors.black} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    section: {
        height: 43,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    listItemContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 40,
        paddingVertical: 10, 
        paddingHorizontal: 30, 
        backgroundColor: Colors.white,
        borderBottomWidth: 1,
        borderBottomColor: 'black',
    },
    plusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 46,
        paddingVertical: 10, 
        paddingLeft: 30, 
        backgroundColor: Colors.white,
    },
});

export default SubmitSettingsScreen;
