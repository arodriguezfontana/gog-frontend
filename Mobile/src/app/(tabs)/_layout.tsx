import { Tabs } from "expo-router";
import { Image } from "react-native"
import home from "../../assets/icons/home.png";
import search from "../../assets/icons/Search.png";
import cart from "../../assets/icons/cart.png";
import user from "../../assets/icons/user.png";
import { SearchProvider, useSearch } from "../../context/searchContext";

function TabsLayoutNav() {
    const searchContext = useSearch();

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: "#800080",
                tabBarStyle: {
                    maxHeight: 72,
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                    paddingBottom: 10,
                    paddingTop: 10,
                }
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: "",
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={home}
                            style={{
                                width: 48,
                                height: 48,
                                tintColor: color,
                                resizeMode: "contain"
                            }}
                        />
                    ),
                    headerTitle: "Home Screen",
                }}
            />
            <Tabs.Screen
                name="search"
                listeners={{
                    tabPress: (e) => {
                        searchContext?.resetSearch();
                    },
                }}
                options={{
                    title: "",
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={search}
                            style={{
                                width: 48,
                                height: 48,
                                tintColor: color,
                            }}
                        />
                    ),
                    headerTitle: "Search Screen",
                }}
            />
            <Tabs.Screen
                name="cart"
                options={{
                    title: "",
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={cart}
                            style={{
                                width: 48,
                                height: 48,
                                tintColor: color,
                            }}
                        />
                    ),
                    headerTitle: "Cart Screen",
                }}
            />
            <Tabs.Screen
                name="library"
                options={{
                    title: "",
                    tabBarIcon: ({ color }) => (
                        <Image
                            source={user}
                            style={{
                                width: 48,
                                height: 48,
                                tintColor: color,
                            }}
                        />
                    ),
                    headerTitle: "Profile Screen",
                }}
            />
        </Tabs>
    );
}

export default function TabsLayout() {
    return (
        <SearchProvider>
            <TabsLayoutNav />
        </SearchProvider>
    )
}
