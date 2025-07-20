import type { Game } from "./game";

export type User = {
    id: string;
    email: string;
    name: string;
    image?: string;
    mainImage?: string;
    backgroundImage: string;
    games: Game[];
};
