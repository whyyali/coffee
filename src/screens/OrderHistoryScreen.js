import { useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useStore } from '../store/Store';
import { COLORS } from "../theme/color";
import PopUpAnimation from "../components/PopUpAnimation";
import Header from "../components/HeaderBar";
import EmptyListAnimation from "../components/EmptyListAnimation";
import OrderHistoryCard from '../components/OrderHistoryCard';

const OrderHistoryScreen = ({navigation}) => {
  const OrderHistoryList = useStore(state=> state.OrderHistoryList);
  const [showAnimation, setShowAnimation] = useState(false);

  const tabBarHeight = useBottomTabBarHeight();

  const buttonPressHandler = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  };

  const navigationHandler = ({index, id, type}) => {
    navigation.push('Details', {
      index,
      id,
      type,
    });
  };
   
  return (
    <View style={styles.OrderScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      {showAnimation ? (
        <PopUpAnimation style={styles.LottieStyle} source={require("../../lottie/download.json")} />
      ) : (
        <></>
      )}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.OrderScrollView}>
          <View style={[styles.OrderScreenBox, {marginBottom: tabBarHeight}]}>

              <View style={styles.OrderItemContainer}>
                  <Header title={"Order History"} />
                  {OrderHistoryList.length == 0 ? (
                    <EmptyListAnimation  title={"No Order History"} />
                  ): (
                    <View style={styles.ListOrderItemContainer}>
                      {OrderHistoryList.map((data, index) => (
                        <OrderHistoryCard 
                        key={index.toString()}
                        navigationHanlder={navigationHandler}
                        CartList={data.CartList}
                        CartListPrice={data.CartListPrice}
                        OrderDate={data.OrderDate}
                        />
                      ))}
                    </View>
                  )}
              </View>

              {OrderHistoryList.length > 0 ? (
                <TouchableOpacity style={styles.ButtonStyle} onPress={()=> buttonPressHandler()}>
                  <Text style={styles.ButtonText}>Download</Text>
                </TouchableOpacity>
              ) : (
                <></>
              )}  
          </View>
      </ScrollView>

    </View>
  )
}

export default OrderHistoryScreen

const styles = StyleSheet.create({
  OrderScreenContainer:{
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
  LottieStyle:{
    height: 250
  },
  OrderScreenBox:{
    flexGrow: 1
  },
  OrderItemContainer:{
    flex: 1
  },
  ListOrderItemContainer:{
    padding: 20,
    gap: 30
  },
  ButtonStyle:{
    margin: 20,
    height: 60,
    backgroundColor: COLORS.primaryOrangeHex,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  ButtonText:{
    fontSize: 18,
    color: COLORS.primaryWhiteHex
  },
})