export interface CocktailModel {
    id: string,
    title: string,
    description: string,
    base: string,
    ingredients: string[],
    garnish: string,
    steps: string[],
    img: string,
    glass: string
}
