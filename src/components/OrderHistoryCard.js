import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import OrderItemCard from './OrderItemCard';
import { COLORS } from '../theme/color';

const OrderHistoryCard = ({CartList, navigationHanlder, OrderDate, CartListPrice}) => {
  return (
    <View style={styles.CardContainer}>
        <View style={styles.CardHeader}>
            <View>
                <Text style={styles.HeaderTitle}>Order Time</Text>
                <Text style={styles.HeaderSubtitle}>{OrderDate}</Text>
            </View>
            <View style={styles.PriceBox}>
                <Text style={styles.HeaderTitle}>Total Amount</Text>
                <Text style={styles.HeaderPriceText}>$ {CartListPrice}</Text>
            </View>
        </View>

        <View style={styles.CardListContainer}>
            {CartList.map((data,index) =>(
                <TouchableOpacity key={index.toString() + data.id} onPress={()=> {navigationHanlder({index: data.index, id: data.id, type: data.type})}}>
                    <OrderItemCard 
                    type={data.type}
                    name={data.name}
                    specialIngredient={data.specialIngredient}
                    imagelinkSquare={data.imagelinkSquare}
                    prices={data.prices}
                    ItemPrice={data.ItemPrice}
                    />
                </TouchableOpacity>
            ))}
        </View>
    </View>
  )
}

export default OrderHistoryCard

const styles = StyleSheet.create({
    CardContainer:{
        gap: 20
    },
    CardHeader:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 20
    },
    HeaderTitle:{
        fontSize: 16,
        color: COLORS.primaryWhiteHex
    },
    HeaderSubtitle:{
        fontSize: 16,
        color: COLORS.primaryWhiteHex
    },
    PriceBox:{
        alignItems: "flex-end"
    },
    HeaderPriceText:{
        fontSize: 18,
        color: COLORS.primaryOrangeHex
    },
    CardListContainer:{
        gap: 20
    }
})