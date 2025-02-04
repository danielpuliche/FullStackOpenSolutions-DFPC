const Notification = ({ message, msgType }) => {
  if (message === null) return null

  if (msgType === 'error') { return <div className='error'>{message}</div> } else { return <div className='success'>{message}</div> }
}

export default Notification
