const InfoCountrie = ({ capitals = ["Does not have capital"], area }) => {
  return (
    <div>
      <p>
        <strong>{capitals.length === 1 ? "Capital: " : "Capitals: "}</strong>
        {capitals.join(", ")}
      </p>
      <p>
        <strong>Area: </strong>
        {area}
      </p>
    </div>
  );
};

export default InfoCountrie;
