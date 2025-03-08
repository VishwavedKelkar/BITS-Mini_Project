export type User = {
    id: number;
    name: string;
    company: string;
    username: string;
    email: string;
    address: string;
    zip: number;
    state: string;
    country: string;
    phone: number;
    photo: String;
}


export type Company = {
    id: number;
    name: string;
    marketCap: number;
}

export type CompanyDetailsType = {
    id: number;
    name: string;
    address: string;
    zip: string;
    country: string;
    employeeCount: number;
    industry: string;
    marketCap: number;
    domain: string;
    logo: string;
    ceoName: string;
}