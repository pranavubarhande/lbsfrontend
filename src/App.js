import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react'
import io from "socket.io-client";
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';
// const socket = io.connect(`http://localhost:3002`);
function App() {

  return (
    <div style={{height: 1000, width: '100%', backgroundColor: '#dee9fc'}}>
      <div>
        <h1 style={{textAlign: 'center', padding: '20px 10px', marginBottom: 20}}>Summary</h1>
        <div style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-evenly'}}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid black', borderRadius: 10, padding: 20}}>
            <h3>Total Requests</h3>
            <h3>5</h3>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid black', borderRadius: 10, padding: 20}}>
            <h3>Completed Requests</h3>
            <h3>5</h3>
          </div>
        </div>
        <div>
          <h3>Request Summary</h3>
          <table>
            <tr>
              <th>User</th>
              <th>Status</th>
              <th>Location</th>
              <th>Phone</th>
              <th>Action</th>
            </tr>
            <tr>
              <td>Content1</td>
              <td>Content1</td>
              <td>Content1</td>
              <td>Content1 </td>
              <td><button>Mark Complete</button></td>
            </tr>
            <tr>
              <td>Content2</td>
              <td>Content2</td>
              <td>Content2</td>
              <td>Content2 </td>
              <td><button>Mark Complete</button></td>
            </tr>
            <tr>
              <td>Content3</td>
              <td>Content3</td>
              <td>Content3</td>
              <td>Content3 </td>
              <td><button>Mark Complete</button></td>
            </tr>
          </table>
        </div>
      </div>
      
      
      
    </div>
  );
}


export default App;
