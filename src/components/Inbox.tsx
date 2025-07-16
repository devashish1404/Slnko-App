import {
  FlatList,
  View,
  Text,
  ActivityIndicator,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { useNotifications } from "@novu/react-native";

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  listContainer: {
    flexGrow: 1,
    padding: 16,
  },
});


function YourCustomInbox() {
  const { notifications, isLoading, fetchMore, hasMore, refetch } = useNotifications();

  
  console.log(notifications)

  const renderItem = ({ item }: any) => (
    <View>
      <Text>{item.body}</Text>
    </View>
  );

  const renderFooter = () => {
    if (!hasMore) return null;
    return (
      <View>
        <ActivityIndicator size="small" color="#2196F3" />
      </View>
    );
  };

  const renderEmpty = () => (
    <View>
      <Text>No updates available</Text>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <FlatList
      data={notifications}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      onEndReached={fetchMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      refreshControl={
        <RefreshControl
          refreshing={isLoading}
          onRefresh={refetch}
          colors={["#2196F3"]}
        />
      }
    />
  );
}

export default YourCustomInbox;