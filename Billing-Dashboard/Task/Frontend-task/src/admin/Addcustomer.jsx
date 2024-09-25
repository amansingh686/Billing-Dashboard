import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import SideBar from './SideBar';

const Addcustomer = () => {
  const navigate = useNavigate();    
  const { apipath } = useAuth();
  const [formData, setFormData] = useState({
    customer_name: '',
    pan_card: '',
    gst_number: '',
    address: '',
    status: true, // default to true or false as needed
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'status' ? value === 'true' : value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const response = await fetch(apipath + '/customers/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.status === 201) {
      iziToast.success({
        message: "Customer add successful",
        position: "topCenter"
      });
      navigate("/customer");
    } else {
      iziToast.error({
        message: "Customer add failed",
        position: "topCenter"
      });
    }
  };
  
  return (
    <>
      <SideBar/>
      <section className="home">
        <div className="toggle-sidebar" style={{ display: "none" }}>
          <i className="bi bi-menu"></i>
        </div>

        <div className="container pt-3">
          <div className="row top-barcolumn">
            <div className="col-lg-10 nav-column">
              <h5>Add New Customer</h5>
              <div>
                <form onSubmit={handleRegister}>
                  <div className="mb-3">
                    <div className="p-block row">
                      <div className="col-lg-6">
                        <div className="p-field">
                          <label htmlFor="customer_name">Customer Name</label>
                          <div className="input-group p-group">
                            <div className="input-group-prepend p-prepend">
                              <span className="input-group-text p-group-text" id="basic-addon1">
                                <i className="bi bi-person"></i>
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control p-control"
                              placeholder="Customer Name"
                              aria-label="customer_name"
                              aria-describedby="basic-addon1"
                              name="customer_name"
                              value={formData.customer_name}
                              onChange={handleChange}
                              maxLength="50"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="p-field">
                          <label htmlFor="address">Customer Address</label>
                          <div className="input-group p-group">
                            <div className="input-group-prepend p-prepend">
                              <span className="input-group-text p-group-text" id="basic-addon1">
                                <i className="bi bi-person"></i>
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control p-control"
                              placeholder="Customer Address"
                              aria-label="address"
                              aria-describedby="basic-addon1"
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                              maxLength="100"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="p-block row">
                      <div className="col-lg-6">
                        <div className="p-field">
                          <label htmlFor="pan_card">Customer Pan card Number</label>
                          <div className="input-group p-group">
                            <div className="input-group-prepend p-prepend">
                              <span className="input-group-text p-group-text" id="basic-addon1">
                                <i className="bi bi-telephone"></i>
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control p-control"
                              placeholder="PAN Card Number"
                              aria-label="pan_card"
                              aria-describedby="basic-addon1"
                              name="pan_card"
                              value={formData.pan_card}
                              onChange={handleChange}
                              maxLength="10"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="p-field">
                          <label htmlFor="gst_number">Customer GST Number</label>
                          <div className="input-group p-group">
                            <div className="input-group-prepend p-prepend">
                              <span className="input-group-text p-group-text" id="basic-addon1">
                                <i className="bi bi-envelope"></i>
                              </span>
                            </div>
                            <input
                              type="text"
                              className="form-control p-control"
                              placeholder="GST Number"
                              aria-label="gst_number"
                              aria-describedby="basic-addon1"
                              name="gst_number"
                              value={formData.gst_number}
                              onChange={handleChange}
                              maxLength="50"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <div className="p-block row">
                      <div className="col-lg-6">
                        <div className="p-field">
                          <label htmlFor="status">Customer Status</label>
                          <div className="input-group p-group">
                            <select
                              name="status"
                              id="status"
                              className="form-control p-control"
                              value={formData.status}
                              onChange={handleChange}
                            >
                              <option value="true">Active</option>
                              <option value="false">Inactive</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="cancel-create-btn">
                    <Link to="/customer">
                      <button className="in-btn1">
                        Cancel
                      </button>
                    </Link>
                    <button type="submit" className="in-btn2">
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Addcustomer;