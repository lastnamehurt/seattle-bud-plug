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
import Filter from "./Filter";

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
    fetch("https://api.seattlebudplug.com/v1/products/cached", {
      mode: "cors",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        const formattedData = Object.entries(data).reduce(
          (acc, [key, value]) => {
            const formattedValue = value.reduce((innerAcc, item) => {
              // Your inner reduce function logic here
              return innerAcc;
            }, []);
            acc[key] = formattedValue;
            return acc;
          },
          {}
        );
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
      keys: ["name", "brand", "category", "type"],
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
    const valueA =
      typeof a[sortColumn] === "number"
        ? a[sortColumn]
        : typeof a[sortColumn] === "string"
        ? Number(a[sortColumn].replace(/[^0-9.-]+/g, ""))
        : a[sortColumn];
    const valueB =
      typeof b[sortColumn] === "number"
        ? b[sortColumn]
        : typeof b[sortColumn] === "string"
        ? Number(b[sortColumn].replace(/[^0-9.-]+/g, ""))
        : b[sortColumn];

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
      {/* <Filter data={data} onFilterChange={setFilteredData} /> */}

      <div style={{ marginBottom: "16px" }}>
        <TextField
          type='text'
          id='searchInput'
          placeholder='Search by strain, category, type...'
          onChange={handleFilterChange}
          style={{ width: "100%", fontSize: "1.2rem", textAlign: "center" }}
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
const DataTableContainer = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {/* <Filter data={data} onFilterChange={setFilteredData} /> */}
      <DataTable />
    </div>
  );
};

export default DataTableContainer;
// export default DataTable;
