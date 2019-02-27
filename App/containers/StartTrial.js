import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import Colors from '../Themes/Colors';

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

const Container = styled.View`
  align-items: center;
`;

const ImageTextContainer = styled.View`
  flex: 1;
  flex-direction: row;
  padding: 10px;
`;

const ImageIcon = styled(Image)`
  width: 35px;
  height: 35px;
  margin-horizontal: 8px;
`;

const ImageTextView = styled.View`
  margin-left: 8px;
  flex: 1;
  flex-direction: column;
  flex-wrap: wrap;
`;

const ImageTextHeader = styled.Text`
  font-size: 18;
`;

const ImageTextDescription = styled.Text`
  flex: 1;
  font-size: 16;
  color: gray;
  flex-wrap: wrap;
`;

const TermsText = styled.Text`
  margin-vertical: 8px;
`;

const FooterView = styled.View`
  border: 1px solid rgba(0, 0, 0, 0.1);
  background-color: white;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export default class StartTrial extends React.Component {
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
            <Text style={{ fontSize: 18 }}>Try goCert.io</Text>
            <Text style={{ fontSize: 18, fontWeight: 'bold', margin: 8 }}>
              FREE for 14 days
            </Text>
            <Text style={{ marginHorizontal: 32, textAlign: 'center' }}>
              Join Engineers and Architects across the country
            </Text>
          </HoveringBox>
          <Container>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              How It Works
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginHorizontal: 60,
                marginBottom: 16,
                textAlign: 'center',
              }}
            >
              The App you need to simplify your Lunch & Learn routine
            </Text>
          </Container>
          <ImageTextContainer>
            <ImageIcon
              source={require('../../assets/attendance.png')}
              resizeMode="contain"
            />
            <ImageTextView>
              <ImageTextHeader>Digitize attendance sign-in</ImageTextHeader>
              <ImageTextDescription>
                Use your smart phone or tablet to capture attendance and
                signatures
              </ImageTextDescription>
            </ImageTextView>
          </ImageTextContainer>
          <ImageTextContainer>
            <ImageIcon
              source={require('../../assets/certification.png')}
              resizeMode="contain"
            />
            <ImageTextView>
              <ImageTextHeader>Course Certificate Creation</ImageTextHeader>
              <ImageTextDescription>
                Automatically create a Course Certificate and email to each
                attendee
              </ImageTextDescription>
            </ImageTextView>
          </ImageTextContainer>
          <ImageTextContainer>
            <ImageIcon
              source={require('../../assets/sheet.png')}
              resizeMode="contain"
            />
            <ImageTextView>
              <ImageTextHeader>Attendance Summary Sheet</ImageTextHeader>
              <ImageTextDescription>
                Automatically tabulate attendance and distribute to program
                administrators
              </ImageTextDescription>
            </ImageTextView>
          </ImageTextContainer>
          <View style={{ marginHorizontal: 16 }}>
            <Text style={{ marginVertical: 16, fontSize: 18 }}>
              Subscription Details
            </Text>
            <TermsText>
              Subscriptions purchased through the app are charged to your iTunes
              account.
            </TermsText>
            <TermsText>
              Cancel or manage your subscription in iTunes settings. Upon
              completion of your free trial, you will be notified to choose and
              confirm your subscription plan. Per iTunes policy, your
              subscription plan will need to be manually renewed after plan
              expiration. You will be notified to extend your subscription at
              your renewal date.
            </TermsText>
            <TermsText>
              By purchasing goCert.io services, you acknowledge and agree to the
              goCert.io Membership Terms and Conditions. See our Privacy Policy.
            </TermsText>
          </View>
        </ScrollView>
        <FooterView>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              alignItems: 'center',
              backgroundColor: 'rgba(0, 234, 234, 1)',
              borderRadius: 5,
              padding: 20,
            }}
          >
            <Text style={{ fontSize: 20, color: 'white' }}>
              Start Your 14-Day Free Trial
            </Text>
          </TouchableOpacity>
        </FooterView>
      </>
    );
  }
}
