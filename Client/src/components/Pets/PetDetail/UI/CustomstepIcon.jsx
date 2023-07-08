 import React from "react";
 const CustomStepIcon = (props) => {
    const { active, completed } = props;
  
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: active ? '#fd2e21' : '#3fae00',
        }}
      >
        {/* {completed ? (
          <FiberManualRecordIcon style={{ color: '#3fae00' }} />
        ) : (
          <span style={{ visibility: 'hidden' }}>•</span>
        )} */}
      </div>
    );
  };
  export default CustomStepIcon;