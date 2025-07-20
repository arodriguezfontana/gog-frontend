import type { Tag } from "./tag";
import type { Multimedia } from "./utils";
import type { Review } from "./review";
import type { SimpleGame } from "./simpleGame";

export type Game = {
    id: string;
    name: string;
    description: string;
    mainImage: string;
    multimedia: Multimedia[];
    tags: Tag[];
    price: {
        amount: number;
        currency: string;
    };
    requirement: {
        os: string[];
        processor: string[];
        memory: number;
        graphics: string[];
    };
    relatedGames: SimpleGame[];
    developer: {
        name: string;
    };
    releaseDate: string;
    reviews: Review[];
    website: string;
};
