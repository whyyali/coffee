import { StyleSheet, View, Image } from 'react-native';
import { COLORS } from '../theme/color';

const ProfileImage = () => {
  return (
    <View style={styles.ProfileImageContainer}>
      <Image source={require("../../assets/app_images/avatar.jpg")} style={styles.ProfileImageBox} />
    </View>
  )
}

export default ProfileImage

const styles = StyleSheet.create({
    ProfileImageContainer:{
        height: 36,
        width: 36,
        borderWidth:2,
        borderRadius: 10,
        borderColor: COLORS.secondaryDarkGreyHex,
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
    },
    ProfileImageBox:{
        height:36,
        width:36
    }
})