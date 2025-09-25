import "./css/card.css"

function Card({ title, number }) {
    return (
        <div className="card-container">
            <h3 className="card-title">{title}</h3>
            <p className="card-number">{number}</p>
        </div>
    );
}
  
export default Card;
  