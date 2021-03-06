import React from 'react'
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import normalize from '../helpers/normalizeText'
import { Colors } from '../Themes/'
import { Button } from 'react-native-elements'
import { inject, observer } from 'mobx-react'
import { VFlex, HFlex, CellTextInput } from '../components/Shared'

export default
@inject('auth', 'subscription', 'user')
@observer
class AccountScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Account',
    gesturesEnabled: false,
    headerLeft: (
      <TouchableOpacity
        style={{ padding: 8, marginLeft: 8 }}
        onPress={() => navigation.goBack()}
      >
        <Text style={{ fontSize: 17, color: Colors.purple }}>Cancel</Text>
      </TouchableOpacity>
    ),
    headerRight: navigation.getParam('isUpdating') ? (
      <ActivityIndicator animating color={Colors.purple} />
    ) : (
      <TouchableOpacity
        style={{ padding: 8, marginRight: 8 }}
        onPress={navigation.getParam('onDone') || (() => {})}
      >
        <Text
          style={{ fontWeight: 'bold', fontSize: 17, color: Colors.purple }}
        >
          Done
        </Text>
      </TouchableOpacity>
    ),
  })

  state = {
    firstname: '',
    lastname: '',
    title: '',
  }

  componentWillMount() {
    this.props.subscription.loadActiveSubscription()
    const { onDone } = this
    this.props.navigation.setParams({ onDone })
    const { firstname, lastname, title } = this.props.auth.active
    this.setState({ firstname, lastname, title })
  }

  onDone = () => {
    this.props.navigation.setParams({
      isUpdating: true,
    })
    this.props.user
      .update(this.state)
      .then(() => this.props.navigation.goBack())
      .catch(() => {
        this.props.navigation.setParams({
          isUpdating: false,
        })
        alert('There was a problem updating your profile.')
      })
  }

  logout = () => {
    this.props.auth
      .logout()
      .then(() => this.props.navigation.navigate('Auth'))
      .catch(() => alert('There was a problem logging you out.'))
  }

  render() {
    return (
      <VFlex style={{ backgroundColor: Colors.background }}>
        <VFlex style={{ marginVertical: 16 }}>
          <Text
            style={{
              marginLeft: 8,
              marginBottom: 4,
              color: Colors.darkGray,
              alignSelf: 'flex-start',
            }}
          >
            PERSONAL INFORMATION
          </Text>
          <HFlex style={{ backgroundColor: 'white' }}>
            <CellTextInput
              placeholder="First Name"
              onChangeText={(firstname) => this.setState({ firstname })}
              value={this.state.firstname}
            />
          </HFlex>
          <HFlex style={{ backgroundColor: 'white' }}>
            <CellTextInput
              placeholder="Last Name"
              onChangeText={(lastname) => this.setState({ lastname })}
              value={this.state.lastname}
            />
          </HFlex>
          <HFlex style={{ backgroundColor: 'white' }}>
            <CellTextInput
              placeholder="Title"
              onChangeText={(title) => this.setState({ title })}
              value={this.state.title}
            />
          </HFlex>
        </VFlex>
        <HFlex style={{ flex: 1 }}>
          <Button
            buttonStyle={styles.deleteButton}
            containerStyle={styles.buttonContainer}
            onPress={this.logout}
            title="Sign Out"
            titleStyle={styles.buttonTitle}
          />
        </HFlex>
      </VFlex>
    )
  }
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  deleteButton: {
    backgroundColor: '#ff575c',
    borderRadius: 10,
    height: 50,
  },
  buttonTitle: {
    fontSize: normalize(20),
    color: Colors.white,
  },
})
