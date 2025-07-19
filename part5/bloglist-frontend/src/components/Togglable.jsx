import { useState } from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [visible, setVisibility] = useState(false)

  const toggleVisibility = () => {
    setVisibility(visibility => !visibility)
  }

  return(
    <div>
      { visible ?
        <>
          {props.children}
          <button onClick={toggleVisibility}>cancel</button>
        </> :
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      }
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable