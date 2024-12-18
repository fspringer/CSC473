const express = require("express");
const db = require("../db/config/db.config");

const router = express.Router();

//get data for component when the content load.
router.get("/ItemList/all", async (req, res) => {

  let conn;
  try {
      
  let query = `
    SELECT 
        Item.ItemID, 
        Item.Name, 
        Item.Qty 
    FROM Item 
    
 `;

    rows = await db.query(query);

    

    res.json(Array.isArray(rows) ? rows : [rows]);

    //console.log("jsonVal: ", Array.isArray(rows) ? rows : [rows] );

  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (conn) {
      conn.release();
    }
  }
});



//search data for component 
router.get("/ItemList/search", async (req, res) => {

  const queryStr = req.query;

  const {name} = queryStr;

  let rows;
  let query
  try {

    if(name!=""){
      query = "SELECT Item.ItemID, Item.Name, Item.Qty " +
                  "FROM Item "+ 
                  "WHERE Item.Name LIKE CONCAT(?, '%') "+ 
                  "ORDER BY Item.Name ASC";

                  rows = await db.query(query,[name], (err, data) => {
        if(err)
          return res.json(err);
      });

    } else{
      query = "SELECT Item.ItemID, Item.Name, Item.Qty " +
              "FROM Item " + 
              "ORDER BY Item.Name ASC";

      rows = await db.query(query, (err, data) => {
        if(err)
          return res.json(err);
      });
    }

    if (rows.affectedRows !== 0) {      
      res.json(Array.isArray(rows) ? rows : [rows]);
    }    
  }catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Internal server error" });
  }

});

//perform update on component
router.put("/ItemList", async (req, res) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.set("Expires", "0");
  res.set("Pragma", "no-cache");

  let conn;
  try {
        
    const {idVal, nameVal} = req.body;
    let query = "UPDATE Item SET `Name` = ? WHERE ItemID = ?";
    rows = await db.query(query,[nameVal, idVal]);

    res.status(200).json({
      success: true,
      message: `${nameVal} updated successfully`
    });

  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (conn) {
      conn.release();
    }
  }
});

router.post("/ItemList", async (req, res) => {
  
  let conn;
  try {

    
    const {name} = req.body;

    
    let query = "INSERT INTO `Item`( `Name`) VALUES (?)";

    let data;
    rows = await db.query(query,[name] , (err, data) => {
      if(err)
        return res.json(err);
    });

    if (rows.affectedRows !== 0) {
      
      
      query = "SELECT ItemID FROM Item WHERE ItemID ORDER BY ItemID DESC LIMIT 1";
      rows = await db.query(query);

      res.status(200).json({
        success: true,
        ItemID: rows[0].ItemID,
        message: `${name} inserted successfully`
      });
    }


  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (conn) {
      conn.release();
    }
  }
});

//delete data from component
router.delete("/ItemList/:id", async (req, res) => {

  try {

    const queryStr = req.query;

    const id = req.params.id;

    const query = `
      DELETE FROM Item
      WHERE ItemID = ? 
    `;
    
    rows = await db.query(query,[id]);

    res.status(200).json({
      success: true,
      message: `itemid ${id}, was deleted successfully`
    });

  } catch (error) {
    
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
