import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Platform, } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import DatePicker from 'react-native-datepicker';

import { Colors, Styles } from '../Themes/';

class UserInput extends Component {
    render() {
        const { label, datePicker, readOnly, arrow } = this.props;

        return (
            <TouchableOpacity onPress={this.props.onClickEvent}>
                <View style={styles.container} >
                    <Text style={styles.label}>{label}</Text>
                    {
                        datePicker ? 
                            <DatePicker
                                style={{ flex: 1, marginRight: 10, height: 40, }}
                                date={this.props.value}
                                mode="date"
                                format="MMM DD, YYYY"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        display: 'none',
                                    },
                                    dateInput: {
                                        marginLeft: 15,
                                        borderWidth: 0,
                                        alignItems: 'flex-end',
                                    },
                                }}
                                onDateChange={this.props.onDateChanged}
                            />
                        :
                            <TextInput 
                                style={{ marginLeft: 15, flex: 1, marginRight: readOnly ? 30 : 10, }} 
                                editable={!readOnly} 
                                textAlign={'left'} 
                                value={this.props.value}
                                onChangeText={this.props.onChangeText}                            
                            />
                    }
                    {
                        arrow &&
                        <Icon name="chevron-right" size={16} color={'#797979'} style={styles.arrow} />
                    }
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flexDirection: 'row',
        flex: 1,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        height: 46, 
    },
    label: {
        fontSize: 16, 
        fontWeight: '700',
    },
    arrow: {
        position: 'absolute',
        right: 10,
        top: 14,
    },
});

export default UserInput;
