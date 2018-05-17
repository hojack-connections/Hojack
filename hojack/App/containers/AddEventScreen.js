import React, { Component } from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity, Platform, } from 'react-native';
import UserInput from '../components/UserInput';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { connect } from 'react-redux';

import normalize from '../helpers/normalizeText';
import { Colors, Styles } from '../Themes/';

class AddEventScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Add Event',
        headerTitleStyle: Styles.nav.title,
    });
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            date: new Date(),
            address: '',
            city: '',
            state: '',
            zipcode: '',
            courseNo: '',
            courseName: '',
        };
    }

    onClickSave() {
        
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.inputFields}>
                    <UserInput label={'Event Name:'} value={this.state.name} onChangeText={(name) => this.setState({ name })} />
                    <UserInput label={'Date:'} value={this.state.date} datePicker onDateChanged={(date) => this.setState({ date })} />
                    <UserInput label={'Address:'} onChangeText={(address) => this.setState({ address })} />
                    <UserInput label={'City:'} onChangeText={(city) => this.setState({ city })} />
                    <UserInput label={'State:'} onChangeText={(state) => this.setState({ state })} />
                    <UserInput label={'Zip Code:'} onChangeText={(zipcode) => this.setState({ zipcode })} />
                    <UserInput label={'Course #:'} onChangeText={(courseNo) => this.setState({ courseNo })} />
                    <UserInput label={'Course Name:'} onChangeText={(courseName) => this.setState({ courseName })} />
                </View>
                <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onClickSave()}>
                    <View style={styles.saveButton}>
                        <Icon name={'check-circle'} size={25} color={Colors.white} />
                        <Text style={styles.buttonTitle}>Save Event</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.white,
    },
    inputFields: {
        paddingLeft: 20,
        paddingTop: 10,
    },
    buttonContainer: { 
        justifyContent: 'center', 
        marginTop: 30, 
        flexDirection: 'row', 
    },
    saveButton: {
        backgroundColor: '#00eaea', 
        borderRadius: 10, 
        width: '90%', 
        height: 60, 
        alignItems: 'center', 
        justifyContent: 'center', 
        flexDirection: 'row',
    },
    buttonTitle: { 
        marginLeft: 10, 
        fontSize: normalize(20), 
        color: Colors.white, 
    },
});

const mapStateToProps = state => ({
    // connectivity: state.connectivity.connectivity,
});

export default connect(mapStateToProps, null)(AddEventScreen);