import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert, Platform, } from 'react-native';
import { connect } from 'react-redux';

import normalize from '../helpers/normalizeText';
import { Colors, Styles } from '../Themes/';


class SubmitScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Submit',
    });
    
    render() {
        return (
            <View style={Styles.container}>
                <View style={Styles.subContainer}>
                    
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    
});

const mapStateToProps = state => ({
    // connectivity: state.connectivity.connectivity,
});

export default connect(mapStateToProps, null)(SubmitScreen);