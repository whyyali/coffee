import { Dimensions, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import Icon from "react-native-vector-icons/Ionicons";
import { COLORS } from '../theme/color';

const CARDWIDTH = Dimensions.get("window").width * 0.32;
const CARDHEIGHT = CARDWIDTH * 1.7;

const Card = ({ id, name, type, index, roasted, price, averageRating, imagelinkSquare, specialIngredient, buttonPressHandler }) => {
    return (
        <View style={styles.CardContainer}>
            <Svg height={CARDHEIGHT} width={CARDWIDTH}>
                <Defs>
                    <LinearGradient style={styles.CardLinearGradient} id="grad" x1="0" y1="0" x2="1" y2="1">
                        <Stop offset="0" stopColor={COLORS.primaryGreyHex} />
                        <Stop offset="1" stopColor={COLORS.primaryBlackHex} />
                        <ImageBackground style={styles.CardBackgroundImage} resizeMode='cover' source={imagelinkSquare}>
                            <View style={styles.CardRatingContainer}>
                                <Icon style={styles.CardRatingImage} name='star' size={18} color={COLORS.primaryOrangeHex} />
                                <Text style={styles.CardRatingText}>{averageRating}</Text>
                            </View>
                        </ImageBackground>
                        <Text style={styles.CardTitle}>{name}</Text>
                        <Text style={styles.CardSubtitle}>{specialIngredient}</Text>
                        <View style={styles.CardFooterRow}>
                            <Text style={styles.CardPriceCurrency}>$ <Text style={styles.CardPriceText}>{price.price}</Text></Text>
                            <TouchableOpacity onPress={() => { buttonPressHandler({ id, name, specialIngredient, price, roasted, imagelinkSquare, type, prices: [{ ...price, quantity: 1 }] }) }}>
                                <View style={styles.CardFooterIcon}>
                                    <Icon name='add' size={25} color={"#fff"} />
                                </View>
                            </TouchableOpacity>
                        </View>
                    </LinearGradient>
                </Defs>
                <Rect x="0" y="0" width="" height="" fill="url(#grad)" />
            </Svg>
        </View>
    )
}

export default Card

const styles = StyleSheet.create({
    CardContainer: {
        paddingVertical: 20,
        paddingHorizontal: 16,
        backgroundColor: COLORS.primaryGreyHex,
        borderRadius: 8,
    },
    CardLinearGradient: {
        padding: 15,
        borderRadius: 25,
    },
    CardBackgroundImage: {
        width: CARDWIDTH,
        height: CARDWIDTH,
        borderRadius: 20,
        marginBottom: 15,
        overflow: "hidden"
    },
    CardRatingContainer: {
        flexDirection: "row",
        backgroundColor: COLORS.primaryBlackRGBA,
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
        gap: 10,
        position: "absolute",
        borderBottomLeftRadius: 20,
        borderTopRightRadius: 20,
        top: 0,
        right: 0
    },
    CardRatingImage: {

    },
    CardRatingText: {
        fontSize: 14,
        lineHeight: 22,
        color: "#fff"
    },
    CardTitle: {
        fontSize: 17,
        color: "#fff",
        fontWeight: "bold",
    },
    CardSubtitle: {
        fontSize: 12,
        color: "#fff",
        fontWeight: "400",
    },
    CardFooterRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 15
    },
    CardPriceCurrency: {
        fontSize: 20,
        color: COLORS.primaryOrangeHex,
        fontWeight: "bold",
    },
    CardPriceText: {
        fontSize: 19,
        color: "#fff",
        fontWeight: "400",
    },
    CardFooterIcon: {
        width: 28,
        height: 28,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: COLORS.primaryOrangeHex
    }
})