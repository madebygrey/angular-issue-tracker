export interface Issue {
    title: string;
    description: string;
    proirity: 'low' | 'high';
    type: 'Feature' | 'Bug' | 'Documentation';
    completed?: Date;
}
