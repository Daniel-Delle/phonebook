function Notification({ successMsg, errorMsg }) {
  if (successMsg) {
    return <p className="success-message">{successMsg}</p>;
  }

  if (errorMsg) {
    return <p className="error-message">{errorMsg}</p>;
  }

  return null;
}

export default Notification;
