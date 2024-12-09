import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserPanel = () => {
    const [iceCreams, setIceCreams] = useState([]);
    const [cart, setCart] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [allergens, setAllergens] = useState('');
    const [selectedIceCream, setSelectedIceCream] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/api/ice-creams')
            .then(response => setIceCreams(response.data))
            .catch(error => console.error('Error fetching ice creams:', error));
    }, []);

    const addToCart = (iceCream) => {
        setCart([...cart, iceCream]);
    };

    const removeFromCart = (id) => {
        setCart(cart.filter(item => item[0] !== id));
    };

    const handleSearch = () => {
        return iceCreams.filter(iceCream =>
            iceCream[1].toLowerCase().includes(searchQuery.toLowerCase()) ||
            (iceCream[4] && iceCream[4].toLowerCase().includes(searchQuery.toLowerCase()))
        );
    };

    const handleAddAllergens = () => {
        if (!selectedIceCream) return;

        const updatedIceCream = { ...selectedIceCream };
        const existingAllergens = updatedIceCream.allergens ? updatedIceCream.allergens.split(', ') : [];
        if (!existingAllergens.includes(allergens)) {
            updatedIceCream.allergens = existingAllergens.concat(allergens).join(', ');

            axios.put('http://localhost:5000/api/admin/ice-creams', {
                id: selectedIceCream[0],
                allergens: updatedIceCream.allergens
            })
                .then(response => {
                    alert(response.data.message);
                    setIceCreams(prevState => prevState.map(iceCream =>
                        iceCream[0] === selectedIceCream[0] ? updatedIceCream : iceCream
                    ));
                    setAllergens('');
                })
                .catch(error => console.error('Error updating allergens:', error));
        } else {
            alert('This allergen already exists.');
        }
    };

    const handleBuy = () => {
        const orderDetails = cart.map(item => ({
            ice_cream_id: item[0],
            quantity: 1  
        }));

        axios.post('http://localhost:5000/api/orders', { orders: orderDetails })
            .then(response => {
                alert('Order placed successfully!');
                setCart([]);  
            })
            .catch(error => console.error('Error placing order:', error));
    };

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item[2], 0).toFixed(2);
    };

    return (
        <div>
            <h2>Available Ice Creams</h2>
            <input
                type="text"
                placeholder="Search by name or allergens"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <ul>
                {handleSearch().map(iceCream => (
                    <li key={iceCream[0]}>
                        {iceCream[1]} - ${iceCream[2]} 
                        <button onClick={() => addToCart(iceCream)}>Add to Cart</button>
                        <button onClick={() => setSelectedIceCream(iceCream)}>Add Allergens</button>
                    </li>
                ))}
            </ul>

            {selectedIceCream && (
                <div>
                    <h3>Add Allergens for {selectedIceCream[1]}</h3>
                    <input
                        type="text"
                        placeholder="Enter allergens"
                        value={allergens}
                        onChange={(e) => setAllergens(e.target.value)}
                    />
                    <button onClick={handleAddAllergens}>Add Allergens</button>
                </div>
            )}

            <h3>Cart</h3>
            <ul>
                {cart.map((item, index) => (
                    <li key={index}>
                        {item[1]} - ${item[2]} 
                        <button onClick={() => removeFromCart(item[0])}>Remove</button>
                    </li>
                ))}
            </ul>

            <h4>Total: ${calculateTotal()}</h4>

            <button onClick={handleBuy}>Buy</button>
        </div>
    );
};

export default UserPanel;
