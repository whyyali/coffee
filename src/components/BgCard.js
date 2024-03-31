import { ImageBackground, StyleSheet, Text, TouchableOpacity, View , Image} from 'react-native';
import Icon from "react-native-vector-icons/AntDesign";
import ItemIcon from "react-native-vector-icons/Entypo";
import { COLORS } from '../theme/color';

const BgCard = ({EnableBackHandler, imagelinkPortrait, type, id, favourite, name, specialIngredient, ingredients, averageRating, ratingsCount, roasted, BackHandler, ToggleFavourite,}) => {
    return (
    <View>
      <ImageBackground source={imagelinkPortrait} style={styles.BgCardContainer}>
        {EnableBackHandler ? (
        <View style={styles.ImageTopBarContainerwithBack}>
            <TouchableOpacity onPress={()=> {BackHandler()}}>
                <View style={styles.BgCardTopBarIcon}>
                    <Icon name='left' color={COLORS.primaryLightGreyHex} size={20}/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=> {ToggleFavourite(favourite, type, id)}} style={styles.BgCardTopBarIcon}>
                <Icon name='heart' color={favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex} size={20}/>
            </TouchableOpacity>
        </View>
        ) : (
        <View style={styles.ImageTopBarContainerwithoutBack}>
            <TouchableOpacity onPress={()=> {ToggleFavourite(favourite, type, id)}} style={styles.BgCardTopBarIcon}>
                <Icon name='heart' color={favourite ? COLORS.primaryRedHex : COLORS.primaryLightGreyHex} size={20}/> 
            </TouchableOpacity>
        </View>)}

        <View style={styles.BgCardOuterContainer}>
            <View style={styles.BgCardInnerContainer}>
                <View style={styles.BgCardInfoRow}>
                    <View>
                      <Text style={styles.ItemTitleText}>{name}</Text>
                      <Text style={styles.ItemSubtitleText}>{specialIngredient}</Text>
                    </View>
                    <View style={styles.ItemPropertiesContainer}>
                        <View style={styles.ItemBox}>
                            {type == "Bean" ? <Image style={styles.ItemImage} source={require("../../assets/bean.png")} /> : <Image style={styles.ItemImage} source={require("../../assets/beans.png")} />}
                            <Text style={[styles.ItemFirstText]}>{type}</Text>
                        </View>
                        <View style={styles.ItemBox}>
                            <ItemIcon name={type == 'Bean' ? 'location' : 'drop'} size={20} color={COLORS.primaryOrangeHex}/>
                            <Text style={styles.ItemLastText}>{ingredients}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.BgCardInfoRow}>
                    <View style={styles.RatingContainer}>
                        <Icon name='star' size={20} color={COLORS.primaryOrangeHex}/>
                        <Text style={styles.RatingText}>{averageRating}</Text>
                        <Text style={styles.RatingCountText}>({ratingsCount})</Text>
                    </View>
                    <View style={styles.RoastedContainer}>
                        <Text style={styles.RoastedText}>{roasted}</Text>
                   </View>
                </View>
            </View>
        </View>    

      </ImageBackground>
    </View>
  )
}

export default BgCard

const styles = StyleSheet.create({
    BgCardContainer:{
        width: '100%',
        aspectRatio: 20 / 25,
        justifyContent: 'space-between',
    },
    ImageTopBarContainerwithBack:{
        padding: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    BgCardTopBarIcon:{
        height: 36,
        width: 36,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#fff",
        borderRadius: 12
    },
    ImageTopBarContainerwithoutBack:{
        padding: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    BgCardOuterContainer:{
        paddingVertical: 24,
        paddingHorizontal: 30,
        backgroundColor: COLORS.primaryBlackRGBA,
        borderTopLeftRadius: 20 * 2,
        borderTopRightRadius: 20 * 2,
    },
    BgCardInnerContainer:{
        justifyContent: 'space-between',
        gap: 15,
    },
    BgCardInfoRow:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    ItemTitleText:{
        fontSize: 24,
        color: COLORS.primaryWhiteHex,
    },
    ItemSubtitleText:{
        fontSize: 12,
        color: COLORS.primaryWhiteHex,
    },
    ItemPropertiesContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
    },
    ItemBox:{
        height: 55,
        width: 55,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryBlackHex,
    },
    ItemImage:{
        height: 20,
        width: 20
    },
    ItemFirstText:{
        fontSize: 10,
        color: COLORS.primaryWhiteHex,
    },
    ItemLastText:{
        fontSize: 10,
        color: COLORS.primaryWhiteHex,
    },
    RatingContainer:{
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
    },
    RatingText:{
        fontSize: 18,
        color: COLORS.primaryWhiteHex,
    },
    RatingCountText:{
        fontSize: 12,
        color: COLORS.primaryWhiteHex,
    },
    RoastedContainer:{
        height: 55,
        width: 65 * 2,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryBlackHex,
    },
    RoastedText:{
        fontSize: 12,
        color: COLORS.primaryWhiteHex,
    }    
})