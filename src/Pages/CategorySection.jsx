import "./CategorySection.css";
import { useNavigate } from "react-router-dom";

export default function CategorySection({ title, items }) {
    const navigate = useNavigate();
    // console.log(title, items)

    return (
        <div className="category-section">
            <div className="section-header">
                <h2>{title}</h2>
                {/* <span className="view-all">View All</span> */}
            </div>

            <div className="category-grid11">
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="category-tile"
                        onClick={() =>
                            navigate(`/category/${item.type}/${item.value}`, {
                                state: { title: item.title },
                            })
                        }
                    >
                        <div className="tile-overlay" />
                        <h3>{item.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}
