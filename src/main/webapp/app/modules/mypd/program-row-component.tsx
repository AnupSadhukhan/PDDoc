import React from 'react';

const ProgramRow = props => {
  const { program, onClickActiveHandler } = props;

  const onClickActive = () => {
    onClickActiveHandler(program);
  };

  return (
    <div>
      <tr>
        <td>{program.name}</td>
        <td>{program.fillAmount}</td>
        <td>
          <a>Edit</a>

          <span> | </span>
          <a>Delete</a>

          {program.isActive && <span> | Activated</span>}
          {!program.isActive && (
            <span>
              {' '}
              | <a onClick={onClickActive}>Activate</a>
            </span>
          )}
        </td>
      </tr>
    </div>
  );
};

export default ProgramRow;
