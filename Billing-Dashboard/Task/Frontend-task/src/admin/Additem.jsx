import React, { useState } from 'react'
import SideBar from './SideBar'
import { useAuth } from '../AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import iziToast from 'izitoast';

const Additem = () => {

  const navigate = useNavigate();    
  const { apipath } = useAuth();
  const [formData, setFormData] = useState({
    item_name: '',
    price: '',
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

    const response = await fetch(apipath + '/items/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.status === 201) {
      iziToast.success({
        message: "Items add successful",
        position: "topCenter"
      });
      navigate("/item");
    } else {
      iziToast.error({
        message: "Items add failed",
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

        <div class="container pt-3">
          <div class="row top-barcolumn">
          
            <div class="col-lg-10 nav-column">
            <h5>Add New Customer</h5>
              <div>
                <form onSubmit={handleRegister}>
                  <div class="mb-3">
                    <div className="p-block row">
                      <div className="col-lg-6">
                        <div className="p-field">
                          <label htmlFor="fname">Item Name</label>
                          <div class="input-group p-group">
                            <div class="input-group-prepend p-prepend">
                              <span
                                class="input-group-text p-group-text"
                                id="basic-addon1"
                              >
                                <i className="bi bi-person"></i>
                              </span>
                            </div>
                            <input
                              type="text"
                              class="form-control p-control"
                              placeholder="Enter Item Name"
                              aria-label="fname"
                              aria-describedby="basic-addon1"
                              name="item_name"
                              value={formData.item_name}
                              onChange={handleChange}
                              maxLength="100"
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="p-field">
                          <label htmlFor="lname">Customer Selling price</label>
                          <div class="input-group p-group">
                            <div class="input-group-prepend p-prepend">
                              <span
                                class="input-group-text p-group-text"
                                id="basic-addon1"
                              >
                                <i className="bi bi-person"></i>
                              </span>
                            </div>
                            <input
                              type="text"
                              class="form-control p-control"
                              placeholder="Enter Selling price"
                              aria-label="lname"
                              aria-describedby="basic-addon1"
                              name="price"
                              value={formData.price}
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
                 <Link to="/item">
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
  )
}

export default Additem