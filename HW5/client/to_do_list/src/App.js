
import './App.css';
import Header from './Header';
import SearchItem from './SearchItem';
import Content from './Content';
import Footer from './Footer';
import { useState } from "react";
//import {FaTrashAlt} from "react-icons/fa";

import React, { useState1, useEffect } from "react";



function App() {

  //const [items, setItems]=useState(JSON.parse(localStorage.getItem("itemlist")));
  const [items, setItems]=useState([]);
  const [search, setSearch]=useState("");
  const [updateItem, setUpdateItem]=useState("");
  const [footerMsg, setFooterMsg]=useState("");

  const My_URL = "http://localhost:3503/api/ItemList";


  // Fetch events from the API when the component mounts
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:3503/api/ItemList/all"); // API endpoint
        if (!response.ok) throw new Error("Failed to fetch events");

        const data = await response.json();
        setItems(data); // Update events with data from the database
        console.log(data);

      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        //setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  /*
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
  */

  const handleCheck=(id)=>{
    console.log("ID: ", id);
    const listItems=items.map((item)=>item.ItemID===id?{...item, checked: !item.checked} : item);
    setItems(listItems);
    localStorage.setItem("itemlist", JSON.stringify(listItems));
  }

  const handleDelete=async(id)=>{
    console.log("ID: ", id);

    const response = await fetch(
      `${My_URL}/${id}`,
      {
        method: "DELETE"        
      }
    );

    
    const Object = await response.json();

    if(Object.success){
      console.log("successful delete");
      //setItems(data); // Update events with data from the database
      console.log(Object);
      setFooterMsg(Object.message);

      const listItems=items.filter((item)=>item.ItemID!==id);
      setItems(listItems);

    }
  }

  
  const updateItemByID = async  (idVal, nameVal) => {
    try {

      const queryParams = new URLSearchParams({
        id: idVal,
        name: nameVal
      });
    
      console.log("queryParams: ", queryParams);

      const queryString = queryParams.toString();

      console.log("queryString", queryString);

      //const response = await fetch(`http://localhost:3503/api/ItemList/update?id=${id}&name=${name}`); // API endpoint
      //const response = await fetch(`http://localhost:3503/api/ItemList/update?${queryString}`); // API endpoint
      const response = await fetch("http://localhost:3503/api/ItemList/update/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idVal, nameVal }),
      });

      const Object = await response.json();
      if(Object.success){
        console.log("successful update");
        //setItems(data); // Update events with data from the database
        console.log(Object);
        setFooterMsg(Object.message);
      }

    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      //setIsLoading(false);
    }
  };

  const handleUpdate=(id)=>{
    console.log(updateItem)
    const listItems=items.map((item)=>item.ItemID===id?{...item, Name: updateItem} : item);
    setItems(listItems);
    updateItemByID(id, updateItem);
    localStorage.setItem("itemlist", JSON.stringify(listItems));
    setUpdateItem("");
  }

  return (
    <div className="App">

      <Header/>      
      <SearchItem
        search={search}
        setSearch={setSearch}
      />

      <Content
        //items={items.filter(item=>((items.item).toLocaleLowerCase()).includes(search.toLocaleLowerCase()))}
        items={items}
        handleCheck={handleCheck}
        handleDelete={handleDelete}    
        handleUpdate={handleUpdate}  
        updateItem={updateItem}
        setUpdateItem={setUpdateItem}
        
      />

      <Footer
      footerMsg={footerMsg}
      setFooterMsg={setFooterMsg}
      />

    </div>
  );
}

export default App;
