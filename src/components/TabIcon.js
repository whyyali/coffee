import { StyleSheet, View } from 'react-native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const TabIcon = ({name, size, color}) => {
  return (
    <View>
      <Icon name={name} size={size} color={color} />
    </View>
  )
}

export default TabIcon

const styles = StyleSheet.create({})