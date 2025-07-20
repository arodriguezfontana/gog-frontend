import React from 'react'
//components
import { FlatList, View, Text, StyleSheet } from 'react-native'
import H2 from './customElements/h2'
import GogButton from './customElements/gogButton'
import SkeletonCard from './skeleton/skeletonCard'
//hooks
import { usePagination } from '../hooks/usePagination'
import AppLayout from './appLayout'

type WithId = { id: string | number }

type PaginationProps<T extends WithId> = {
    callback: (page: number) => Promise<{ components: T[]; amountOfPages: number }>
    title: string
    CardComponent: React.ComponentType<{ card: T }>
    callbackUsePagination?: boolean
    HeaderComponent?: React.ComponentType<any> | React.ReactElement | null
}

const Pagination = <T extends WithId>({
    callback,
    title,
    CardComponent,
    callbackUsePagination = false,
    HeaderComponent = <></>,
}: PaginationProps<T>) => {
    const { components, page, amountOfPages, changePage } = usePagination(callback)

    return (
        <FlatList
            data={components}
            keyExtractor={(component, i) => component.id?.toString() ?? i.toString()}
            renderItem={({ item }) => <CardComponent card={item} />}
            ItemSeparatorComponent={() => <View style={paginationStyles.separator} />}
            ListEmptyComponent={
                <AppLayout>
                    {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
                </AppLayout>
            }
            contentContainerStyle={{ paddingBottom: callbackUsePagination ? 0 : 50 }}
            ListHeaderComponent={
                <>
                    {HeaderComponent}
                    <View style={paginationStyles.headerContainer}>
                        <H2>{title}</H2>
                    </View>
                </>
            }
            ListFooterComponent={
                callbackUsePagination ? (
                    <PageIndexes amountOfPages={amountOfPages} actualPage={page} changePage={changePage} />
                ) : null
            }
        />
    )
}

type PageIndexesProps = {
    amountOfPages: number
    actualPage: number
    changePage: (page: number) => void
}

const PageIndexes: React.FC<PageIndexesProps> = ({ amountOfPages, actualPage, changePage }) => {
    return (
        <View style={pageIndexesStyles.container}>
            {Array.from({ length: amountOfPages }).map((_, i) => (
                <View key={i} style={pageIndexesStyles.pageNumberContainer}>
                    <GogButton bgColor="transparent" onHandlePress={() => changePage(i)}>
                        <Text
                            style={[
                                pageIndexesStyles.pageNumberText,
                                actualPage === i + 1 && pageIndexesStyles.activePage,
                            ]}
                        >
                            {i + 1}
                        </Text>
                    </GogButton>
                </View>
            ))}
        </View>
    )
}

const paginationStyles = StyleSheet.create({
    separator: {
        height: 8,
    },
    headerContainer: {
        marginBottom: 12,
    },
})

const pageIndexesStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: 4,
    },
    pageNumberContainer: {
        margin: 2,
    },
    pageNumberText: {
        fontWeight: '600',
        fontSize: 24,
        lineHeight: 28,
        textDecorationLine: 'none',
    },
    activePage: {
        textDecorationLine: 'underline',
    },
})

export default Pagination
