import "./Card.css";

const Card = (props) => {
  return (
    <div className="card">
      <img src={props.imgsrc} alt="" />
      <div className="CardDetails">
        <h3>{props.Title}</h3>
        <p>{props.desc}</p>
      </div>
    </div>
  );
};

export default Card;
