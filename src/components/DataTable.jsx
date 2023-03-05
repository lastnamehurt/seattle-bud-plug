import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { TableSortLabel } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '50%' // add this line to set the width to 100%
  },
  searchInput: {
    width: '50%' // add this line to set the width to 100%
  }
}));

const DataTable = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortColumn, setSortColumn] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const categories = ['All', 'Flower', 'Concentrate', 'Edible', 'Preroll', 'Vapor'];

  useEffect(() => {
    // fetch data from API and update state
    const fetchData = async () => {
      const response = await fetch('https://api.seattlebudplug.com/v1/products');
      const data = await response.json();
      setData(data);
    };
    fetchData();
  }, []);

  const columns = [
    { field: 'name', label: 'Name' },
    { field: 'brand', label: 'Brand' },
    { field: 'price', label: 'Price' },
    { field: 'amount_in_stock', label: 'Amount in Stock' },
    { field: 'thc_percentage', label: 'THC Percentage' },
    { field: 'cbd_percentage', label: 'CBD Percentage' },
    { field: 'weight', label: 'Weight' },
    { field: 'category', label: 'Category' },
    { field: 'type', label: 'Type' },
  ];

  const getCellValue = (product, field) => {
    const productData = Object.values(product)[0];
    if (field === 'price') {
      return `$${productData[field]}`;
    }
    return productData[field];
  };

  const handleSortClick = (column) => {
    if (column === sortColumn) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterCategoryChange = (event) => {
    setFilterCategory(event.target.value);
  };

  useEffect(() => {
    // sort data based on current sort column and order
    const sortData = (column, order) => {
      const sorted =
        order === 'asc'
          ? [...data].sort((a, b) =>
            getCellValue(a, column) > getCellValue(b, column) ? 1 : -1
          )
          : [...data].sort((a, b) =>
            getCellValue(a, column) < getCellValue(b, column) ? 1 : -1
          );
      setSortedData(sorted);
    };
    sortData(sortColumn, sortOrder);
  }, [sortColumn, sortOrder, data]);

  const filteredData =
    filterCategory === 'All'
      ? sortedData
      : sortedData.filter((item) =>
        Object.values(item)[0].category.includes(filterCategory));

  const searchedData = filteredData.filter((item) =>
    Object.values(item)[0].name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <TextField
        className={classes.searchInput}
        label='Search'
        value={searchTerm}
        onChange={handleSearchChange}
        variant='outlined'
        margin='dense'
      />
      <FormControl variant='outlined' className={classes.formControl}>
        <InputLabel id='category-filter-label'>Category</InputLabel>
        <Select
          labelId='category-filter-label'
          id='category-filter-select'
          value={filterCategory}
          onChange={handleFilterCategoryChange}
          label='Category'
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.field}>
                  <TableSortLabel
                    active={sortColumn === column.field}
                    direction={sortOrder}
                    onClick={() => handleSortClick(column.field)}
                  >
                    {column.label}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {searchedData.map((item) => (
              <TableRow key={Object.values(item)[0].id}>
                {columns.map((column) => (
                  <TableCell key={column.field}>
                    {getCellValue(item, column.field)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default DataTable;

