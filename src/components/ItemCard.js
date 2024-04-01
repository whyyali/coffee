import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { COLORS } from '../theme/color';
import AddIcon from "react-native-vector-icons/Ionicons";
import MinusIcon from "react-native-vector-icons/Entypo"

const ItemCard = ({id, name, imagelinkSquare, specialIngredient, roasted, prices, type, incrementCartItemQuantityHandler, decrementCartItemQuantityHandler,}) => {
  return (
    <View>
      {prices.length != 1 ? (
         <Svg style={styles.ItemCartContainer} height={""} width={""}>
         <Defs>
           <LinearGradient style={styles.ItemCartLinearGradient} id="grad" x1="0" y1="0" x2="1" y2="1">
               <Stop offset="0" stopColor={COLORS.primaryGreyHex} />
               <Stop offset="1" stopColor={COLORS.primaryBlackHex} />
                <View style={styles.ItemCartRow}>
                    <Image source={imagelinkSquare} style={styles.ItemCartImage} />
                    <View style={styles.ItemCartInfo}>
                        <View>
                            <Text style={styles.ItemCartTitle}>{name}</Text>
                            <Text style={styles.ItemCartSubtitle}>{specialIngredient}</Text>
                        </View>
                        <View style={styles.ItemCartRoastedContainer}>
                            <Text style={styles.ItemCartRoastedText}>{roasted}</Text>
                        </View>
                    </View>
                </View>

                {prices.map((data, index) => (
                <View key={index.toString()} style={styles.ItemCartSizeRowContainer}>
                <View style={styles.ItemCartSizeValueContainer}>
                <View style={styles.ItemCartSizeBox}>
                  <Text style={[styles.ItemCartSizeText, {fontSize: type == 'Bean' ? 12 : 16,},]}>{data.size}</Text>
                </View>
                <Text style={styles.ItemCartSizeCurrency}>{data.currency}<Text style={styles.ItemCartSizePrice}> {data.price}</Text></Text>
              </View>
              <View style={styles.ItemCartSizeValueContainer}>
                <TouchableOpacity style={styles.ItemCartIcon} onPress={() => {decrementCartItemQuantityHandler(id, data.size); }}>
                  <MinusIcon name='minus' color={COLORS.primaryWhiteHex} size={10} />
                </TouchableOpacity>
                <View style={styles.ItemCartQuantityContainer}>
                  <Text style={styles.ItemCartQuantityText}>{data.quantity}</Text>
                </View>
                <TouchableOpacity style={styles.ItemCartIcon} onPress={() => {incrementCartItemQuantityHandler(id, data.size);}}>
                  <AddIcon name='add' color={COLORS.primaryWhiteHex} size={10}/>
                </TouchableOpacity>
              </View>
            </View>
            ))}
           </LinearGradient>
         </Defs>
        <Rect x="0" y="0" width="" height="" fill="url(#grad)" />
      </Svg>
      ) : (
        <Svg height={""} width={""}>
          <Defs>
            <LinearGradient style={[styles.ItemCartSingleLinearGradient]} id="grad" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor={COLORS.primaryGreyHex} />
                <Stop offset="1" stopColor={COLORS.primaryBlackHex} />
                <View style={styles.ItemCartSingleContainer}>
                   <Image source={imagelinkSquare} style={styles.ItemCartSingleImage}/>

                <View style={[styles.CartItemSingleInfoContainer, {rowGap: 6}]}>
                    <View>
                        <Text style={styles.ItemCartTitle}>{name}</Text>
                        <Text style={styles.ItemCartSubtitle}>{specialIngredient}</Text>
                    </View>
                   <View style={styles.ItemCartSingleSizeValueContainer}>
                        <View style={styles.ItemCartSingleSizeBox}>
                        <Text style={[styles.ItemCartSizeText,{fontSize: type == 'Bean' ? 12 : 16},]}>{prices[0].size}</Text>
                        </View>
                        <Text style={styles.ItemCartSizeCurrency}>{prices[0].currency}<Text style={styles.ItemCartSizePrice}> {prices[0].price}</Text></Text>
                    </View>
                        <View style={[styles.ItemCartSingleQuantityContainer, {gap: 20}]}>
                        <TouchableOpacity style={styles.ItemCartIcon} onPress={() => {decrementCartItemQuantityHandler(id, prices[0].size);}}>
                        <MinusIcon name='minus' size={10} color={COLORS.primaryWhiteHex}/>
                        </TouchableOpacity>
                        <View style={styles.ItemCartQuantityContainer}>
                        <Text style={styles.ItemCartQuantityText}>{prices[0].quantity}</Text>
                        </View>
                        <TouchableOpacity style={styles.ItemCartIcon} onPress={() => {incrementCartItemQuantityHandler(id, prices[0].size);}}>
                        <AddIcon name='add' size={10} color={COLORS.primaryWhiteHex}/>
                        </TouchableOpacity>
                    </View>
                </View>
                </View>
            </LinearGradient>
         </Defs>
        <Rect x="0" y="0" width="" height="" fill="url(#grad)" />
       </Svg>
      )}
    </View>
  )
}

