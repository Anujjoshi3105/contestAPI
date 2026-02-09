export function mapRating(rating: number): string {
    if (rating >= 2135) return 'Guardian';
    else if (rating >= 1850) return 'Knight';
    else if (rating >= 1600) return 'Expert';
    else if (rating >= 1400) return 'Advanced';
    else if (rating >= 1200) return 'Intermediate';
    return 'Novice';
}