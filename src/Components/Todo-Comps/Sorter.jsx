import React, { useState } from "react";

const Sorter = ({handleSort}) => {


  const [activeSortState ,setActiveSortState] = useState(false);
  const onSort = (e) =>
  {
    handleSort(e.target.value)
    setActiveSortState(!activeSortState)
  }


  return (
    <>
      <button
        onClick={() => {
          setActiveSortState(!activeSortState);
        }}
        className="text-sm font-bold shadow-customPositive absolute top-0 lg:ms-16  block bg-white px-2"
      >
        Sort-By
      </button>

      <div className={`sorter text-sm absolute top-0 lg:ms-36 ms-20 z-20 gap-2 shadow-customPositive p-1 bg-white font-bold ${activeSortState ? 'flex flex-col' : 'hidden'}`}>
        <button onClick={onSort} value='Priority' className="hover:bg-blue-500 px-3 hover:text-white">
          Priority
        </button>
        <button value="Date" onClick={onSort} className="hover:bg-blue-500 px-3 hover:text-white">
          Date
        </button>
      </div>
    </>
  );
};

export default Sorter;
