import { Text, TouchableOpacity, View } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { styles } from "./customHeaderStyles";

interface CustomHeaderProps {
  onMenuPress?: () => void;
  onHomePress?: () => void;
  profileInitial?: string;
  title?: string;
}



const CustomHeader: React.FC<CustomHeaderProps> = ({
    onMenuPress,
    onHomePress,
    profileInitial = "X",
    title = "Profile"
}) =>{
    return(
<View  style={styles.header}>
    <TouchableOpacity onPress={onMenuPress}>
        <MaterialCommunityIcons name="menu" size={30} color="#fff" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>{title}</Text>

     <View style={styles.headerRight}>
        <TouchableOpacity style={styles.profileCircle}>
          <Text style={styles.profileInitial}>{profileInitial}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onHomePress}>
          <MaterialCommunityIcons name="home-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
</View>
    )
}

export default CustomHeader;