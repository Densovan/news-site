import React from 'react';
import { HiOutlineShare } from 'react-icons/hi';
import { MdRedo, MdShare } from 'react-icons/md';

const Share = () => {
  return (
    <div className="boxSave">
      <li className="icon-save">
        <MdShare
          size={24}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: ' translate(-50%,-50%)',
          }}
        />
      </li>
      <li
        style={{
          paddingTop: '4px',
          width: '48px',
        }}
      >
        <span>10</span>
      </li>
    </div>
  );
};

export default Share;
