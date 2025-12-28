export interface Food {
    food_id: number,
    name: string,
    description?: string | null,
    category_id: number,
    is_verified?: boolean,
    created_at?: Date
}
