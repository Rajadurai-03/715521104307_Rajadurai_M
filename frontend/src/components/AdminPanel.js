import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminPanel = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [seasonal, setSeasonal] = useState(false);
    const [ingredients, setIngredients] = useState('');
    const [allergens, setAllergens] = useState('');
    const [iceCreams, setIceCreams] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/ice-creams')
            .then(response => setIceCreams(response.data))
            .catch(error => console.error('Error fetching ice creams:', error));
    }, []); 

    const addIceCream = () => {
        axios.post('http://localhost:5000/api/admin/ice-creams', { 
            name, 
            price: parseFloat(price),
            seasonal,
            ingredients,
            allergens
        })
            .then(response => {
                alert(response.data.message);
                setIceCreams([...iceCreams, { name, price: parseFloat(price), seasonal, ingredients, allergens }]); 
            })
            .catch(error => console.error('Error adding ice cream:', error));
    };

    const removeIceCream = (name) => {
        axios.delete('http://localhost:5000/api/admin/ice-creams', { data: { name } })
            .then(response => {
                alert(response.data.message);
                setIceCreams(iceCreams.filter(iceCream => iceCream.name !== name)); 
            })
            .catch(error => console.error('Error removing ice cream:', error));
    };

    return (
        <div>
            <h2>Admin Panel</h2>

            <div>
                <h3>Add Ice Cream</h3>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
                <input type="text" placeholder="Ingredients" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
                <input type="text" placeholder="Allergens" value={allergens} onChange={(e) => setAllergens(e.target.value)} />
                <label>
                    Seasonal
                    <input type="checkbox" checked={seasonal} onChange={() => setSeasonal(!seasonal)} />
                </label>
                <button onClick={addIceCream}>Add Ice Cream</button>
            </div>

            <div>
                <h3>Available Ice Creams</h3>
                <ul>
                    {iceCreams.map(iceCream => (
                        <li key={iceCream.name}>
                            {iceCream.name} - ${iceCream.price}
                            {iceCream.seasonal && <span> (Seasonal)</span>}
                            <button onClick={() => removeIceCream(iceCream.name)}>Remove</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default AdminPanel;
