import type { Show } from '../types/show'
import ShowCard from './ShowCard'

interface ShowGridProps {
  shows: Show[]
}

export default function ShowGrid({ shows }: ShowGridProps) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5">
      {shows.map((show) => (
        <li key={show.id} className="flex">
          <ShowCard show={show} />
        </li>
      ))}
    </ul>
  )
}
