import { User } from "./user"
import { Game } from "./game"

export type Review = {
    id: string,
    user: User,
    game: Game,
    isRecommended: boolean,
    text: string
}