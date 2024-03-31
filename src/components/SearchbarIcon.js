import { View } from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

const SearchBarIcon = ({name, size, color}) => {
  return (
    <View>
      <Icon name={name} size={size} color={color} />
    </View>
  )
}

export default SearchBarIcon