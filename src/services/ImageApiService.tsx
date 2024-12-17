import axios from "axios";

const apiClient = axios.create({
    headers: {
        "ngrok-skip-browser-warning": true
    },
});

export const retrieveProductImage = async (fileUrl: string): Promise<string> => {
    try {
        const response = await apiClient.get(fileUrl, {
            responseType: "arraybuffer",
        });
        const base64 = btoa(
            new Uint8Array(response.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ''
            )
        );
        return `data:image/jpeg;base64,${base64}`;
    } catch (error) {
        console.error("Error retrieving product image:", error);
        return '';
    }
};