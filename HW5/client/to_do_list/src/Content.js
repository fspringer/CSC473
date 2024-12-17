
import {useRef} from "react"
import {FaTrashAlt} from "react-icons/fa";
import React, { useState } from 'react';
import { FaPaperPlane } from 'react-icons/fa'; 



const Content=({items, handleCheck, handleDelete, handleUpdate, updateItem, setUpdateItem})=>{
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

                     <input 
                        type="checkbox"
                        onChange={()=>handleCheck(item.ItemID)}
                        checked={item.checked}
                     />

                     <div
                        onMouseEnter={() => setIsHovered(true)} 
                        onMouseLeave={() => setIsHovered(false)}
                     >
                     {isHovered ? (       
                           <form id="updateForm" onSubmit={(e)=>e.preventDefault()}>
                              <label htmlFor="updateItem"/>
                              <input id="updateItem" 
                                    type="text" 
                                    style={{
                                       fontSize:"1rem",   
                                       textAlign: "left",                                       
                                       width: "200px",                                       //minWidth: "48px",
                                       height: "2.0rem",
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
                                 // arial-label="Update"
                                 //onClick={()=>inputRef.current.focus()}
                                 
                                 onClick={()=>handleUpdate(item.ItemID)}
                              >
                                 <FaPaperPlane /> 
                              </button>
                           </form>

                              ) : (
                           <label 
                              style={ (item.checked ? {textDecoration:"line-through"}:null)  }
                              onDoubleClick={()=>handleCheck(item.ItemID)}
                           >
                              {item.Name}
                           </label>      
                              
                     )}
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