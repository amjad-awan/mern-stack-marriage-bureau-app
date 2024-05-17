import Layout from "../../components/Layout/Layout";

import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import { getGrooms } from "../../ServerRequests/groomRequest";
import { useGrooms } from "../../context/groomContext";
import GroomCard from "../../components/GroomCard/GroomCard";
import "./style.css"
import {
  Button,
  Col,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  FormGroup,
  Input,
  Row,
  Spinner,
} from "reactstrap";
import PaginationCom from "../../components/Pagination/Pagination";
import Filters from "../../components/Filters/Filters";
const HomePage = () => {
  const {
    grooms,
    setGrooms,
    setTotalGrooms,
    totalGrooms,
    params,
    loading,
    page,
    setLoading,
    setParams,
  } = useGrooms();
  const [showFilters, setShowFilters] = useState(false);

 useGrooms()

  const cleareFilter = () => {
    setParams({
      page: 1,
      limit: 10,
      cast: "",
      search: "",
      height: "",
      qualification: "",
      martialStatus: "",
      sect: "",
      city: "",
      gender: "",
      nationality: "",
    });
    setShowFilters(false);
  };
  const fetchGrooms = async () => {
    try {
      setLoading(false);

      const response = await getGrooms("groom/get-grooms", params);
      setGrooms(response.data.data);
      setTotalGrooms(response.data.totalGrooms);
      setLoading(true);
    } catch (error) {
      console.error("Error fetching grooms:", error);
      setLoading(true);
    }
  };
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    fetchGrooms();
  }, [params]); // Refetch grooms when params change
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "30px",
          gap: "10px",
          justifyContent: "flex-end",
        }}
      >
        <FormGroup className="search-bar mt-3">
          <Input
            id="exampleName"
            name="name"
            placeholder="search with name, city, sect, mobile number, cast"
            type="text"
            className="search-on-desktop"
            onChange={(e) =>
              setParams((prev) => ({ ...prev, search: e.target.value }))
            }
          />
        </FormGroup>
        {/* <Button color="primary" className="mt-3 mb-3" style={{ height: "38px" }} onClick={() => setShowFilters(!showFilters)}>
       
          showFilters ? "Hide " : "Show "
        
        Filters 
        </Button> */}
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret color="primary">
            Filters
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem onClick={() => setShowFilters(!showFilters)}>
              {" "}
              {showFilters ? "Hide " : "Show "} Filters
            </DropdownItem>
            <DropdownItem onClick={cleareFilter}>Clear Filters</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </div>
      {showFilters && <Filters />}
      <div className="pagination-home">
        <p> {grooms.length} of total {totalGrooms} on page {page} </p>
        <PaginationCom />
      </div>
      {!loading && (
        <div
          style={{
            display: "flex",
            padding: "30px 0px",
            justifyContent: "center",
          }}
        >
          <Spinner color="primary mx-auto" size="sm"></Spinner>
        </div>
      )}
      <Row>
        {grooms.length > 0
          ? grooms.map((data, index) => {
              return (
                <Col sm={12} md={6} lg={3} key={index}>
                  <GroomCard  data={data} />
                </Col>
              );
            })
          : loading && <p>No data found</p>}
      </Row>
    </Layout>
  );
};

export default memo(HomePage);
