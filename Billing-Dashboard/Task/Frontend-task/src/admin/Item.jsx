import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import axios from 'axios';

const Item = () => {
  const navigate = useNavigate();
  const { apipath } = useAuth();
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(apipath + '/items/details');
      setItems(response.data.items);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleUpdate = (id) => {
    navigate(`/editItems/${id}`);
  };

  return (
    <>
      <SideBar />
      <div className="home">
        <div className="toggle-sidebar" style={{ display: 'none' }}>
          <i className='bi bi-menu'></i>
        </div>
        <div className='admin-banner'>
          <Link to="/additem" className="add-btn">
            <button><i className="bi bi-plus-circle-fill"></i> Add</button>
          </Link>
          <div className="row">
            {items.map((item) => (
              <div className="col-lg-4" key={item._id} onClick={() => handleUpdate(item._id)}>
                <div className={`customer-dashbox ${item.status ? '' : 'inactive'}`}>
                  <h2>{item.item_name}</h2>
                  <div className={item.status ? 'active-box' : 'inactive-box'}>
                    <h3 className="pt-2">{item.status ? 'Active' : 'Inactive'}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Item;
