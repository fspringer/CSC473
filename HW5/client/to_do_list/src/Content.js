import { useState } from "react";
import {FaTrashAlt} from "react-icons/fa";

const Content=()=>{

   //maintain states. 
   const [items, setItems]=useState([
      {
         id: 1,
         checked: false,
         item: "Item1 to buy"
      },
      {
         id: 2,
         checked: false,
         item: "Item2 to buy"
      },
      {
         id: 3,
         checked: false,
         item: "Item3 to buy"
      }

   ]);

   const handleCheck=(id)=>{
      console.log(`key: ${id}`)
      const listItems=items.map((item)=>item.id===id?{...item, checked: !item.checked} : item);
      setItems(listItems);
      localStorage.setItem("shoppinglist", JSON.stringify(listItems));
   }

   const handleDelete=(id)=>{
      console.log(id);
      const listItems=items.filter((item)=>item.id!==id);
      setItems(listItems);
   }

   return(
      <main>
         {
            <ul>
               {items.map((item)=>(
                  <li className="item" key={item.id}>
                     <input 
                        type="checkbox"
                        onChange={()=>handleCheck(item.id)}
                        checked={item.checked}
                     />
                     <label style={(item.checked) ? {textDecoration:"line-through"} :null }
                        onDoubleClick={()=>handleCheck(item.id)}>
                        {item.item}
                     </label>
                     <FaTrashAlt
                        onClick={()=>handleDelete(item.id)}
                        role="button"
                        tabIndex=""
                     />
                  </li>
               ))}
            </ul>
         }


      </main>
   );
};

export default Content;