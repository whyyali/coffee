import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BlurView } from "@react-native-community/blur";
import HomeScreen from "../screens/HomeScreen";
import FavouriteScreen from '../screens/FavouriteScreen';
import CartScreen from "../screens/CartScreen";
import OrderHistoryScreen from '../screens/OrderHistoryScreen';
import Icon from '../components/TabIcon';
import { COLORS } from '../theme/color';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
   <Tab.Navigator 
    screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarStyle: styles.TabBarStyle,
        tabBarBackground: () =>{
            <BlurView  overlayColor='' blurAmount={15} style={styles.BlurViewStyle} />
        }
    }}>
    <Tab.Screen name='Home' component={HomeScreen} options={{
        tabBarIcon: ({focused, color, size}) =>(
           <Icon name="home" size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
        )
    }}></Tab.Screen>
     <Tab.Screen name='Cart' component={CartScreen} options={{
        tabBarIcon: ({focused, color, size}) =>(
           <Icon name="cart" size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
        )
    }}></Tab.Screen>
     <Tab.Screen name='Favourite' component={FavouriteScreen} options={{
        tabBarIcon: ({focused, color, size}) =>(
           <Icon name="heart" size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
        )
    }}></Tab.Screen>
     <Tab.Screen name='History' component={OrderHistoryScreen} options={{
        tabBarIcon: ({focused, color, size}) =>(
           <Icon name="bell" size={25} color={focused ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex} />
        )
    }}></Tab.Screen>

   </Tab.Navigator>
  )
}

export default TabNavigator

const styles = StyleSheet.create({
    TabBarStyle: {
        height: 70,
        position: "absolute",
        backgroundColor: "rgba(12,15,20,0.5)" ,
        borderTopWidth: 10,
        elevation: 0,
        borderTopColor: "transparent"
    },
    BlurViewStyle:{
        position: "absolute",
        top: 0, bottom: 0, left:0, right:0
    }
})