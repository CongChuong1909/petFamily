import React from 'react';

function CustomWarningStepIcon(props) {
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
      </div>
    );
}

export default CustomWarningStepIcon;