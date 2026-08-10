const API_URL = "http://localhost:3000";

export async function getTravels() {
    const response = await fetch(`${API_URL}/api/travel`);

    if (!response.ok) {
        throw new Error("Failed to fetch travels");
    }

    return response.json();
}