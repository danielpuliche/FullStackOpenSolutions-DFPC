const Content = ({ anecdotes, selected, points }) => {
  if (selected === -1) {
    return (
      <>
        <p>No votes registered!</p>
      </>
    );
  } else {
    return (
      <>
        <p>{anecdotes[selected]}</p>
        <p>Has {points[selected]} points.</p>
      </>
    );
  }
};

export default Content;
