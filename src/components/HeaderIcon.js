import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../theme/color';
import Svg, { Defs, LinearGradient, Stop, Rect } from 'react-native-svg';
import TabIcon from './TabIcon';

const HeaderIcon = ({ name, color, size }) => {
    return (
        <View style={styles.HeaderIconContainer}>
            <Svg height="" width="">
                <Defs>
                    <LinearGradient style={styles.HeaderLinearGradient} id="grad" x1="0" y1="0" x2="1" y2="1">
                        <Stop offset="0" stopColor={COLORS.primaryGreyHex} />
                        <Stop offset="1" stopColor={COLORS.primaryBlackHex} />
                        <TabIcon name={name} size={size} color={color} />
                    </LinearGradient>
                </Defs>
                <Rect x="0" y="0" width="" height="" fill="url(#grad)" />
            </Svg>
        </View>
    )
}

export default HeaderIcon

const styles = StyleSheet.create({
    HeaderIconContainer: {
        borderWidth: 2,
        borderColor: COLORS.secondaryDarkGreyHex,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.secondaryDarkGreyHex,
        overflow: 'hidden',
    },
    HeaderLinearGradient: {
        height: 36,
        width: 36,
        alignItems: 'center',
        justifyContent: 'center',
    }
})