import React from 'react';
import Select from 'react-select';

function UserSelect(props) {
  const { users = [], onChange} = props;

  return (
    <div>
      <Select
        isMulti
        options={users}
        onChange={onChange}
        placeholder='参加者を選択'
      />
    </div>
  );
}

export default UserSelect;
