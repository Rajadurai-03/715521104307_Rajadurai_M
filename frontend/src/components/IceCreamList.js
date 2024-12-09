import React, { useEffect, useState } from 'react';
import axios from 'axios';

const IceCreamList = () => {
    const [iceCreams, setIceCreams] = useState([]);
    const [orderQuantity, setOrderQuantity] = useState({});

    useEffect(() => {
        axios.get('http://localhost:5000/api/ice-creams')
            .then(response => setIceCreams(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleOrder = (id) => {
        const quantity = orderQuantity[id] || 1;
        axios.post('http://localhost:5000/api/orders', { ice_cream_id: id, quantity })
            .then(response => alert(response.data.message))
            .catch(error => console.error('Error placing order:', error));
    };

    return (
        <div>
            <h2>Available Ice Creams</h2>
            <ul>
                {iceCreams.map(iceCream => (
                    <li key={iceCream[0]}>
                        {iceCream[1]} - ${iceCream[2]}
                        <input
                            type="number"
                            value={orderQuantity[iceCream[0]] || 1}
                            onChange={(e) => setOrderQuantity({ ...orderQuantity, [iceCream[0]]: e.target.value })}
                            min="1"
                        />
                        <button onClick={() => handleOrder(iceCream[0])}>Order</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default IceCreamList;
