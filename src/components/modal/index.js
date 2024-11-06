import React from "react";
import "./index.css";

export default function Index({ isShow, data, onCancel }) {
    const defaultImageUrl = "https://ih1.redbubble.net/image.4905811447.8675/fposter,small,wall_texture,product,750x1000.jpg";
    const imageUrl = data?.i?.imageUrl || defaultImageUrl;

    return (
        <div className={!isShow ? "hidden" : ""} data-cy="modal-delete">
            <div className="modal-bg" onClick={onCancel}></div>
            <div className="modal">
                {data && <img src={imageUrl} alt={data.l} />}
                {data && (
                    <div className="modal-content">
                        <h2>{data.l}</h2>
                        <p><strong>Tipe:</strong> {data.q}</p>
                        <p><strong>Tahun:</strong> {data.y}</p>
                        <p><strong>Pemeran:</strong> {data.s}</p>
                        {data.v && data.v.length > 0 && (
                            <div>
                                <h3>Videos:</h3>
                                <ul>
                                    {data.v.map(video => (
                                        <li key={video.id}>
                                            <a href={`https://www.youtube.com/watch?v=${video.id}`} target="_blank" rel="noopener noreferrer">
                                                {video.l} - {video.s}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
