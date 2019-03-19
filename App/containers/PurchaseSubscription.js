import React from 'react';
import { Text, Image, ScrollView } from 'react-native';
import { VFlex } from '../components/Shared';
import styled from 'styled-components';
import Colors from '../Themes/Colors';
import { observer, inject } from 'mobx-react';

const HeaderBackground = styled.View`
  background-color: ${Colors.navigation};
  position: absolute;
  top: -200;
  height: 340px;
  left: -50;
  width: 150%;
`;

const HoveringBox = styled.View`
  margin: 40px;
  margin-top: 80px;
  padding: 8px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
  align-items: center;
`;

const DetailsText = styled.Text`
  margin: 8px;
`;

const FooterView = styled.View`
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const RoundedButton = styled.TouchableOpacity`
  align-items: center;
  color: ${(props) => props.color};
  background-color: ${(props) => props.color};
  border: 1px ${(props) => props.color};
  border-radius: 5px;
  padding: 20px;
  margin: 8px;
`;

const ButtonText = styled.Text`
  color: ${(props) => props.color};
  font-size: 20;
  font-weight: bold;
`;

export default
@inject('auth', 'subscription', 'purchase')
@observer
class PurchaseSubscription extends React.Component {
  static navigationOptions = () => ({
    headerStyle: {
      display: 'none',
    },
  });

  render() {
    return (
      <>
        <ScrollView style={{ backgroundColor: 'white' }}>
          <HeaderBackground />
          <HoveringBox>
            <Image
              source={require('../../assets/gocert-logo.png')}
              style={{ width: 40, height: 40 }}
            />
            <Text style={{ fontSize: 18 }}>FREE TRIAL</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 8 }}>
              EXPIRED
            </Text>
            <Text style={{ marginHorizontal: 32, textAlign: 'center' }}>
              Choose a plan that works for you below
            </Text>
          </HoveringBox>
          <VFlex>
            <DetailsText>Subscription Details</DetailsText>
            <DetailsText>
              Subscriptions purchased through the app are charged to your iTunes
              account.
            </DetailsText>
            <DetailsText>
              Cancel or manage your subscription in iTunes settings. Upon
              completion of your free trial, you will be notified to choose and
              confirm your subscription plan. Per iTunes policy, your
              subscription plan will need to be manually renewed after plan
              expiration. You will be notified to extend your subscription at
              your renewal date.
            </DetailsText>
            <DetailsText>
              By purchasing goCert.io services, you acknowledge and agree to the
              goCert.io Membership Terms and Conditions. See our Privacy Policy.
            </DetailsText>
          </VFlex>
        </ScrollView>
        <FooterView>
          <Text style={{ margin: 8, textAlign: 'center', fontWeight: 'bold' }}>
            Select a plan, pay as you go. You can change plans or cancel
            anytime.
          </Text>
          <RoundedButton
            color="rgba(106, 121, 214, 1)"
            style={{ backgroundColor: 'transparent' }}
            onPress={() => this.props.purchase.purchaseSubscription('onemonth')}
          >
            <ButtonText color="rgba(106, 121, 214, 1)">
              1 month - $14.99
            </ButtonText>
          </RoundedButton>
          <RoundedButton
            color="rgba(1, 234, 234, 1)"
            style={{ backgroundColor: 'transparent' }}
            onPress={() =>
              this.props.purchase.purchaseSubscription('threemonth')
            }
          >
            <ButtonText color="rgba(1, 234, 234, 1)">
              3 months - $39.99
            </ButtonText>
          </RoundedButton>
          <RoundedButton
            color="rgba(164, 52, 198, 1)"
            style={{ backgroundColor: 'transparent' }}
            onPress={() => this.props.purchase.purchaseSubscription('sixmonth')}
          >
            <ButtonText color="rgba(164, 52, 198, 1)">
              6 months - $69.99
            </ButtonText>
          </RoundedButton>
          <RoundedButton
            color="rgba(255, 223, 3, 1)"
            onPress={() =>
              this.props.purchase.purchaseSubscription('twelvemonth')
            }
          >
            <ButtonText color="white">12 months - $99.99</ButtonText>
          </RoundedButton>
        </FooterView>
      </>
    );
  }
}
