import React from 'react'
// components
import AppLayout from '../../components/appLayout'
import Pagination from '../../components/pagination'
import Card from '../../components/card'
import { View } from 'react-native'
// services
import { getGames } from '../../services/gamesService'

const Home = () => {
    return (
        <AppLayout>
            <View style={{ height: "100%", flex: 1, alignItems: "center" }}>
                <Pagination
                    title='FEATURED & RECOMMENDED'
                    callback={async (page) => {
                        const response = await getGames(page);
                        return { components: response?.data?.list ?? [], amountOfPages: response?.data?.amountOfPages || 1 };
                    }}
                    callbackUsePagination={true}
                    CardComponent={Card}
                >
                </Pagination>
            </View>
        </AppLayout>
    )
}
export default Home