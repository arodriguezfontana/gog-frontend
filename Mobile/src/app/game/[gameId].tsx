import { Stack } from 'expo-router'
import { ScrollView, Text, View, StyleSheet } from 'react-native'
import Spinner from '../../components/gogSpinner'
import AppLayout from '../../components/appLayout'
import GameBigImage from "../../components/game/gameBigImage"
import GameInformation from '../../components/game/gameInformation'
import GameBuyCard from '../../components/game/gameBuyCard'
import GameGallery from '../../components/game/gameGallery'
import Section from '../../components/customElements/sectionGame'
import GameReviews from '../../components/game/gameReviews'
import Slider from '../../components/slider'
import GameWithAddReview from '../../components/game/gameWithAddReview'
import GameWithUserReview from '../../components/game/gameWithUserReview'
import GogModal from '../../components/gogModal'
import { useGames } from '../../hooks/useGames'
import { useModal } from '../../hooks/useModal'

const Games = () => {
    const { loading, gameId, reloadGame, game, currentUser, currentUserReview, currentUserOwnsGame, handleGamePress } = useGames()
    const { isModalShow, handleCloseModal, handleOpenModal } = useModal();

    if (loading || !game) return <Spinner />;

    return (
        <>
            <Stack.Screen options={{ title: game.name }} />
            <GogModal showModal={isModalShow} closeModal={handleCloseModal}>
                <View>
                    <>
                        {
                            game.tags.map((tag, index) => (
                                <Text key={index} style={styles.text}>
                                    {tag.name}
                                </Text>))
                        }
                    </>
                </View>
            </GogModal>

            <AppLayout hasTopSpace={false} hasSideSpace={false}>
                <ScrollView>
                    <GameBigImage
                        name={game.name}
                        mainImage={game.mainImage}
                    />
                    <View style={{ paddingLeft: 10, paddingRight: 10 }}>

                        <GameInformation
                            developerName={game.developer.name}
                            website={game.website}
                            releaseDate={game.releaseDate}
                            tags={game.tags}
                            handleShowTags={handleOpenModal}
                        />

                        {(!currentUser || !currentUserOwnsGame) && (
                            <GameBuyCard
                                amount={game.price.amount}
                                currency={game.price.currency}
                                user={currentUser}
                                game={game}
                            />
                        )}

                        <GameGallery multimedia={game.multimedia} name={game.name} />

                        <Section title="ABOUT THIS GAME">
                            <Text>{game.description}</Text>
                        </Section>

                        <Section title="REQUIREMENTS">
                            <Text><Text style={{ fontWeight: 'bold' }}>OS: </Text>{game.requirement.os}</Text>
                            <Text><Text style={{ fontWeight: 'bold' }}>Processor: </Text>{game.requirement.processor}</Text>
                            <Text><Text style={{ fontWeight: 'bold' }}>Memory: </Text>{game.requirement.memory}gb</Text>
                            <Text><Text style={{ fontWeight: 'bold' }}>Graphics: </Text>{game.requirement.graphics}</Text>
                        </Section>

                        <Section title="RELATED GAMES">
                            <Slider
                                games={game.relatedGames}
                                onPressGame={handleGamePress}
                            />
                        </Section>

                        <Section title="REVIEWS">

                            {(currentUser && currentUserOwnsGame && !currentUserReview) && (
                                <GameWithAddReview
                                    user={currentUser}
                                    gameId={gameId}
                                    onReviewAdded={reloadGame}
                                    colorSchema='white'
                                />
                            )}

                            {(currentUser && currentUserOwnsGame && currentUserReview) && (
                                <GameWithUserReview
                                    user={currentUser}
                                    userReview={currentUserReview}
                                    colorSchema='white'
                                />
                            )}

                            <GameReviews reviews={game.reviews} colorSchema={currentUserOwnsGame ? 'white' : 'black'} />
                        </Section>
                    </View>
                </ScrollView>
            </AppLayout>
        </>
    )
}

export default Games;

const styles = StyleSheet.create({
  text: {
    fontSize: 12 
  }
});