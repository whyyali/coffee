import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useStore } from '../store/Store';
import { useState } from 'react';
import { COLORS } from '../theme/color';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import PopUpAnimation from "../components/PopUpAnimation";
import PaymentFooter from "../components/PaymentFooter";
import Icon from "react-native-vector-icons/AntDesign";
import PaymentMethod from '../components/PaymentMethod';
import ChipIcon from "react-native-vector-icons/MaterialCommunityIcons";
import VisaIcon from "react-native-vector-icons/Fontisto";



const PaymentList = [
  {
    name: 'Wallet',
    icon: 'icon',
    isIcon: true,
  },
  {
    name: 'Google Pay',
    icon: require('../../assets/app_images/gpay.png'),
    isIcon: false,
  },
  {
    name: 'Apple Pay',
    icon: require('../../assets/app_images/applepay.png'),
    isIcon: false,
  },
  {
    name: 'Amazon Pay',
    icon: require('../../assets/app_images/amazonpay.png'),
    isIcon: false,
  },
];

const PaymentScreen = ({ navigation, route }) => {
  const calculateCardPrice = useStore(state => state.calculateCardPrice);
  const addToOrderHistoryListFromCart = useStore(state => state.addToOrderHistoryListFromCart);

  const [paymentMode, setPaymentMode] = useState("Credit Card");
  const [showAnimation, setShowAnimation] = useState(false);

  const buttonPressHandler = () => {
    setShowAnimation(true);
    addToOrderHistoryListFromCart();
    calculateCardPrice();
    setTimeout(() => {
      setShowAnimation(false);
      navigation.navigate('History');
    }, 2000);
  };

  return (
    <View style={styles.PaymentScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />

      {showAnimation ? (
        <PopUpAnimation source={require("../../lottie/successful.json")} style={styles.LottieAnimation} />
      ) : (<></>)}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.PaymentScreenScrollView}>
        <View style={styles.PaymentScreenHeader}>
          <TouchableOpacity onPress={() => { navigation.pop() }}>
            <View style={{ height: 25, width: 25, alignItems: 'center', justifyContent: 'center', backgroundColor: "#fff",borderRadius: 8}}>
              <Icon name='left' size={16} color={COLORS.primaryLightGreyHex} />
            </View>
          </TouchableOpacity>
          <Text style={styles.PaymentScreenHeaderText}>Payments</Text>
          <View style={styles.PaymentScreenEmptyView} />
        </View>

        <View style={styles.PaymentScreenOptionsContainer}>
          <TouchableOpacity onPress={() => { setPaymentMode("Credit Card") }}>
            <View style={[styles.CreditCardContainer, { borderColor: paymentMode == "Credit Card" ? COLORS.primaryOrangeHex : COLORS.primaryGreyHex }]}>
              <Text style={styles.CreditCardTitle}>Credit Card</Text>
              <View style={styles.CreditCardBackground}>
                <Svg height={""} width={""}>
                  <Defs>
                    <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                      <Stop offset="0" stopColor={COLORS.primaryGreyHex} />
                      <Stop offset="1" stopColor={COLORS.primaryBlackHex} />
                      <View style={styles.CreditCard}>
                        <View style={styles.CreditCardRow}>
                          <ChipIcon name='chip' size={30} color={COLORS.primaryOrangeHex}/>
                          <VisaIcon name='visa' size={40} color={COLORS.primaryWhiteHex}/>
                        </View>

                        <View style={styles.CreditCardNumberContainer}>
                          <Text style={styles.CreditCardNumber}>3879</Text>
                          <Text style={styles.CreditCardNumber}>8923</Text>
                          <Text style={styles.CreditCardNumber}>6745</Text>
                          <Text style={styles.CreditCardNumber}>4638</Text>
                        </View>

                        <View style={styles.CreditCardRow}>
                          <View style={styles.CreditCardNameContainer}>
                            <Text style={styles.CreditCardNameSubitle}>Card Holder Name</Text>
                            <Text style={styles.CreditCardNameTitle}>Aroosa Ali</Text>
                          </View>
                          <View style={styles.CreditCardDateContainer}>
                            <Text style={styles.CreditCardNameSubitle}>Expiry Date</Text>
                            <Text style={styles.CreditCardNameTitle}>02/30</Text>
                          </View>
                        </View>
                      </View>
                    </LinearGradient>
                  </Defs>
                  <Rect x="0" y="0" width="" height="" fill="url(#grad)" />
                </Svg>
              </View>
            </View>
          </TouchableOpacity>

          {PaymentList.map((data) => (
            <TouchableOpacity key={data.name} onPress={() => { setPaymentMode(data.name) }}>
              <PaymentMethod paymentMode={paymentMode} name={data.name} icon={data.icon} isIcon={data.isIcon} />
            </TouchableOpacity>
          ))}

        </View>
      </ScrollView>

      <PaymentFooter buttonTitle={`Pay with ${paymentMode}`} buttonPressHandler={buttonPressHandler} price={{ price: route.params.amount, currency: "$" }} />
    </View>
  )
}

export default PaymentScreen

const styles = StyleSheet.create({
  PaymentScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  LottieAnimation: {
    flex: 1
  },
  PaymentScreenScrollView: {
    flexGrow: 1,
  },
  PaymentScreenHeader: {
    paddingHorizontal: 24,
    paddingVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  PaymentScreenHeaderText: {
    fontSize: 20,
    color: COLORS.primaryWhiteHex
  },
  PaymentScreenEmptyView: {
    height: 36,
    width: 36,
  },
  PaymentScreenOptionsContainer: {
    padding: 15,
    gap: 15,
  },
  CreditCardContainer: {
    padding: 10,
    gap: 10,
    borderRadius: 15 * 2,
    borderWidth: 3,
  },
  CreditCardTitle: {
    fontSize: 14,
    color: COLORS.primaryWhiteHex,
    marginLeft: 10,
  },
  CreditCardBackground: {
    color: COLORS.primaryGreyHex,
    borderRadius: 25
  },
  CreditCard:{
    borderRadius: 25,
    gap: 36,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  CreditCardRow:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  CreditCardNumberContainer:{
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  CreditCardNumber:{
    fontSize: 18,
    color: COLORS.primaryWhiteHex,
    letterSpacing: 4 + 2,
  },
  CreditCardNameContainer:{
    alignItems: 'flex-start',
  },
  CreditCardDateContainer:{
    alignItems: 'flex-end',
  },
  CreditCardNameTitle:{
    fontSize: 18,
    color: COLORS.primaryWhiteHex,
  },
  CreditCardNameSubitle:{
    fontSize: 12,
    color: COLORS.secondaryLightGreyHex,
  }
})