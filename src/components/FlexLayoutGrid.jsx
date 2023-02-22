// import * as React from 'react';
// import { useDemoData } from '@mui/x-data-grid-generator';
// import { useState } from 'react';
// import { InputAdornment, TextField } from '@mui/material';
// import { Search } from '@mui/icons-material';
// import FlexLayoutGrid from './FlexLayoutGrid1';

// export default function MyFlexLayoutGrid() {
//   const { data } = useDemoData({
//     dataSet: 'Commodity',
//     rowLength: 5,
//     maxColumns: 6,
//   });

//   const [rows, setRows] = useState(data.rows);

//   const handleSearch = (event) => {
//     const searchValue = event.target.value.toLowerCase();
//     const filteredRows = data.rows.filter((row) =>
//       data.columns.some(
//         (column) =>
//           row[column.field].toString().toLowerCase().indexOf(searchValue) > -1
//       )
//     );
//     setRows(filteredRows);
//   };

//   const handleSort = (field, direction) => {
//     const sortedRows = rows.slice().sort((a, b) => {
//       const aValue = a[field];
//       const bValue = b[field];
//       if (aValue < bValue) {
//         return direction === 'asc' ? -1 : 1;
//       }
//       if (aValue > bValue) {
//         return direction === 'asc' ? 1 : -1;
//       }
//       return 0;
//     });
//     setRows(sortedRows);
//   };

//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <TextField
//         label="Search"
//         variant="outlined"
//         size="small"
//         InputProps={{
//           startAdornment: (
//             <InputAdornment position="start">
//               <Search />
//             </InputAdornment>
//           ),
//         }}
//         onChange={handleSearch}
//         style={{ marginBottom: '16px' }}
//       />
//       <FlexLayoutGrid rows={rows} columns={data.columns} />
//     </div>
//   )}
