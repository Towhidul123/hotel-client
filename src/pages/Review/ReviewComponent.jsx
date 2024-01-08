import React from 'react';

const ReviewComponent = ({ username, rating, comment, timestamp }) => {
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-4">
            <h4 className="text-xl font-bold mb-2">Name: {username}</h4>
            <p>Rating: {rating}</p>
            <p>Comment: {comment}</p>
            <p className="mt-2 text-gray-600">{new Date(timestamp).toLocaleString()}</p>
        </div>
    );
};

export default ReviewComponent;
