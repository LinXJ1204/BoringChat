export function chatTimeFormat(t: number): string {
    const date = new Date(t)
    const hours = date.getHours(); // Get hours
    const minutes = date.getMinutes(); // Get minutes

    // Ensure two-digit format for hours and minutes
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}`;
}