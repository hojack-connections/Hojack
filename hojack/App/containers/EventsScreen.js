import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, FlatList, Image, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import * as navigationActions from '../actions/navigationActions';
import normalize from '../helpers/normalizeText';
import { Colors, Styles } from '../Themes/';


class EventsScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: 'Events',
        headerTitleStyle: Styles.nav.title,
    });
    
    constructor(props) {
        super(props);
        this.reloadData = this.reloadData.bind(this);
    }

    componentDidMount() {
        this.reloadData();
    }

    reloadData() {
        // this.props.actions.navigationRequest();
    }

    _onItemClick(item) {
        switch (item.tag) {
            case 'a':
                break;
            default:
        }
    }

    render() {
        // const { navigationData, videoData, connectivity } = this.props;
        const eventsData = [
            {
                date: 'February 15, 2018',
                title: 'E-Week - Albany, NY',
                attendees: 52,
            },
            {
                date: 'February 13, 2018',
                title: 'CHA - Rochester, NY',
                attendees: 6,
            },
            {
                date: 'February 13, 2018',
                title: 'City of Albany Engineering Dept.',
                attendees: 7,
            },
        ];
        
        return (
            <View style={Styles.container}>
                <View style={styles.totalEventsContainer}>
                    <Text style={{ color: '#895353' }}>
                        Total Attendees:
                        1,249
                    </Text>
                    <Text style={{ color: '#538989' }}>
                        Total Events:
                        410
                    </Text>
                </View>
                <View style={{ height: 44, backgroundColor: Colors.white, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', }}>
                    <Text>
                        All Attendees
                    </Text>
                    <Text style={{ color: '#34bd3e' }}>
                        1,249
                    </Text>
                </View>
                {/* <FlatList
                    data={navigationData}
                    keyExtractor={(item, index) => item.tag}
                    renderItem={({ item, separators }) => {
                        return (
                            <TouchableHighlight onPress={() => this._onItemClick(item)}>
                                <View style={styles.listItemContainer}>                                        
                                    <Text style={styles.categoryTitle}>{item.title}</Text>
                                    <Icon name="chevron-right" size={20} color={Colors.yellow} />
                                </View>
                            </TouchableHighlight>
                        );
                    }}
                    ItemSeparatorComponent={() => (
                        <View style={Styles.seperator}/>
                    )}
                    onEndReached={this.reloadData}
                /> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    totalEventsContainer: {
        height: 42,
        backgroundColor: Colors.darkBlack,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    
});

const mapStateToProps = state => ({
    // navigationData: state.navigation.data,
});

const mapDispatchToProps = dispatch => ({
    // actions: bindActionCreators({...navigationActions, }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsScreen);