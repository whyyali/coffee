import { Image, StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { COLORS } from '../theme/color';
import Icon from "react-native-vector-icons/Entypo";

const PaymentMethod = ({paymentMode, name, icon, isIcon}) => {
  return (
    <View style={[styles.PaymentMethodContainer, {borderColor: paymentMode == name ? COLORS.primaryOrangeHex : COLORS.primaryGreyHex}]}>
      
      {isIcon ? (
         <Svg height={""} width={""}>
         <Defs>
             <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                 <Stop offset="0" stopColor={COLORS.primaryGreyHex} />
                 <Stop offset="1" stopColor={COLORS.primaryBlackHex} />
                 <View style={styles.PaymentMethodWalletContainer}>
                    <View style={styles.PaymentMethodWalletRow}>
                        <Icon name='wallet' size={30} color={COLORS.primaryOrangeHex}/>
                        <Text style={styles.PaymentMethodText}>{name}</Text>
                    </View>
                 <Text style={styles.PaymentMethodPrice}>$ 100.50</Text>
                 </View>
             </LinearGradient>
         </Defs>
         <Rect x="0" y="0" width="" height="" fill="url(#grad)" />
         </Svg>
      ) :(
        <Svg height={""} width={""}>
        <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
                <Stop offset="0" stopColor={COLORS.primaryGreyHex} />
                <Stop offset="1" stopColor={COLORS.primaryBlackHex} />
                <View style={styles.PaymentMethodLinearGradientInner}>
                    <Image source={icon} style={styles.PaymentMethodImage} />
                    <Text style={styles.PaymentMethodText}>{name}</Text>
                </View>
            </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="" height="" fill="url(#grad)" />
      </Svg>
      )}

    </View>
  )
}

export default PaymentMethod

const styles = StyleSheet.create({
    PaymentMethodContainer:{
        borderRadius: 15 * 2,
        backgroundColor: COLORS.primaryGreyHex,
        borderWidth: 3,
    },
    PaymentMethodWalletContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 12,
        paddingHorizontal: 24,
        gap: 24,
        borderRadius: 15 * 2,
    },
    PaymentMethodWalletRow:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 24,
    },
    PaymentMethodLinearGradientInner:{
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        paddingHorizontal: 24,
        gap: 24,
        borderRadius: 15 * 2,
    },
    PaymentMethodImage:{
        height: 30,
        width: 30
    },
    PaymentMethodText:{
        fontSize: 16,
        color: COLORS.primaryWhiteHex
    },
    PaymentMethodPrice:{
        fontSize: 16,
        color: COLORS.primaryLightGreyHex
    }
})