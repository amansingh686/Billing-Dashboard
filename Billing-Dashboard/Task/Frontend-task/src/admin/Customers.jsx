import React, { useEffect, useState } from 'react';
import SideBar from './SideBar';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Customers = () => { 
  const navigate = useNavigate();  
  const { apipath } = useAuth();
  const [customers, setCustomers] = useState([]);
    
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(apipath + '/customers/details');
      setCustomers(response.data.customers);
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  const handleUpdate = async (id) => {
    navigate(`/editCustomer/${id}`);
  };

  return (
    <>
      <SideBar />
      <div className="home">
        <div className="toggle-sidebar" style={{ display: "none" }}>
          <i className='bi bi-menu'></i>
        </div>
        <div className='admin-banner'>
          <Link to="/addcustomer" className="add-btn">
            <button><i className="bi bi-plus-circle-fill"></i> Add</button>
          </Link>
          <div className="row">
            {customers.map((customer) => (
              <div 
                className="col-lg-4" 
                key={customer._id} 
                onClick={() => handleUpdate(customer._id)}
                style={{ cursor: 'pointer' }}
              >
                <div className={`customer-dashbox ${customer.status ? '' : 'inactive'}`}>
                  <h2>{customer.customer_name}</h2>
                  <div className={customer.status ? 'active-box' : 'inactive-box'}>
                    <h3 className="pt-2">{customer.status ? 'Active' : 'Inactive'}</h3>
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

export default Customers;

