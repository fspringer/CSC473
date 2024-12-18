

const Header=(props)=>{
   const headerStyle={
      backgroundColor: "mediumblue",
      color: "#fff",
      fontSize: "13pix"
   }
   
   return (
      <header style={headerStyle}>
         <h1>{props.title}</h1>
      </header>
   );
};

Header.defaultProps={
   title:"CRUD Items"
}


export default Header;