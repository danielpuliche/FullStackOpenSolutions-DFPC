const Notification = ({ type, message }) => {
  const SuccessStyle = {
    color: "green",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  const ErrorStyle = {
    color: "red",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  switch (type) {
    case "Success":
      return <div style={SuccessStyle}>{message}</div>;
    case "Error":
      return <div style={ErrorStyle}>{message}</div>;
    default:
      return null;
  }
};

export default Notification;
