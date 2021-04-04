export interface New{

    id: number;
    title: string;
    content: string;
    image: string;
    createAt: Date;
    user: number;
    category: {
        id: number,
        name?: string
    }
}