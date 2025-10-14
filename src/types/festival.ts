export interface Festival {
    id: number;
    name: string;
    malayalamName?: string;
    startDate: string | Date;
    endDate: string | Date;
    malayalamDate?: string;
    isMajor: boolean;
    location: {
        district: string;
        place: string;
        coordinates: {
            latitude: number | null;
            longitude: number | null;
        };
    };
    description?: string;
    images?: string[];
    tags?: string[];
}

export type KeralaDistrict =
    | "thiruvananthapuram"
    | "kollam"
    | "pathanamthitta"
    | "alappuzha"
    | "kottayam"
    | "idukki"
    | "ernakulam"
    | "thrissur"
    | "palakkad"
    | "malappuram"
    | "kozhikode"
    | "wayanad"
    | "kannur"
    | "kasaragod"