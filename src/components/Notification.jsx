import PropTypes from 'prop-types'

const Notification = ({ message, isSuccessful }) => {
  const notificationStyle = {
    color: isSuccessful ? 'green' : 'red',
    background: 'lightgrey',
    fontSize: 20,
    padding: 10,
    borderStyle: 'solid',
    borderRadius: 5
  }
  if (message) {
    return (
      <div style={notificationStyle}>
        {message}
      </div>
    )
  }
}

Notification.propTypes = {
  isSuccessful: PropTypes.bool.isRequired
}

export default Notification