import React, { useContext } from 'react'
import { WAITING_QUESTION } from '../../constants/gameStates'
import useDelayedSetGameState from '../hooks/useDelayedSetGameState'
import { RoomContext } from '../socketConnection'

const TeamStart = () => {
  const {
    users, teams, isAdmin, room, actions: { setGameState }
  } = useContext(RoomContext)

  const sortedTeams = teams.sort((a, b) =>
    ((a.order > b.order) ? 1 : ((b.order > a.order) ? -1 : 0)))

  useDelayedSetGameState(isAdmin, setGameState, WAITING_QUESTION, 5000)

  return <>
    <ol>
      {sortedTeams.map(team =>
        <li key={team.id}>
          {team.name} ({team.members.map(id => getUserName(id)).join(' and ')})
        </li>
      )}
    </ol>
    <p>It&apos;s {room.currentPlayingTeam.name} turn!</p>
  </>
}

export default TeamStart