export default ItemCard

const styles = StyleSheet.create({
    ItemCartContainer:{
        backgroundColor: COLORS.secondaryGreyHex,
        borderRadius: 15,
        paddingVertical: 6,
        gap:10
    },
    ItemCartLinearGradient:{
        flex: 1,
    },
    ItemCartRow:{
        flexDirection: 'row',
        gap: 12,
        flex: 1,
        padding: 8,
    },
    ItemCartImage:{
        height: 130,
        width: 130,
        borderRadius: 20
    },
    ItemCartInfo:{
        flex: 1,
        paddingVertical: 4,
        justifyContent: 'space-between',
    },
    ItemCartTitle:{
        fontSize: 18,
        color: COLORS.primaryWhiteHex
    },
    ItemCartSubtitle:{
        fontSize: 12,
        color: COLORS.secondaryLightGreyHex
    },
    ItemCartRoastedContainer:{
        height: 50,
        width: 60 * 2 ,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryDarkGreyHex,
    },
    ItemCartRoastedText:{
        fontSize: 10,
        color: COLORS.primaryWhiteHex
    },
    ItemCartSizeRowContainer:{
        flex: 1,
        alignItems: 'center',
        gap: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    ItemCartSizeValueContainer:{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ItemCartSizeBox:{
        backgroundColor: COLORS.primaryBlackHex,
        height: 40,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    ItemCartSizeText:{
        color: COLORS.secondaryLightGreyHex,
    },
    ItemCartSizeCurrency:{
        fontSize: 18,
        color: COLORS.primaryOrangeHex
    },
    ItemCartSizePrice:{
        color: COLORS.primaryWhiteHex
    },
    ItemCartIcon:{
        backgroundColor: COLORS.primaryOrangeHex,
        padding: 12,
        borderRadius: 10,
    },
    ItemCartQuantityContainer:{
        backgroundColor: COLORS.primaryBlackHex,
        width: 80,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.primaryOrangeHex,
        alignItems: 'center',
        paddingVertical: 4,
    },
    ItemCartQuantityText:{
        fontSize: 16,
        color: COLORS.primaryWhiteHex,
    },
    ItemCartSingleLinearGradient:{
        flexDirection: 'row',
    },
    ItemCartSingleContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        gap: 12,
        borderRadius: 25,
        backgroundColor: COLORS.secondaryGreyHex,
    },
    ItemCartSingleImage:{
        height: 130,
        width: 130,
        borderRadius: 20,
    },
    ItemCartSingleSizeValueContainer:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: 20
    },
    ItemCartSingleQuantityContainer:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    ItemCartSingleSizeBox:{
        backgroundColor: COLORS.primaryBlackHex,
        height: 30,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    }
})