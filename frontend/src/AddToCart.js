import React, { useState } from 'react';
import axios from 'axios';

function AddToCart() {
  const [flavorId, setFlavorId] = useState('');
  const [customerId, setCustomerId] = useState('');

  const handleAddToCart = () => {
    const cartItem = { flavor_id: flavorId, customer_id: customerId };
    axios.post('http://localhost:5000/cart', cartItem)
      .then(response => alert('Added to cart!'))
      .catch(error => console.error('Error adding to cart:', error));
  };

  return (
    <div>
      <h1>Add to Cart</h1>
      <input
        type="number"
        placeholder="Flavor ID"
        value={flavorId}
        onChange={(e) => setFlavorId(e.target.value)}
      />
      <input
        type="number"
        placeholder="Customer ID"
        value={customerId}
        onChange={(e) => setCustomerId(e.target.value)}
      />
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
}

export default AddToCart;
