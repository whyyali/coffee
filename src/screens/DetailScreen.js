import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { useStore } from '../store/Store';
import { useState } from 'react';
import { COLORS } from "../theme/color";
import BgCard from '../components/BgCard';
import PaymentFooter from '../components/PaymentFooter';

const DetailScreen = ({ navigation, route }) => {
  const ItemofIndex = useStore((state) => route.params.type == "Coffee" ? state.CoffeeList : state.BeanList)[route.params.index]

  const addToFavouriteList = useStore((state) => state.addToFavouriteList);
  const deleteFromFavouriteList = useStore((state) => state.deleteFromFavouriteList);
  const addToCart = useStore((state) => state.addToCart);
  const calculateCardPrice = useStore((state) => state.calculateCardPrice);


  const [fullDescription, setFullDescription] = useState(false);
  const [price, setPrice] = useState(ItemofIndex.prices[0]);

  const BackHandler = () => {
    navigation.pop()
  }

  const ToggleFavourite = (favourite, id, type) => {
    favourite ? deleteFromFavouriteList(type, id) : addToFavouriteList(type, id)
  }

  const addToCartHandler = ({ id, index, name, type, roasted, imagelinkSquare, specialIngredient, price }) => {
    addToCart({ id, index, name, type, roasted, imagelinkSquare, specialIngredient, prices: [{ ...price, quantity: 1 }] });
    calculateCardPrice();
    navigation.navigate("Cart");
  }

  return (
    <View style={styles.DetailScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.DetailScreenScrollView}>
        <BgCard
          EnableBackHandler={true}
          imagelinkPortrait={ItemofIndex.imagelinkPortrait}
          type={ItemofIndex.type}
          id={ItemofIndex.id}
          favourite={ItemofIndex.favourite}
          name={ItemofIndex.name}
          specialIngredient={ItemofIndex.specialIngredient}
          ingredients={ItemofIndex.ingredients}
          averageRating={ItemofIndex.averageRating}
          ratingsCount={ItemofIndex.ratingsCount}
          roasted={ItemofIndex.roasted}
          BackHandler={BackHandler}
          ToggleFavourite={ToggleFavourite}
        />

        <View style={styles.CardInfoContainer}>
            <Text style={styles.CardInfoTitle}>Description</Text>
            {fullDescription ? (
              <TouchableWithoutFeedback onPress={()=> setFullDescription(prev => !prev)}>
                <Text style={styles.CardInfoDescription}>{ItemofIndex.description}</Text>  
              </TouchableWithoutFeedback>
            ) : (
              <TouchableWithoutFeedback onPress={()=> setFullDescription(prev => !prev)}>
                <Text numberOfLines={3} style={styles.CardInfoDescription}>{ItemofIndex.description}</Text>
              </TouchableWithoutFeedback>
            )}
            <Text style={styles.CardInfoTitle}>Size</Text>
            <View style={styles.CardSizeOuterContainer}>
                {ItemofIndex.prices.map((data)=> (
                  <TouchableOpacity key={data.size} onPress={()=> {setPrice(data)}} style={[styles.CardSizeBox, {borderColor: data.size == price.size ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}]}>
                    <Text style={[styles.CardSizeText,{fontSize: ItemofIndex.type == "Bean" ? 14 : 16, color: data.size == price.size ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}]}>{data.size}</Text>
                  </TouchableOpacity>
                ))}
            </View>
        </View>
        
        <PaymentFooter price={price} buttonTitle={"Add to Cart"} buttonPressHandler={()=>{
          addToCartHandler({
              id: ItemofIndex.id,
              index: ItemofIndex.index,
              name: ItemofIndex.name,
              roasted: ItemofIndex.roasted,
              imagelinkSquare: ItemofIndex.imagelinkSquare,
              specialIngredient: ItemofIndex.specialIngredient,
              type: ItemofIndex.type,
              price: price,
          })
        }} />
      </ScrollView>
    </View>
  )
}

export default DetailScreen

const styles = StyleSheet.create({
  DetailScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
  DetailScreenScrollView: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  CardInfoContainer:{
    padding: 20
  },
  CardInfoTitle:{
    fontSize: 16,
    color: COLORS.primaryWhiteHex,
    marginBottom: 10,
  },
  CardInfoDescription:{
    letterSpacing: 0.5,
    fontSize: 14,
    color: COLORS.primaryWhiteHex,
    marginBottom: 30,
  },
  CardSizeOuterContainer:{
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  CardSizeBox:{
    flex: 1,
    backgroundColor: COLORS.primaryDarkGreyHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: 35,
    borderRadius: 10,
    borderWidth: 2,
  },
  CardSizeText:{
    
  }
})