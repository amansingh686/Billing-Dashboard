import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import axios from 'axios';

const Main = () => {
  const { apipath } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [items, setItems] = useState([]);
    
  useEffect(() => {
    fetchCustomers();
    fetchItems();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(apipath + '/customers/details');
      setCustomers(response.data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const fetchItems = async () => {
    try {
        const response = await axios.get(apipath + '/items/details');
        setItems(response.data);
    } catch (error) {
        console.error('Error fetching items:', error);
    }
};

  return (
    <>

    <SideBar />
    
    <div className="home">
    <div class="toggle-sidebar" style={{display: "none"}}>
            <i class='bi bi-menu'></i>
        </div>
        <div className='admin-banner'>

            <div className="row">
            <div className="col-lg-4">
              <Link to="/customer" className='dash-link'>
              <div className="admin-dashbox">
                        <h2>Customer</h2>
                        <h2>{customers.customersCount}</h2>
                        <h3 className="pt-2">Read or Create Customer data</h3>
                    </div>
              </Link>
                </div>
            <div className="col-lg-4">
            <Link to="/item" className='dash-link'>
                <div className="admin-dashbox">
                        <h2>Items</h2>
                        <h2>{items.itemsCount}</h2>
                        <h3 className="pt-2">Read or Create items data</h3>
                    </div>
                </Link>
                </div>
            </div>

        </div>
    </div>



    </>
  )
}

export default Main