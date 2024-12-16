import { useState } from "react";


const Content=()=>{

   //maintain states. 
   const [name, setName]=useState("item2");


   //link the onclick event
   const handleNameChange=(myEvent)=>{
      //console.log(myEvent.target.innerText);
      const myItems=["item1","item2","item3"];
      const val=Math.floor(Math.random()*3);
      setName(myItems[val]);

   }

   return(
      <main>
         <button onClick={(e)=>{handleNameChange(e)}}>btn clicked </button>
         <p>{name}</p>
      </main>
   );
};

export default Content;