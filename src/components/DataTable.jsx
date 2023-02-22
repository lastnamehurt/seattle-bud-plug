import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from "uuid";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableSortLabel,
  TableRow,
  Paper,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import Fuse from "fuse.js";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState([]);

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
    icon: {
      marginLeft: "10px",
      color: "#ccc",
    },
  };

  useEffect(() => {
    fetch("https://your-seattle-plug.herokuapp.com/api/deals/cached", {
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const formattedData = data.reduce((acc, item) => {
          const key = Object.keys(item)[0];
          acc[key] = item[key];
          return acc;
        }, {});
        setData(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const options = {
      keys: ["name"],
      includeScore: true,
      threshold: 0.3,
    };
    const fuse = new Fuse(Object.values(data), options);
    const filtered =
      searchTerm === ""
        ? Object.values(data)
        : fuse.search(searchTerm).map((result) => result.item);
    setFilteredData(filtered);
    setFilteredData(filtered);
  }, [data, searchTerm]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleFilterChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
  };

  const sortedData = filteredData.sort((a, b) => {
    const productA = a;
    const productB = b;
    const valueA = productA[sortColumn];
    const valueB = productB[sortColumn];
    if (valueA < valueB) {
      return sortOrder === "asc" ? -1 : 1;
    } else if (valueA > valueB) {
      return sortOrder === "asc" ? 1 : -1;
    }
    return 0;
  });

  const columns = [
    {
      field: "name",
      label: "Strain",
      render: (product) => (
        <TableCell style={tdStyles}>
          {product.name}
          <a href={product.url} target='_blank' rel='noopener noreferrer'>
            <FontAwesomeIcon icon={faExternalLinkAlt} style={thStyles.icon} />
          </a>
        </TableCell>
      ),
    },
    { field: "brand", label: "Brand" },
    {
      field: "price",
      label: "Price",
      render: (product) => <TableCell>${product.price}</TableCell>,
    },
    { field: "amount_in_stock", label: "Amount in Stock" },
    { field: "thc_percentage", label: "THC Percentage" },
    { field: "cbd_percentage", label: "CBD Percentage" },
    { field: "weight", label: "Weight" },
    { field: "category", label: "Category" },
    { field: "type", label: "Type" },
  ];

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <TextField
          type='text'
          id='searchInput'
          placeholder='Enter search term'
          onChange={handleFilterChange}
        />
      </div>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper} style={{ marginBottom: "16px" }}>
          <Table>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.field}
                    sortDirection={
                      sortColumn === column.field ? sortOrder : false
                    }
                  >
                    <TableSortLabel
                      active={sortColumn === column.field}
                      direction={sortOrder}
                      onClick={() => handleSort(column.field)}
                    >
                      {column.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedData.map((product) => (
                <TableRow key={uuidv4()}>
                  {columns.map((column) => (
                    <React.Fragment key={column.field}>
                      {column.field === "name" ? (
                        column.render(product)
                      ) : column.field === "price" ? (
                        column.render(product)
                      ) : (
                        <TableCell key={column.field}>
                          {product[column.field]}
                        </TableCell>
                      )}
                    </React.Fragment>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default DataTable;
