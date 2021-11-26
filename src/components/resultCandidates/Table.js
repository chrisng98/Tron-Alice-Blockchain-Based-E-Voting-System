import React from 'react'
import "../../components/privatescreens/User/PrivateScreen.css";

class Table extends React.Component {
  render() {

    return (
      <table className='private-screen__table'>
        <thead>
          <tr className = "private-screen__title">
            <th>ID</th>
            <th>Name of candidate</th>
            <th>Votes</th>
          </tr>
        </thead>
        <tbody >
          {this.props.candidates.map((candidate) => {
            return(
              
              <tr key={candidate.id.toString()} className = "private-screen__title">
                <th>{candidate.id}</th>
                <td>{candidate.name}</td>
                <td>{candidate.voteCount}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    )
  }
}

export default Table;