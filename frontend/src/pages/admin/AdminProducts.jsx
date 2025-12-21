import React, { useEffect, useState } from 'react';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token'); // or from Redux
    fetch(`${import.meta.env.VITE_API_URL}/api/admin/products`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  return (
    <div>
      <h2>📦 Product Management</h2>
      <ul>
        {products.map(prod => (
          <li key={prod._id}>{prod.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminProducts;
