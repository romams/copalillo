export interface Procedure{

    id: number;
    title: string;
    description: string;
    content: string;
    price: number;
    delay: string;
    horary: string;
    telephone: string;
    depto: {
        id: number;
        name?: string
    },
    user: number
}