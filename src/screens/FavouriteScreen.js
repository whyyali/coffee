import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useStore } from '../store/Store';
import { COLORS } from "../theme/color";
import HeaderBar from "../components/HeaderBar";
import EmptyListAnimation from "../components/EmptyListAnimation";
import FavouriteItemCard from '../components/FavouriteItemCard';

const FavouriteScreen = ({navigation}) => {
  const addToFavouriteList = useStore(state => state.addToFavouriteList);
  const deleteFromFavouriteList = useStore(state => state.deleteFromFavouriteList);
  const FavouritesList = useStore(state => state.FavouritesList);

  const tabBarHeight = useBottomTabBarHeight();

  const ToggleFavourite = (favourite, type, id) => {
    favourite ? deleteFromFavouriteList(type, id) : addToFavouriteList(type, id);
  };

  return (
    <View style={styles.FavouriteScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.FavouriteScreenScrollView}>
        <View style={[styles.FavouriteScreenScrollViewInner ,{marginBottom: tabBarHeight}]}>
          <View style={styles.ItemContainer}>
            <HeaderBar title={"Favourites"} />
            {FavouritesList.length == 0 ? (
              <EmptyListAnimation title={"No Favourite"} />
            ) : (
              <View style={styles.ItemListContainer}>
                {FavouritesList.map((data) => (
                  <TouchableOpacity onPress={()=>{ navigation.push('Details', {index: data.index,id: data.id,type: data.type,});}} key={data.id} >
                    <FavouriteItemCard 
                        id={data.id}
                        imagelinkPortrait={data.imagelinkPortrait}
                        name={data.name}
                        specialIngredient={data.specialIngredient}
                        type={data.type}
                        ingredients={data.ingredients}
                        averageRating={data.averageRating}
                        ratingsCount={data.ratingsCount}
                        roasted={data.roasted}
                        description={data.description}
                        favourite={data.favourite}
                        ToggleFavouriteItem={ToggleFavourite}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

export default FavouriteScreen

const styles = StyleSheet.create({
  FavouriteScreenContainer:{
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex
  },
  FavouriteScreenScrollView:{
    flexGrow:1
  },
  FavouriteScreenScrollViewInner:{
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer:{
    flex: 1
  },
  ItemListContainer:{
    paddingHorizontal: 20,
    gap: 20,
  }
})