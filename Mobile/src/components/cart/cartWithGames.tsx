import { Text, View, FlatList } from "react-native"
import { Game } from "../../types/game";
import { useEffect, useState } from "react";

export const CartWithGames = (listGames: Game[]) => {

    const [gameList, setGameList] = useState<Game[]>([])

    useEffect(() => {
        setGameList(listGames)
    }, []);

    return (
        <>
            <View>
                <Text>{gameList[0]?.name}</Text>
                <FlatList
                    data={gameList}
                    renderItem={({ item }) =>
                        <View>
                            <Text> {item.id}</Text>
                            <Text> {item.name}</Text>
                            <Text> {item.price.amount}</Text>
                        </View>
                    }
                    keyExtractor={item => item.id}
                />
            </View>
        </>
    )

}