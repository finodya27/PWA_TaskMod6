import React from "react";
import "./index.css";

export default function index({ data, onClick }) {
    const defaultImageUrl = "https://ih1.redbubble.net/image.4905811447.8675/fposter,small,wall_texture,product,750x1000.jpg";
    const imageUrl = data?.i?.imageUrl || defaultImageUrl;

    return (
        <div className="card" onClick={onClick}>
            {data ? (
                <>
                    <figure>
                        <img src={imageUrl} alt={data.l} />
                    </figure>
                    <div className="card-info">
                        <h3>{data.l}</h3>
                        <p>{data.q}</p>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
