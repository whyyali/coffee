import { StyleSheet, Text, View } from 'react-native';
import LottieView from "lottie-react-native";
import { COLORS } from '../theme/color';
 
const EmptyListAnimation = ({title}) => {
  return (
    <View style={styles.LottieContainer}>
      <LottieView style={styles.LottieStyle} source={require("../../lottie/coffeecup.json")} autoPlay loop />
      <Text style={styles.LottieText}>{title}</Text>
    </View>
  )
}

export default EmptyListAnimation

const styles = StyleSheet.create({
    LottieContainer:{
        flex:1,
        justifyContent: "center"
    },
    LottieStyle:{
        height: 300
    },
    LottieText:{
        fontSize: 16,
        color: COLORS.primaryOrangeHex,
        textAlign: "center"
    }
})