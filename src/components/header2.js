import React  from 'react';


const SomePageComponent = ({ location }) => {
    console.log(location);
    
    const { state = {} } = location
    const { modal } = state

    console.log(state);
    
    // return modal ? (
    //   <dialog className="modal">I'm a modal of Some Page Component!</dialog>
    // ) : (
    //   <div>Welcome to the Some Page Component!</div>
    // )
  }

  export default SomePageComponent