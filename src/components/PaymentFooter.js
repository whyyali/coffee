import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../theme/color';

const PaymentFooter = ({price , buttonTitle, buttonPressHandler}) => {
  return (
    <View style={styles.FooterContainer}>
        <View style={styles.FooterPriceBox}>
            <Text style={styles.FooterPriceTitle}>Price</Text>
            <Text style={styles.FooterPriceCurrency}>{price.currency} <Text style={styles.FooterPrice}>{price.price}</Text></Text>
        </View>
        <TouchableOpacity style={styles.FooterButton} onPress={()=> buttonPressHandler()}>
            <Text style={styles.FooterButtonTitle}>{buttonTitle}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default PaymentFooter

const styles = StyleSheet.create({
    FooterContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20,
        padding: 20,
    },
    FooterPriceBox:{
        alignItems: 'center',
        width: 100,
    },
    FooterPriceTitle:{
        fontSize: 14,
        color: COLORS.secondaryLightGreyHex,
    },
    FooterPriceCurrency:{
        fontSize: 25,
        color: COLORS.primaryOrangeHex,
    },
    FooterPrice:{
        color: COLORS.primaryWhiteHex,
    },
    FooterButton:{
        backgroundColor: COLORS.primaryOrangeHex,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 20,
    },
    FooterButtonTitle:{
        fontSize: 19,
        color: COLORS.primaryWhiteHex,
    }
})