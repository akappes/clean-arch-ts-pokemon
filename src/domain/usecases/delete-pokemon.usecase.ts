export interface DeletePokemon {
  delete: (id: string) => Promise<void>
}
