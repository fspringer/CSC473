import React, { useState } from 'react';
import TransExpenses from './TransExpenses.json'; 


const Heatmap = () => {
  const [tooltipData, setTooltipData] = useState(null);
    
  const handleMouseOut = () => {
    setTooltipData(null);
  };

  const handleMouseOver = (event, data) => {
    setTooltipData(data);    
  };

  const mapColor = (TransAmt) => {
    console.log("TransAmt: ", TransAmt);
    if (TransAmt<100) {
      console.log("<=100");
      return '#e9f4f7'
    }
    else if (TransAmt>=100 && TransAmt<600) {
      console.log("100-600");
      return '#a2e1f2';
    }
    else if (TransAmt>=600 && TransAmt<1000) {
      console.log("600-1000");
      return '#50d0f2';
    }
    else if(TransAmt>=1000 && TransAmt<2000) {
      console.log("1000-2000");
      return '#0cc4f5';
    }
    else //(TransAmt>=2000 ) 
    {
      console.log(">2000");
      return '#067796';
    }    
  };

  return (
    <div>
      <h1>Transactions Heatmap Calander</h1>
      <div style={{  flexWrap: "wrap",
                display: "flex",                
                marginTop: "120px",
                justifyContent: "space-around"                
            }}
      >
        {TransExpenses.map((card, index) => {
          console.log("entry: ", card);          
          return (
            <div
              key={index}              
              style={{ 
                textAlign:'center',
                fontSize:'16px',         
                cursor: 'pointer',
                width: '100px',
                height: '100px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',                
                border: '2px solid #ddd',                                
                margin: '5px',                       
                backgroundColor: mapColor(card['Total Expense']),
                color: card['Total Expense'] <= 1000 ? 'black' : 'white'
               }}
              onMouseOver={(e) => handleMouseOver(e, card)}
              onMouseOut={handleMouseOut}
            >
              <span>{`${card.Month}`}</span>
            </div>
          );
        })}
      </div>

      {tooltipData && (
        <div>
          <div className="tooltip-content"
            style={{
              color: "#fff",
              backgroundColor: "#4a4848",                  
              padding: "50px",                  
            }}
          >
            <h4>{tooltipData.Month}</h4>
            <p>Total Expense: ${tooltipData['Total Expense']}</p>
            <p>Transactions: {tooltipData['Transactions']}</p>
            <p>Transation Type: {tooltipData['TransType']}</p>            
          </div>
        </div>
      )}
    </div>
  );
};

export default Heatmap;
