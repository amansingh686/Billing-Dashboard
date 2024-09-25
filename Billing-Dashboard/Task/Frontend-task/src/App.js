
import Addcustomer from './admin/Addcustomer';
import Additem from './admin/Additem';
import Customers from './admin/Customers';
import EditCustomer from './admin/EditCustomer';
import EditItems from './admin/EditItems';
import Item from './admin/Item';
import Main from './admin/Main';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route exact path="/" element={<Main />} /> 
         <Route exact path="/customer" element={<Customers/>} /> 
         <Route exact path="/addcustomer" element={<Addcustomer/>} /> 
         <Route exact path="/item" element={<Item/>} /> 
         <Route exact path="/additem" element={<Additem/>} /> 
         <Route exact path="/editCustomer/:customerId" element={<EditCustomer/>} /> 
         <Route exact path="/editItems/:itemId" element={<EditItems/>} /> 
        </Routes>
      </Router>
    </div>
  );
}

export default App;
