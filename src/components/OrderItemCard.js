import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../theme/color'

const OrderItemCard = ({type, name, imagelinkSquare, specialIngredient, prices, ItemPrice}) => {
  return (
    <View style={styles.ItemContainer}>
        <View style={styles.ItemInfoContainer}>
            <View style={styles.ItemImageInfoContainer}>
                <Image source={imagelinkSquare} style={styles.ItemImage} />
                <View>
                    <Text style={styles.ItemTitle}>{name}</Text>
                    <Text style={styles.ItemSubtitle}>{specialIngredient}</Text>
                </View>
                <View>
                    <Text style={styles.ItemCurrency}>$ <Text style={styles.ItemPriceText}>{ItemPrice}</Text></Text>
                </View>
            </View>
        </View>

        {prices.map((data, index) => (
         <View key={index.toString()} style={styles.ItemTableRow}>
          <View style={styles.ItemTableRow}>
            <View style={styles.ItemBoxLeft}>
              <Text style={[styles.ItemText,{fontSize: type == 'Bean' ? 12 : 16,},]}>{data.size}</Text>
            </View>
            <View style={styles.PriceItemBoxRight}>
              <Text style={styles.PriceItemCurrency}>{data.currency}<Text style={styles.PriceText}> {data.price}</Text></Text>
            </View>
          </View>

          <View style={styles.ItemTableRow}>
            <Text style={styles.ItemQuantityPriceText}>X <Text style={styles.PriceText}>{data.quantity}</Text></Text>
            <Text style={styles.ItemQuantityPriceText}>$ {(data.quantity * data.price).toFixed(2).toString()}</Text>
          </View>
        </View>
      ))}
    </View>
  )
}

export default OrderItemCard

const styles = StyleSheet.create({
    ItemContainer:{
        gap: 20,
        padding: 20,
        borderRadius: 25,
        backgroundColor: COLORS.primaryGreyHex
    },
    ItemInfoContainer:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    ItemImageInfoContainer:{
        flexDirection: "row",
        alignItems: "center",
        gap: 20
    },
    ItemImage:{
        height: 90,
        width: 90,
        borderRadius: 20
    },
    ItemTitle:{
        fontSize: 18,
        color: COLORS.primaryWhiteHex
    },
    ItemSubtitle:{
        fontSize: 13,
        color: COLORS.secondaryLightGreyHex
    },
    ItemCurrency:{
        fontSize: 20,
        color: COLORS.primaryOrangeHex
    },
    ItemPriceText:{
        color: COLORS.primaryWhiteHex
    },
    ItemTableRow:{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    ItemBoxLeft:{
        flex: 1,
        height: 45,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryBlackHex,
        borderRightWidth: 1,
        borderRightColor: COLORS.primaryGreyHex,
    },
    ItemText:{
        color: COLORS.secondaryLightGreyHex
    },
    PriceItemBoxRight:{
        flex: 1,
        height: 45,
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryBlackHex,
        borderLeftWidth: 1,
        borderLeftColor: COLORS.primaryGreyHex,
    },
    PriceItemCurrency:{
        fontSize: 18,
        color: COLORS.primaryOrangeHex
    },
    ItemQuantityPriceText:{
        flex: 1,
        textAlign: 'center',
        fontSize: 18,
        color: COLORS.primaryOrangeHex
    },
    PriceText:{
        color: COLORS.primaryWhiteHex
    }
})