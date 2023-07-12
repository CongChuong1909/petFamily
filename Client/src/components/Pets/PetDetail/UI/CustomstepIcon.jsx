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
          backgroundColor: active ? '#df4300' : '#df4300',
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
