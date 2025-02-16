import PropTypes from 'prop-types'

const Notification = ({ message, msgType }) => {
  Notification.propTypes = {
    message: PropTypes.string,
    msgType: PropTypes.string
  }

  if (message === null) return null

  if (msgType === 'error') { return <div className='error'>{message}</div> } else { return <div className='success'>{message}</div> }
}

export default Notification
