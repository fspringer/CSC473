
import {useRef} from "react"
import {FaTrashAlt} from "react-icons/fa";
import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa'; 



const Content=({items, handleDelete, handleUpdate, updateItem, setUpdateItem})=>{
   const [isHovered, setIsHovered] = useState(false); //makes a label into a inpu and vise versa
   
   const inputRef=useRef();
   
   return(
      <main>         
         {items.length ? 
            <ul>
               {items.map((item)=>(
                  <li className="item"  key={item.ItemID}>    
                  
                  <FaTrashAlt
                        className="btn btn-primary float-right"
                        onClick={()=>handleDelete(item.ItemID)}
                        role="button"
                        tabIndex=""
                     />

                     <div
                        onMouseEnter={() => setIsHovered(true)} 
                        onMouseLeave={() => setIsHovered(false)}
                     >
                        {/* {isHovered ? (        */}
                              <form id="updateForm" onSubmit={(e)=>e.preventDefault()}>
                                 {isHovered ? (    
                                       <div>
                                          <label htmlFor="updateItem"/>
                                          <input id="updateItem" 
                                                type="text" 
                                                style={{
                                                   fontSize:".85rem",   
                                                   textAlign: "left",                                       
                                                   width: "200px",                                       //minWidth: "48px",
                                                   // height: "2.0rem",
                                                   height: "48px",
                                                   minHeight: "48px",
                                                   // cursor: pointer;
                                                   marginRight: "0.5rem"
                                                }}
                                                ref={inputRef}
                                                defaultValue={item.Name}                                     
                                                onChange={(e)=>setUpdateItem(e.target.value)}                                       
                                          />
                                          <button  
                                             type="submit"           
                                             text="Update"                      
                                             //arial-label="Update"
                                             //onClick={()=>inputRef.current.focus()}                                 
                                             onClick={()=>handleUpdate(item.ItemID)}
                                          >                                   
                                             {/* <FaPaperPlane />  */}
                                             Update
                                          </button>

                                       </div> ) : (
                                       <div >
                                          <label style={{
                                                   fontSize:"1.9rem",   
                                                   textAlign: "left",                                       
                                                   // width: "200px",                                       
                                                   // height: "2.0rem",
                                                   // height: "48px",
                                                   // minHeight: "48px",
                                                   // cursor: pointer;
                                                   // marginRight: "0.5rem"
                                                }}
                                          >
                                             {item.Name}
                                          </label> 
                                       </div>
                                 )}
                              </form>
                     </div>
                  </li>
               ))}
               </ul>
         : 
         (<p style={{marginTop: "2rem"}}> Your list is empty.</p>) 
         }         
      </main>
   );
};

export default Content;