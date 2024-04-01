import { StyleSheet, Text, View } from 'react-native';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import { COLORS } from '../theme/color';
import BgCard from './BgCard';

const FavouriteItemCard = ({ id, imagelinkPortrait, name, specialIngredient, type, ingredients, averageRating, ratingsCount, roasted, description, favourite, ToggleFavouriteItem,}) => {
  return (
    <View style={styles.FavouriteItemCardContainer}>
        <BgCard 
        EnableBackHandler={false}
        id={id}
        imagelinkPortrait={imagelinkPortrait}
        name={name}
        specialIngredient={specialIngredient}
        type={type}
        ingredients={ingredients}
        averageRating={averageRating}
        ratingsCount={ratingsCount}
        roasted={roasted}
        favourite={favourite}
        ToggleFavourite={ToggleFavouriteItem}
        />
        <Svg height={""} width={""}>
            <Defs>
                <LinearGradient style={styles.CardLinearGradient} id="grad" x1="0" y1="0" x2="1" y2="1">
                    <Stop offset="0" stopColor={COLORS.primaryGreyHex} />
                    <Stop offset="1" stopColor={COLORS.primaryBlackHex} />
                         <View style={styles.FavouriteItemCardLinearGradientInner}>
                            <Text style={styles.DescriptionTitle}>Description</Text>
                            <Text style={styles.DescriptionText}>{description}</Text>
                         </View>
                </LinearGradient>
            </Defs>
            <Rect x="0" y="0" width="" height="" fill="url(#grad)" />
        </Svg>
    </View>
  )
}

export default FavouriteItemCard

const styles = StyleSheet.create({
    FavouriteItemCardContainer:{
        borderRadius: 25,
        overflow: "hidden"
    },
    FavouriteItemCardLinearGradientInner:{
        gap: 10,
        padding: 20,
    },
    DescriptionTitle:{
        fontSize: 16,
        color: COLORS.secondaryLightGreyHex,
    },
    DescriptionText:{
        fontSize: 14,
        color: COLORS.primaryWhiteHex
    }
})