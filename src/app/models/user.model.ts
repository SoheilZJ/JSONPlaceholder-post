export interface UserModel {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
}

export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: number;
    geo: Geo;
}

export interface Geo {
    lat: number;
    lng: number;
}
