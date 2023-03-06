import React, { useState, useEffect } from 'react';
import ProductInfoPopup from './ProductInfo'
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
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";

library.add(faExternalLinkAlt);

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '50%'
  },
  searchInput: {
    width: '50%'
  },
  linkIcon: {
    marginLeft: "10px",
    color: "#ccc",
    border: "1px solid #ccc",
    borderRadius: "5px",
    padding: "5px",
    cursor: "pointer",
  },
}));

const tdStyles = {
  padding: "12px 16px",
  textAlign: "left",
  borderBottom: "1px solid #ddd",
};

const thStyles = {
  padding: "12px 16px",
  textAlign: "left",
  backgroundColor: "#f2f2f2",
  color: "#444",
  fontWeight: "bold",
  cursor: "pointer",
};

const DataTable = () => {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [sortedData, setSortedData] = useState([]);
  const [sortColumn, setSortColumn] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('All');
  const categories = ['All', 'Flower', 'Concentrate', 'Edible', 'Preroll', 'Vapor'];
  const [selectedProduct, setSelectedProduct] = useState(null);


  const handleRowClick = (product) => {
    setSelectedProduct(product);
  };

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
    {
      field: "name",
      label: "Product Name",
      render: (product) => (
        <TableCell onClick={() => handleCellClick(product)}>
          <a href={product.url} target="_blank" rel="noopener noreferrer">
            {product.name}
            <FontAwesomeIcon icon={faExternalLinkAlt} className={classes.linkIcon} />
          </a>
        </TableCell>
      ),
    },
    { field: 'brand', label: 'Brand', width: "10%" },
    {
      field: "price",
      label: "Price",
      width: "10%",
      render: (product) => <TableCell onClick={() => handleCellClick(product)}>${product.price}</TableCell>,
    },
    { field: 'weight', label: 'Weight', width: "10%" },
    { field: 'category', label: 'Category', width: "10%" },
    { field: 'type', label: 'Type', width: "10%" },
    { field: 'thc_percentage', label: 'THC Percentage', width: "10%" },
    { field: 'cbd_percentage', label: 'CBD Percentage', width: "10%" },
    { field: 'amount_in_stock', label: 'Amount in Stock', width: "10%" },
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

  const handleCellClick = (product) => {
    setSelectedProduct({ product });
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
          {/* table header */}
          <TableHead>
            {/* table header row */}
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.field} style={{ width: column.width }}>
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
          {/* table body */}
          <TableBody>
            {/* table rows */}
            {searchedData.map((item) => (
              <TableRow key={Object.values(item)[0].id}>
                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    style={{ width: column.width }}
                    onClick={() => setSelectedProduct(item)}
                  >
                    {getCellValue(item, column.field)}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {selectedProduct && (
          <ProductInfoPopup
            product={Object.values(selectedProduct)[0]}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </TableContainer>
    </>
  );
}
// export default DataTable;
const DataTableContainer = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* <Filter data={data} onFilterChange={setFilteredData} /> */}
      <DataTable />
    </div>
  );
};

export default DataTableContainer;

