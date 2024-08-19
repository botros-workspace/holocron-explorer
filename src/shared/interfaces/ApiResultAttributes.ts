import { Character } from './CharacterAttributes'
import { Film } from './FilmAttributes'
import { Planet } from './PlanetAttributes'
import { Species } from './SpeciesAttributes'
import { Starship } from './StarshipAttributes'
import { Vehicle } from './VehicleAttributes'

export interface Result {
  count: number
  next: string
  previous: string
  results: Character[] | Film[] | Planet[] | Species[] | Vehicle[] | Starship[]
}
