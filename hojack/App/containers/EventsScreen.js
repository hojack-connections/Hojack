import React, { Component } from 'react';
import { Platform, View, Text, StyleSheet, FlatList, Image, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// import * as navigationActions from '../actions/navigationActions';
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

    _onItemClick(event) {
        this.props.navigation.navigate('EventSummaryScreen', { event });
    }

    render() {
        // const { navigationData, videoData, connectivity } = this.props;
        const eventsData = [
            {
                id: '0',
                date: 'February 15, 2018',
                name: 'E-Week - Albany, NY',
                attendees: 52,
            },
            {
                id: '1',
                date: 'February 13, 2018',
                name: 'CHA - Rochester, NY',
                attendees: 6,
            },
            {
                id: '2',
                date: 'February 13, 2018',
                name: 'City of Albany Engineering Dept.',
                attendees: 7,
            },
        ];
        
        return (
            <View style={Styles.container}>
                <View style={styles.totalEventsContainer}>
                    <Text style={{ color: '#895353' }}>Total Attendees: 1,249</Text>
                    <Text style={{ color: '#538989' }}>Total Events: 410</Text>
                </View>
                <View style={styles.allEventsContainer}>
                    <Text>All Attendees</Text>
                    <Text style={{ color: '#34bd3e' }}>1,249</Text>
                    <Icon name="chevron-right" size={16} color={'#797979'} style={Styles.arrow} />
                </View>
                <FlatList
                    data={eventsData}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({ item }) => {
                        return (
                            <TouchableHighlight onPress={() => this._onItemClick(item)}>
                                <View style={styles.listItemContainer}>
                                    <Text style={styles.eventDate}>{item.date}</Text>
                                    <View style={styles.seperator}/>
                                    <View style={styles.subDetails}>
                                        <Text style={styles.categoryTitle}>{item.name}</Text>
                                        <Text style={styles.attendees}>{item.attendees}</Text>
                                    </View>
                                    <Icon name="chevron-right" size={16} color={'#797979'} style={styles.arrow} />
                                </View>
                            </TouchableHighlight>
                        );
                    }}
                    onEndReached={this.reloadData}
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
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    allEventsContainer: {
        paddingHorizontal: 30,
        height: 44,
        marginBottom: 10,
        backgroundColor: Colors.white,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    listItemContainer: {
        // paddingHorizontal: 30, 
        paddingVertical: 10, 
        backgroundColor: Colors.white,
        height: 70,
        marginBottom: 10, 
    },
    eventDate: {
        marginLeft: 20,
        fontWeight: '700',
    },
    seperator: {
        backgroundColor: Colors.black,
        height: 1,
        width: '99%',
        marginLeft: 5,
        marginTop: 5, 
    },
    subDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        paddingVertical: 10, 
    },
    attendees: {
        color: '#ff575c',
    },
    arrow: {
        position: 'absolute',
        right: 10,
        top: 44,
    },
});

const mapStateToProps = state => ({
    // navigationData: state.navigation.data,
});

const mapDispatchToProps = dispatch => ({
    // actions: bindActionCreators({...navigationActions, }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(EventsScreen);