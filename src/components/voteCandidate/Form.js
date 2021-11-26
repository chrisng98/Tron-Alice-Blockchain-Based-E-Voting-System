import React from 'react'
import "../../components/privatescreens/User/PrivateScreen.css";

class Form extends React.Component {
  render() {
    return (
      <form onSubmit={(event) => {
        event.preventDefault()
        this.props.castVote(this.candidateId.value)
      }}>
        <div className='private-screen__form'>
          <label>Candidate Selection</label>
          <br></br>
          <select ref={(input) => this.candidateId = input} className='private-screen__inform'>
            {this.props.candidates.map((candidate) => {
              return <option key={candidate.id.toString()} value={candidate.id}>{candidate.name}</option>
            })}
          </select>
        </div>
        <button type='submit' className='btn btn-primary'>Vote here</button>
        <hr />
      </form>
    )
  }
}

export default Form;