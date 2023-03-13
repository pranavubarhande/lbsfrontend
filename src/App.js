import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react'
import io from "socket.io-client";
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';
import { RadioGroup, Radio } from 'react-radio-input';
import 'chart.js/auto';
import { Doughnut, Pie } from 'react-chartjs-2';
import GoogleMapReact from 'google-map-react';
// const socket = io.connect(`http://localhost:3002`);
function App() {
  const [servicetype, setServiceType] = useState("ambulances");
  const [requestdata, setRequestdata] = useState([])
  const [internetcheck, setInternetcheck] = useState(0)
  const [total, setTotal] = useState(0)
  const [complete, setComplete] = useState(0)
  let statement = `${servicetype} near me`;
  useEffect(() => {
    console.log(servicetype);
    statement = `${servicetype} near me`;
    console.log(statement);
  }, [servicetype]);

  useEffect( () => {


    fetch("http://localhost:5000/getAllRequests").then((response) => response.json()).then((responseJson) => {
      
      console.log(responseJson);
      setRequestdata(responseJson);

      fetch("http://localhost:5000/getTotalAll").then((res) => res.json()).then((rJ) => {
      
          console.log(rJ);
          setTotal(rJ[0].total);

          fetch("http://localhost:5000/getTotalComplete").then((r) => r.json()).then((rjs) => {
            
            console.log(rjs);
            setComplete(rjs[0].complete);
          }).catch(err => console.log('getreq',err));
      }).catch(err => console.log('getreq',err));

    }).catch(err => console.log('getreq',err));

    
    
  }, [internetcheck])
  const completeRequest = (id) => {
    fetch("http://localhost:5000/markrequestcomplete", {id:id}).then(res => {
      setInternetcheck(internetcheck + 1);
    }).catch(err => console.log(err))

  }
  
  

  return (
    <div style={{display: 'flex', flexDirection: 'column', width: '100%', height: '100%', backgroundColor: '#f5edfa', padding: '0px 5px'}}>
      <div style={{display:'flex', flexDirection: 'row', height: 300, width: '100%'}}>
        <div style={{width: '25%', margin: '10px 5px', backgroundColor: 'white', borderRadius: 10, border: '1px solid black', borderRadius: 10, justifyContent: 'center'}}>
          <div style={{flexDirection: 'column', display: 'flex', justifyContent: 'space-around'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid white', borderRadius: 10, padding: 20}} >
              <h3 style={{color:'black'}}>Total Requests</h3>
              <h3 style={{color:'black'}}>{total}</h3>
            </div>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid white', borderRadius: 10, padding: 20}}>
              <h3 style={{color:'black'}}>Completed Requests</h3>
              <h3 style={{color:'black'}}>{complete}</h3>
            </div>
          </div>
          
        </div>
        <div style={{width: '50%', margin: '10px 5px', backgroundColor: 'white', borderRadius: 10, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'}}>
          <RadioGroup
            name="serviceType"
            onChange={setServiceType}
            selectedValue={servicetype}
            style={{width: '100%', marginBottom: 20, border: '2px white'}}
          >
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <label htmlFor="ambulanceOption">
                <Radio id="ambulanceOption" value="ambulances" />
                Ambulances
              </label>
              <label htmlFor="firebrigadeOption">
                <Radio id="firebrigadeOption" value="firebrigades" />
                Fire Brigades
              </label>
              <label htmlFor="policeOption">
                <Radio id="policeOption" value="police" />
                Police
              </label>

            </div>
            
            
          </RadioGroup>
          <iframe style={{width: '100%', borderRadius: '10px'}} src={`https://maps.google.com/maps?q=${statement} india,mumbai&t=&z=13&ie=UTF8&iwloc=&output=embed`} scrolling="yes" height={"80%"}></iframe>
        </div>
        <div style={{width: '25%', margin: '10px 5px', backgroundColor: 'white', borderRadius: 10, display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center'}}>
          <Doughnut
              data = {{
                datasets: [{
                    data: [10, 20, 30]
                }],
            
                // These labels appear in the legend and in the tooltips when hovering different arcs
                labels: [
                    'Fire',
                    'Crime',
                    'Accident'
                ]
            }}
           />
        </div>

      </div>
      <div style={{display:'flex', flexDirection: 'row', width: '100%', height: 500}}>
        <div style={{width: '50%', margin: '10px 5px', backgroundColor: 'white', borderRadius: 10}}>
            <table id="customers" style={{borderRadius:'20px'}}>
             <tr>
               <th>Ticketid</th>
               <th>User</th>
               <th>Location</th>
               <th>Phone</th>
               <th>Action</th>
               <th>Type</th>
               <th>Severity</th>
             </tr>
             {
              requestdata.map(element => {
                
                return(
                  
                <tr id={element.id}>
                  <td>{element.id}</td>
                  <td>{element.username}</td>
                  <td>{element.latitude}</td>
                  <td>{element.phone}</td>
                  <td>{element.iscompleted? <button disabled={true}>Complete</button>: <button onClick={() => {completeRequest(element.id)}}>Mark Complete</button>}</td>
                  <td>{element.etype}</td>
                  <td>{element.severity}</td>
                </tr>)
              })
            }
            
          </table>
        </div>
        <div style={{width: '25%', margin: '10px 5px', backgroundColor: 'white', borderRadius: 10}}>
          <h1>2st</h1>
        </div>
        <div style={{width: '25%', margin: '10px 5px', backgroundColor: 'white', borderRadius: 10}}>
          
        </div>

      </div>

    </div>
    // <div style={{height: "100%", width: '100%', backgroundColor: '#FFF8EA', display: 'flex', flexDirection: 'row', margin: '0px'}}>
    //   <div>
    //     <div style={{float:'left', height:"200px", width:"430px"}}><h1 class="glow2">EMERGENCY DISPATCH DASHBOARD</h1></div>
        
    //     <div style={{textAlign:'left', height:"500px", width:"430px", marginTop:"240px"}}>
          
    //     <RadioGroup
    //       name="serviceType"
    //       onChange={setServiceType}
    //       selectedValue={servicetype}
    //     >
    //       <label htmlFor="ambulanceOption">
    //         <Radio id="ambulanceOption" value="ambulances" />
    //         Ambulances
    //       </label>
    //       <label htmlFor="firebrigadeOption">
    //         <Radio id="firebrigadeOption" value="firebrigades" />
    //         Fire Brigades
    //       </label>
    //       <label htmlFor="policeOption">
    //         <Radio id="policeOption" value="police" />
    //         Police
    //       </label>
    //     </RadioGroup>
          
    //       <div style={{overflow:'hidden', height:"500px", width:"430px"}}>
    //         <iframe width="430px" height="500px" src={`https://maps.google.com/maps?q=${statement} india,mumbai&t=&z=13&ie=UTF8&iwloc=&output=embed`} scrolling="yes"></iframe>
    //         <br></br>
    //         </div>
    //     </div>
    //   </div>
      
    //   <div style={{float:"right", borderLeft:"2px solid #594545", alignItems: 'center', width: '100%', backgroundColor: '#FFF8EA'}}>
    //     <h1 class="glow">Summary</h1>
    //     <div style={{flexDirection: 'row', display: 'flex', justifyContent: 'space-evenly'}}>
    //       <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #594545', borderRadius: 10, padding: 20}} >
    //         <h3 style={{color:'#594545'}}>Total Requests</h3>
    //         <h3 style={{color:'black'}}>{total}</h3>
    //       </div>
    //       <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #594545', borderRadius: 10, padding: 20}}>
    //         <h3 style={{color:'#594545'}}>Completed Requests</h3>
    //         <h3 style={{color:'black'}}>{complete}</h3>
    //       </div>
    //     </div>
    //     <div style={{width: '100%'}}>
    //       <h3 style={{color:'#594545', textAlign: 'center', marginTop:'70px', fontSize:'30px', marginBottom:'50px'}}>Request Summary</h3>
    //       <table class="center">
    //         <tr class="a">
    //           <th>Ticketid</th>
    //           <th>User</th>
    //           <th>Location</th>
    //           <th>Phone</th>
    //           <th>Action</th>
    //           <th>Type</th>
    //           <th>Severity</th>
    //         </tr>
    //         {
    //           requestdata.map(element => {
                
    //             return(
                  
    //             <tr id={element.id}>
    //               <td>{element.id}</td>
    //               <td>{element.username}</td>
    //               <td>{element.latitude}</td>
    //               <td>{element.phone}</td>
    //               <td>{element.iscompleted? <button disabled={true}>Complete</button>: <button onClick={() => {completeRequest(element.id)}}>Mark Complete</button>}</td>
    //               <td>{element.etype}</td>
    //               <td>{element.severity}</td>
    //             </tr>)
    //           })
    //         }
            
    //       </table>
    //     </div>
    //   </div>
      
      
      
    // </div>
  );
}


export default App;
