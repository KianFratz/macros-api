export interface Nutrition {
    nutrition_id: number,
    food_id: number,
    calories: number,
    protein: number,
    carbs: number,
    fat?: number,
    fiber?: number,
    sugar?: number,
    sodium?: number,
    created_at?: Date
}