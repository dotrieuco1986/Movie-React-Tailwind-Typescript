import React from 'react';

interface Props {
  type?: string;
  btnListViewClick: (event: React.MouseEvent<HTMLElement>) => void;
  btnGridViewClick: (event: React.MouseEvent<HTMLElement>) => void;
}

const ListGridToggle: React.FC<Props> = ({
  type,
  btnListViewClick, 
  btnGridViewClick
  }) => { 
    let bgListClassName = 'text-primary';
    let bgGridClassName = 'text-primary';
    switch (type) {
      case 'list':
        bgListClassName = 'text-primary';
        bgGridClassName = 'text-white';
        break;
      case 'grid':
        bgListClassName = 'text-white';
        bgGridClassName = 'text-primary';
        break;
      default:
        break;
    }
  return (
    <div className="buttons">
      <div className = {`list ${bgListClassName}`} onClick={btnListViewClick}>ListView</div>
      <div className = {`grid ${bgGridClassName}`}  onClick={btnGridViewClick}>GridView</div>
    </div>
  );
}
export default ListGridToggle;
