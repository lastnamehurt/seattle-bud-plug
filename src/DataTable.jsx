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

const DataTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortedData, setSortedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [displayedData, setDisplayedData] = useState([]);

  useEffect(() => {
    let newData = sortedData;
    if (filteredData.length > 0) {
      newData = sortedData.filter((product) => filteredData.includes(product));
    }
    setDisplayedData(newData);
  }, [sortedData, filteredData]);

  const tableStyles = {
    border: "1px solid #ddd",
    borderRadius: "4px",
    width: "100%",
    marginBottom: "16px",
    borderCollapse: "collapse",
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

  const tdStyles = {
    padding: "12px 16px",
    textAlign: "left",
    borderBottom: "1px solid #ddd",
  };

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }
  };

  const handleSearch = (event) => {
    const searchTerm = event.target.value;
    if (searchTerm === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((product) => {
        const productName = Object.keys(product)[0];
        const productDetails = product[productName];
        return Object.values(productDetails)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setFilteredData(filtered);
    }
  };

  const sortedAndFilteredData =
    filteredData.length > 0
      ? sortedData.filter((product) => filteredData.includes(product))
      : sortedData;

  useEffect(() => {
    if (data.length > 0) {
      setSortedData(data);
    }
  }, [data]);

  useEffect(() => {
    fetch("https://your-seattle-plug.herokuapp.com/api/deals", { mode: "cors" })
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (sortColumn !== null) {
      sortedAndFilteredData.sort((a, b) => {
        const productA = a[Object.keys(a)];
        const productB = b[Object.keys(b)];
        const valueA = productA[sortColumn];
        const valueB = productB[sortColumn];
        if (valueA < valueB) {
          return sortOrder === "asc" ? -1 : 1;
        } else if (valueA > valueB) {
          return sortOrder === "asc" ? 1 : -1;
        }
        return 0;
      });
      setSortedData(sortedAndFilteredData);
    } else {
      setSortedData(data);
    }
  }, [sortColumn, sortOrder, sortedAndFilteredData, data]);

  return (
    <div>
      <div style={{ marginBottom: "16px" }}>
        <TableSortLabel htmlFor='searchInput'></TableSortLabel>
        <TextField
          type='text'
          id='searchInput'
          placeholder='Enter search term'
          onChange={handleSearch}
        />
      </div>
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <CircularProgress />
        </div>
      ) : (
        <TableContainer component={Paper} style={{ marginBottom: "16px" }}>
          <Table style={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell
                  style={thStyles}
                  onClick={() => handleSort("productName")}
                >
                  Strain
                </TableCell>
                <TableCell style={thStyles} onClick={() => handleSort("brand")}>
                  Brand
                </TableCell>
                <TableCell style={thStyles} onClick={() => handleSort("price")}>
                  Price
                </TableCell>
                <TableCell
                  style={thStyles}
                  onClick={() => handleSort("amount_in_stock")}
                >
                  Amount in Stock
                </TableCell>
                <TableCell
                  style={thStyles}
                  onClick={() => handleSort("thc_percentage")}
                >
                  THC Percentage
                </TableCell>
                <TableCell
                  style={thStyles}
                  onClick={() => handleSort("cbd_percentage")}
                >
                  CBD Percentage
                </TableCell>
                <TableCell
                  style={thStyles}
                  onClick={() => handleSort("weight")}
                >
                  Weight
                </TableCell>
                <TableCell
                  style={thStyles}
                  onClick={() => handleSort("category")}
                >
                  Category
                </TableCell>
                <TableCell style={thStyles} onClick={() => handleSort("type")}>
                  Type
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortedAndFilteredData.map((product) => {
                const productName = Object.keys(product)[0];
                const productDetails = product[productName];
                return (
                  <TableRow key={uuidv4()}>
                    <TableCell style={tdStyles}>
                      {productName}
                      <a
                        href={productDetails.url}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <FontAwesomeIcon
                          icon={faExternalLinkAlt}
                          style={thStyles.icon}
                        />
                      </a>
                    </TableCell>

                    <TableCell style={tdStyles}>
                      {productDetails.brand}
                    </TableCell>
                    <TableCell style={tdStyles}>
                      {productDetails.price}
                    </TableCell>
                    <TableCell style={tdStyles}>
                      {productDetails.amount_in_stock}
                    </TableCell>
                    <TableCell style={tdStyles}>
                      {productDetails.thc_percentage}
                    </TableCell>
                    <TableCell style={tdStyles}>
                      {productDetails.cbd_percentage}
                    </TableCell>
                    <TableCell style={tdStyles}>
                      {productDetails.weight}
                    </TableCell>
                    <TableCell style={tdStyles}>
                      {productDetails.category}
                    </TableCell>
                    <TableCell style={tdStyles}>
                      {productDetails.type}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};
export default DataTable;
