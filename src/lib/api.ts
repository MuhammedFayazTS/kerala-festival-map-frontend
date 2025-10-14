export const fetchFestivalData = async () => {
    try {
        const response = await fetch('https://muhammedfayazts.github.io/kerala-festivals/festivals.json');
        if (!response.ok) {
            throw new Error('Failed to fetch festival data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching festival data:', error);
        throw error;
    }
};