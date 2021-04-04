export interface Cita{
    id?: number,
    name: string,
    address: string,
    telephone: string,
    hour: string,
    date: string,
    procedure?: {
        id: number,
        name?: string,
        price?: number,
        depto?: string
    }
}