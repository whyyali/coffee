import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme/color';
import LottieView from "lottie-react-native";
 
const PopUpAnimation = ({style, source}) => {
  return (
    <View style={styles.LottieViewContainer}>
      <LottieView source={source} style={style} autoPlay loop={false} />
    </View>
  )
}

export default PopUpAnimation

const styles = StyleSheet.create({
    LottieViewContainer:{
        flex: 1,
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        backgroundColor: COLORS.secondaryBlackRGBA,
        justifyContent: 'center',
    }
})