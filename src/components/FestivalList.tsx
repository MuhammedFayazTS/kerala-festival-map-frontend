import { ScrollArea } from "@/components/ui/scroll-area"
import { FestivalListCard } from './FestivalListCard'

const dummyFestival = {
    "id": 1,
    "name": "Sabarimala Festival",
    "malayalamName": "",
    "startDate": "2025-04-02",
    "endDate": "2025-04-02",
    "malayalamDate": "",
    "isMajor": true,
    "location": {
        "district": "Pathanamthitta",
        "place": "Sabarimala Dharma Sastha Temple, Pathanamthitta",
        "coordinates": {
            "latitude": null,
            "longitude": null
        }
    },
    "description": "The **Arattu** at Sabarimala marks the grand finale of the annual festival at the revered Ayyappan Temple. This profoundly sacred ceremony is an opportunity for devotees to seek blessings from **Lord Ayyappa**. The purifying ritual involves a majestic procession where the sacred idol of Lord Ayyappa is carried with utmost reverence to the holy **Pamba River**, a lifeline for devotees. During the Arattu, the idol is ceremonially immersed in the river’s pristine waters, symbolizing spiritual purification and renewal. This act is believed to cleanse devotees of their sins and pave the way for a prosperous year ahead. The procession itself is a spectacle of devotion, accompanied by temple priests chanting sacred mantras, thousands of Ayyappa devotees immersed in prayer, and the rhythmic sounds of traditional music filling the air. The atmosphere is palpable with spiritual energy. For Ayyappa devotees, the Arattu holds immense significance, as it is not merely a ritual but a transformative experience that strengthens their faith and reinforces their connection with the divine. The Sabarimala Arattu is a testament to the enduring power of faith and tradition in Kerala’s cultural landscape. Pilgrims from across the globe converge at Sabarimala to participate in this momentous event, marking the culmination of their arduous pilgrimage.",
    "images": [],
    "tags": ["Temple Festival", "Ritual", "Music Festival"]
}

const FestivalList = () => {
    return (
        <ScrollArea className='max-h-full flex flex-col px-3 pt-4 sm:pt-0'>
            <FestivalListCard festival={dummyFestival} />
            <FestivalListCard festival={dummyFestival} />
            <FestivalListCard festival={dummyFestival} />
            <FestivalListCard festival={dummyFestival} />
        </ScrollArea>
    )
}

export default FestivalList