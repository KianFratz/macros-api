export interface Food {
    name: string,
    description?: string | null,
    category_id: number,
    is_verified?: boolean,
    created_at?: Date
}
