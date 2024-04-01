import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useStore } from '../store/Store';
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { COLORS } from '../theme/color';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import ItemCard from '../components/ItemCard';
import PaymentFooter from '../components/PaymentFooter';


const CartScreen = ({navigation, route}) => {
  const CartList = useStore(state => state.CartList);
  const CartPrice = useStore(state => state.CartPrice);
  const incrementCartItemQuantity = useStore(state => state.incrementCartItemQuantity);
  const decrementCartItemQuantity = useStore(state => state.decrementCartItemQuantity);
  const calculateCardPrice = useStore(state => state.calculateCardPrice);

  const tabBarHeight = useBottomTabBarHeight();

  const buttonPressHandler = () => {
    navigation.push('Payment', {amount: CartPrice});
  };

  const incrementCartItemQuantityHandler = (id, size) => {
    incrementCartItemQuantity(id, size);
    calculateCardPrice();
  };

  const decrementCartItemQuantityHandler = (id, size) => {
    decrementCartItemQuantity(id, size);
    calculateCardPrice();
  };

 
  return (
    <View style={styles.CartScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex}/>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.CartScreenScrollView}>
          <View style={[styles.CardScreenInnerScrollView, {marginBottom: tabBarHeight}]}>
              <View style={styles.ItemContainer}>
                  <HeaderBar title={"Cart"}/>
                  {CartList.length == 0 ? (
                   <EmptyListAnimation title='Cart is Empty' />
                  ): (
                    <View style={styles.CardScreenListItemContainer}>
                      {CartList.map((data)=>(
                        <TouchableOpacity key={data.id} onPress={()=> {navigation.push('Details', {index: data.index,id: data.id,type: data.type,});}}>
                          <ItemCard 
                           id = {data.id}
                           name = {data.name}
                           imagelinkSquare = {data.imagelinkSquare}
                           specialIngredient = {data.specialIngredient}
                           roasted = {data.roasted}
                           prices = {data.prices}
                           type = {data.type}
                           incrementCartItemQuantityHandler = {incrementCartItemQuantityHandler}
                           decrementCartItemQuantityHandler = {decrementCartItemQuantityHandler}
                          />
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
              </View>

              {CartList.length != 0 ? (
                <PaymentFooter buttonTitle={"Pay"} price={{price: CartPrice, currency: '$'}} buttonPressHandler={buttonPressHandler}/>
              ) : (
              <></>
              )}
          </View>
      </ScrollView>
    </View>
  )
}

export default CartScreen

const styles = StyleSheet.create({
  CartScreenContainer:{
    flex:1,
    backgroundColor: COLORS.primaryBlackHex
  },
  CartScreenScrollView:{
    flexGrow:1,
  },
  CardScreenInnerScrollView:{
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer:{
    flex:1
  },
  CardScreenListItemContainer:{
    paddingHorizontal: 20,
    gap: 20
  },

})