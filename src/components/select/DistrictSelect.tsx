import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import type { KeralaDistrict } from "@/types/festival";
import type { Dispatch, FC, SetStateAction } from "react";

interface IDistrictSelect {
    selectedDistrict: KeralaDistrict | undefined,
    setSelectedDistrict: Dispatch<SetStateAction<KeralaDistrict | undefined>>
}

const districts: { key: KeralaDistrict; label: string }[] = [
    { key: "thiruvananthapuram", label: "Thiruvananthapuram" },
    { key: "kollam", label: "Kollam" },
    { key: "pathanamthitta", label: "Pathanamthitta" },
    { key: "alappuzha", label: "Alappuzha" },
    { key: "kottayam", label: "Kottayam" },
    { key: "idukki", label: "Idukki" },
    { key: "ernakulam", label: "Ernakulam" },
    { key: "thrissur", label: "Thrissur" },
    { key: "palakkad", label: "Palakkad" },
    { key: "malappuram", label: "Malappuram" },
    { key: "kozhikode", label: "Kozhikode" },
    { key: "wayanad", label: "Wayanad" },
    { key: "kannur", label: "Kannur" },
    { key: "kasaragod", label: "Kasaragod" },
]

export const DistrictSelect: FC<IDistrictSelect> = ({
    selectedDistrict,
    setSelectedDistrict
}) => {

    return (
            <Select
                value={selectedDistrict}
                onValueChange={(value: KeralaDistrict) => setSelectedDistrict(value)}
            >
                <SelectTrigger className="w-full max-w-full h-10 bg-background/90 border-border/50">
                    <SelectValue placeholder="Select District..." />
                </SelectTrigger>
                <SelectContent>
                    {districts.map(({ key, label }) => (
                        <SelectItem key={key} value={key}>
                            {label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
    )
}
