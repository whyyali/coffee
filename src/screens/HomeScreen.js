import { FlatList, ScrollView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View, Dimensions } from 'react-native';
import { COLORS } from "../theme/color";
import { useRef, useState } from 'react';
import { useStore } from '../store/Store';
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import HeaderBar from '../components/HeaderBar';
import SearchBarIcon from '../components/SearchbarIcon';
import Card from '../components/Card';

const getCategoriesFromData = (data) => {
  let temp = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp)
  categories.unshift("All")
  return categories;
}

const getCoffeeList = (category, data) => {
  if (category == "All") {
    return data;
  } else {
    let coffeelist = data.filter((item) => item.name == category)
    return coffeelist;
  }
}

const HomeScreen = ({navigation}) => {
  const CoffeeList = useStore(state => state.CoffeeList);
  const BeanList = useStore(state => state.BeanList);

  const [categories, setCategories] = useState(getCategoriesFromData(CoffeeList));
  const [searchText, setSearchText] = useState("");
  const [categoryIndex, setCategoryIndex] = useState({index:0, category:categories[0]});
  const [sortedCoffee, setSortedCoffee] = useState(getCoffeeList(categoryIndex.category, CoffeeList));

  const listRef = useRef();
  const tabBarHeight = useBottomTabBarHeight();

  const addToCart = useStore((state) => state.addToCart);
  const calculateCardPrice = useStore((state) => state.calculateCardPrice);

  const searchCoffee = (search)=>{
    if (search != "") {
      listRef?.current?.scrollToOffset({
        animated: true,
        offset:0,
      });
      setCategoryIndex({index:0, category: categories[0]});
      setSortedCoffee([...CoffeeList.filter((item)=> item.name.toLowerCase().includes(search.toLowerCase()))]);
    }
  }
  
  const resetSearchCoffee = ()=>{
    listRef?.current?.scrollToOffset({
      animated: true,
      offset:0,
    });
    setCategoryIndex({index:0, category: categories[0]});
    setSortedCoffee([...CoffeeList]);
    setSearchText("")
  }

  const coffeeCartAddToCart = ({id,index,name,type,roasted,imagelinkSquare ,specialIngreidient,prices})=>{
    addToCart({id,index,name,type,roasted,imagelinkSquare,specialIngreidient,prices});
    calculateCardPrice();
    ToastAndroid.showWithGravity(`${name} is added to Cart`, ToastAndroid.SHORT, ToastAndroid.CENTER)
  }

  return (
    <View style={styles.HomeScreenContainer}>
       <StatusBar  backgroundColor={COLORS.primaryBlackRGBA}/>
       <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.HomeScreenScrollView}>
        
        {/* Header */}
        <HeaderBar  title={""} />
        <Text style={styles.HomeScreenTitle}>Find the best {'\n'}Coffee for you</Text>
        
        {/* SearchBar */}
        <View style={styles.SearchBarContainer}>
            <TouchableOpacity onPress={()=>{searchCoffee(searchText)}}>
                <SearchBarIcon style={styles.SearchInputIcon} name="search" size={22} color={searchText > 0 ? COLORS.primaryOrangeHex : COLORS.primaryLightGreyHex}/>
            </TouchableOpacity>
            <TextInput placeholder='search coffee...' style={styles.SearchBarInputText} value={searchText} onChangeText={text => {setSearchText(text), searchCoffee(text)}} placeholderTextColor={COLORS.primaryLightGreyHex}/>
            {searchText > "" ? (<TouchableOpacity onPress={()=>{resetSearchCoffee()}}><SearchBarIcon style={styles.SearchInputIcon} name="close" size={22} color={"#fff"}/></TouchableOpacity>) : (<></>)}
        </View>

        {/* Category List */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.CategoriesSrollView}>
            {categories.map((category, index)=> (
              <View key={index.toString()} style={styles.CategoriesSrollViewContainer}>
                <TouchableOpacity style={styles.CategoriesSrollViewItem} onPress={()=>{
                  listRef?.current?.scrollToOffset({animated: true, offset:0})
                  setCategoryIndex({index:index, category:categoryIndex[index]})
                  setSortedCoffee([...getCoffeeList(categories[index], CoffeeList)])
                }}>
                    <Text style={[styles.CategoryText,categoryIndex.index == index ? {color: COLORS.primaryOrangeHex} : {} ]}>{category}</Text>
                    {categoryIndex.index == index ? <View style={styles.CategoryActive} /> : <></>}
                </TouchableOpacity>
              </View>
            ))}
        </ScrollView>

        {/* Coffee Card */}
        <FlatList ref={listRef} horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.CoffeeCardContainer}
         data={sortedCoffee}
         keyExtractor={item => item.id}
         ListEmptyComponent={
          <View style={styles.CoffeeCardEmptyListCategory}>
             <Text style={styles.CategoryText}>this Coffee is not available</Text>
          </View>
         }
         renderItem={({item}) => {
           return(
            <TouchableOpacity onPress={()=>{navigation.push("Details"), {index:item.index, id:item.id, type:item.type}}}>
              <Card 
               id={item.id}
               type={item.type}
               index={item.index}
               name={item.name}
               specialIngredient={item.specialIngredient}
               roasted={item.roasted}
               averageRating={item.averageRating}
               price={item.prices[2]}
               imagelinkSquare={item.imagelinkSquare}
               buttonPressHandler={coffeeCartAddToCart}
              />
            </TouchableOpacity>
           )
         }}/>

         <Text style={styles.CoffeeBeanTitle}>Coffee Beans</Text>

         {/* Bean Card */}
         <FlatList horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={[styles.CoffeeCardContainer, {marginBottom: tabBarHeight}]}
          data={BeanList}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity onPress={() => { navigation.push("Details", {index:item.index, id:item.id, type:item.type}) }}>
                <Card
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  roasted={item.roasted}
                  name={item.name}
                  imagelinkSquare={item.imagelinkSquare}
                  specialIngredient={item.specialIngredient}
                  averageRating={item.averageRating}
                  price={item.prices[2]}
                  buttonpressHandler={coffeeCartAddToCart}
                />
              </TouchableOpacity>
            )
          }}
        />
       </ScrollView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  HomeScreenContainer:{
    flex:1,
    backgroundColor: COLORS.primaryBlackRGBA
  },
  HomeScreenScrollView:{
    flexGrow: 1,
  },
  HomeScreenTitle:{
    paddingLeft: 30,
    fontSize: 26,
    color: "#ffffff"
  },
  SearchBarContainer:{
    margin: 30,
    borderRadius: 14,
    backgroundColor: COLORS.primaryDarkGreyHex,
    flexDirection: "row",
    paddingVertical: 14,
    paddingHorizontal: 10,
    alignItems: "center"
  },
  SearchInputIcon:{
    marginHorizontal: 15
  },
  SearchBarInputText:{
    height: 20,
    fontSize: 14,
    color: "#ffffff",
    lineHeight:20,
    width: "80%",
    marginLeft: 8
  },
  CategoriesSrollView:{
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  CategoriesSrollViewContainer:{
    paddingHorizontal: 15,
  },
  CategoriesSrollViewItem:{
    alignItems: "center"
  },
  CategoryText:{
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: COLORS.primaryLightGreyHex,
  },
  CategoryActive:{
    height: 5,
    width: 12,
    borderRadius: 10,
    backgroundColor: COLORS.primaryOrangeHex
  },
  CoffeeCardContainer:{
    gap: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  CoffeeCardEmptyListCategory:{
    width: Dimensions.get("window").width - 60,
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 100
  },
  CoffeeBeanTitle:{
    fontSize: 20,
    marginLeft: 30,
    marginTop:4,
    color: COLORS.secondaryLightGreyHex
  },
})