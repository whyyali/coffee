import { StyleSheet, Text, View } from 'react-native';
import HeaderIcon from './HeaderIcon';
import { COLORS } from '../theme/color';
import ProfileImage from './ProfileImage';

const HeaderBar = ({title}) => {
  return (
    <View style={styles.HeaderContainer}>
       <HeaderIcon name={"menu"} size={30} color={COLORS.primaryLightGreyHex}/> 
       <Text style={styles.HeaderText}>{title}</Text>
       <ProfileImage />
    </View>
  )
}

export default HeaderBar

const styles = StyleSheet.create({
    HeaderContainer:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 30
    },
    HeaderText:{
        fontSize: 20,
        fontWeight: "600",
        color: "#fff",
    }
})