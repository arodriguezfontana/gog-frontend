import { Tag } from "./tag";

export type SimpleGame = {
    id: string;
    name: string;
    mainImage: string;
    tags: Tag[];
    price: {
        amount: number;
        currency: string;
    };
};


