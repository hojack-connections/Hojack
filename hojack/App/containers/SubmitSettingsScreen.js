import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, StyleSheet, TouchableOpacity, Platform, } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as settingsActions from '../actions/settingsActions';
import normalize from '../helpers/normalizeText';
import { Colors, Styles } from '../Themes/';
import * as EmailValidator from 'email-validator';

class SubmitSettingsScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Submit Settings',
        headerTitleStyle: Styles.nav.title,
        headerBackTitle: 'Back',
    });

    constructor(props) {
        super(props);

        this.state = {
            newCertReceiver: "",
            newSheetReceiver: "",
        };

        this._onAddSheetReceiver = this._onAddSheetReceiver.bind(this);
        this._onAddCertReceiver = this._onAddCertReceiver.bind(this);
        this._onRemoveSheetReceiver = this._onRemoveSheetReceiver.bind(this);
        this._onRemoveCertReceiver = this._onRemoveCertReceiver.bind(this);
    }

    _onAddSheetReceiver() {
        if (this.state.newSheetReceiver !== '') {
            this.props.actions.addSheetReceiver(this.state.newSheetReceiver);
            this.setState({ newSheetReceiver: '' });
        }
    }

    _onRemoveSheetReceiver(index) {
        this.props.actions.removeSheetReceiver(index);
    }

    _onAddCertReceiver() {
        if (this.state.newCertReceiver !== '') {
            this.props.actions.addCertReceiver(this.state.newCertReceiver);
            this.setState({ newCertReceiver: '' });
        }
    }

    _onRemoveCertReceiver(index) {
        this.props.actions.removeCertReceiver(index);
    }

    render() {
        const { certReceivers, sheetReceivers } = this.props;

        return (
            <ScrollView style={Styles.container}>
                <View style={styles.section}>
                    <Text style={{ color: Colors.black, fontSize: normalize(17), fontWeight: '700', }}>Send Attendence Summary To:</Text>
                </View>
                {
                    sheetReceivers.map((item, index) => (
                        <View key={index} style={styles.listItemContainer}>
                            <TouchableOpacity onPress={() => this._onRemoveSheetReceiver(index)}>
                                <Icon name={"minus-square"} size={20} color={Colors.black} />                                
                            </TouchableOpacity>
                            <Text style={styles.name}>{item}</Text>
                        </View>
                    ))
                }
                <View style={styles.plusContainer}>
                    <TouchableOpacity onPress={() => this._onAddSheetReceiver()}>
                        <Icon name={"plus"} size={21} color={Colors.black} />
                    </TouchableOpacity>
                    <TextInput 
                        style={{ flex: 1, marginLeft: 50, marginRight: 10, }} 
                        textAlign={'left'} 
                        value={this.state.newSheetReceiver}
                        onChangeText={(newSheetReceiver) => this.setState({ newSheetReceiver })}
                        autoCapitalize={'none'}
                        autoCorrect={false} 
                        underlineColorAndroid="transparent"
                        placeholder="Input new email address"
                    />
                </View>

                <View style={[styles.section, { marginTop: 15, }]}>
                    <Text style={{ color: Colors.black, fontSize: normalize(17), fontWeight: '700', }}>Send Certificates of Completion To:</Text>
                </View>
                {
                    certReceivers.map((item, index) => (
                        <View key={index} style={styles.listItemContainer}>
                            <TouchableOpacity onPress={() => this._onRemoveCertReceiver(index)}>
                                <Icon name={"minus-square"} size={20} color={Colors.black} />
                            </TouchableOpacity>
                            <Text style={styles.name}>{item}</Text>
                        </View>
                    ))
                }
                <View style={styles.plusContainer}>
                    <TouchableOpacity onPress={() => this._onAddCertReceiver()}>
                        <Icon name={"plus"} size={21} color={Colors.black} />
                    </TouchableOpacity>
                    <TextInput 
                        style={{ flex: 1, marginLeft: 50, marginRight: 10, }} 
                        textAlign={'left'} 
                        value={this.state.newCertReceiver}
                        onChangeText={(newCertReceiver) => this.setState({ newCertReceiver })}
                        autoCapitalize={'none'}
                        autoCorrect={false} 
                        underlineColorAndroid="transparent"
                        placeholder="Input new email address"
                    />
                </View>
            </ScrollView>
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

const mapStateToProps = state => ({
    certReceivers: state.settings.certReceivers,
    sheetReceivers: state.settings.sheetReceivers,
});

function mapDispatchToProps(dispatch) {
    return {
      actions: bindActionCreators({ ...settingsActions, }, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubmitSettingsScreen);
