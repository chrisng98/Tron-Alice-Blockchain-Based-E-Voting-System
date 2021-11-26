import React from 'react'
import "../../components/privatescreens/User/PrivateScreen.css";

class Form extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
          newcandidate: ""
    } 
  }

  render() {
    return (
      <form onSubmit={(e) => {
        e.preventDefault()
        this.props.castAdd(this.newcandidate.value)
      }}>

        <div className='private-screen__form'>
          <label>New Candidate: </label>
          <br></br>
            <input className ='private-screen__inform'
              type= "text"
              required
              placeholder="Enter Candidate's Name"
              ref = {(input) => this.newcandidate = input}  
            />
        </div>
        <button type='submit' className='btn btn-primary'>Confirm</button>
        <hr />
      </form>
    )
  }
}

export default Form;