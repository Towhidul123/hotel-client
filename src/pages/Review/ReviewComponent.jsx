import React from 'react';

const ReviewComponent = ({ username, rating, comment, timestamp }) => {
    return (
        <div className="review p-10">
            <h4>Name:{username}</h4>
            <p>Rating: {rating}</p>
            <p>Comment:{comment}</p>
            <p>{new Date(timestamp).toLocaleString()}</p>
        </div>
    );
};
export default ReviewComponent;