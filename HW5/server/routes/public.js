const express = require("express");
const db = require("../db/config/db.config");

const router = express.Router();

/*
router.get("/events/search", async (req, res) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.set("Expires", "0");
  res.set("Pragma", "no-cache");

  console.log("11111111111111111");

  let conn;
  try {
    const { title, date, organizer } = req.query;
    let query = `
      SELECT
        Event.EventID,
        Event.EventName,
        GuestList.GuestListOwner,
        Schedule.EventDate
      FROM Event
      JOIN GuestList ON Event.GuestListID = GuestList.GuestListID
      JOIN Schedule ON Event.ScheduleID = Schedule.ScheduleID
      WHERE 1=1
    `;
    const params = [];

    if (title) {
      query += " AND LOWER(Event.EventName) LIKE LOWER(?)";
      params.push(`%${title}%`);
    }

    if (date) {
      query += " AND DATE(Schedule.EventDate) = ?";
      params.push(date);
    }

    if (organizer) {
      query += " AND LOWER(GuestList.GuestListOwner) LIKE LOWER(?)";
      params.push(`%${organizer}%`);
    }

    query += " ORDER BY Schedule.EventDate DESC";

    rows = await db.query(query, params);
    res.json(Array.isArray(rows) ? rows : [rows]);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (conn) {
      conn.release();
    }
  }
});
*/

/*
router.get("/events/all", async (req, res) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.set("Expires", "0");
  res.set("Pragma", "no-cache");

  console.log("22222222222222222");

  let conn;
  try {
    let query = `
      SELECT
        Event.EventID,
        Event.EventName,
        GuestList.GuestListOwner,
        Schedule.EventDate
      FROM Event
      JOIN GuestList ON Event.GuestListID = GuestList.GuestListID
      JOIN Schedule ON Event.ScheduleID = Schedule.ScheduleID
      ORDER BY Schedule.EventDate DESC
    `;

    rows = await db.query(query);
    res.json(Array.isArray(rows) ? rows : [rows]);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (conn) {
      conn.release();
    }
  }
});
*/

//get data for component whenthe content load.
router.get("/ItemList/all", async (req, res) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.set("Expires", "0");
  res.set("Pragma", "no-cache");

  console.log("22222222222222222");


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
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ error: "Internal server error" });
  } finally {
    if (conn) {
      conn.release();
    }
  }
});


router.post("/ItemList/update", async (req, res) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.set("Expires", "0");
  res.set("Pragma", "no-cache");

  console.log("33333333333333333333333");

  //http://localhost:3503/api/ItemList/update?id=${id}&name=${name}
  let conn;
  try {

    const queryStr = req.query;
    
    console.log("");
    console.log("query string: ", queryStr);
    
    //const {id, name} = queryStr;
    
    console.log("req.body: ", req.body);
    const {idVal, nameVal} = req.body;

    console.log("idVal: ", idVal);
    console.log("nameVal: ", nameVal);

    let query = "UPDATE Item SET `Name` = ? WHERE ItemID = ?";

    console.log(query)

    /*
    const [result] = await db
    .promise()
    .query(query, [req.params.eventId, req.userId]);
    */

    rows = await db.query(query,[nameVal, idVal]);

    console.log("");
    console.log("Rows affected", rows);
    console.log("");

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



router.delete("/ItemList/:id", async (req, res) => {
  res.set("Cache-Control", "no-store, no-cache, must-revalidate, private");
  res.set("Expires", "0");
  res.set("Pragma", "no-cache");

  console.log("33333333333333333333333");

  //http://localhost:3503/api/ItemList/update?id=${id}&name=${name}
  let conn;
  try {

    const queryStr = req.query;
    
    console.log("req: ", req);

    console.log("");
    console.log("query string: ", queryStr);
    
    //const {id, name} = queryStr;
    
    //console.log("req.body: ", req.body);



    const id = req.params.id;

    console.log("id: ", id);


    // Delete the reservation
    const query = `
      DELETE FROM Item
      WHERE ItemID = ? 
    `;
    
    console.log(query)

    //return;


    rows = await db.query(query,[id]);

    console.log("");
    console.log("Rows affected", rows);
    console.log("");

    res.status(200).json({
      success: true,
      message: `itemid ${id}, was deleted successfully`
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


module.exports = router;
