import Layout from "../../components/Layout/Layout";

import React, { useState, useEffect, memo } from "react";
import axios from "axios";
import { getGrooms } from "../../ServerRequests/groomRequest";
import { useGrooms } from "../../context/groomContext";
import GroomCard from "../../components/GroomCard/GroomCard";
import "./style.css";
import { GiSettingsKnobs } from "react-icons/gi";

import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  Button,
  Card,
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
import { getURLParams, setQueryParams } from "../../helpers/URLParams";
import ClearButton from "../../components/ClearButton/ClearButton";
import Animation from "../../components/Animation/Animation";
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
  const [photoLoading, setPhotoLoading] = useState(true);
  const urlParams = getURLParams();
  const [open, setOpen] = useState('');
  const toggleAccord = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };
  useGrooms();

  const cleareFilter = () => {
    setQueryParams({});
    setParams({});
    // setShowFilters(false);
  };

  const fetchGrooms = async () => {
    try {
      setLoading(false);

      const response = await getGrooms("groom/get-grooms", getURLParams());
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
  const Accord = () => setDropdownOpen((prevState) => !prevState);

  return (
    <Layout>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "30px",
          gap: "10px",
          flexDirection:"column",
          justifyContent: "flex-end",
        }}
      >
           <Animation/>
        <FormGroup className="search-bar mt-3 ">
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
        {/* <Dropdown isOpen={dropdownOpen} toggle={toggle}>
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
        </Dropdown> */}
      </div>

      <div className="__filter-accord">
      <Accordion flush open={open} toggle={toggleAccord}>
        <AccordionItem>
          <AccordionHeader targetId="1"><GiSettingsKnobs className="__filter-icon" /></AccordionHeader>
          <AccordionBody accordionId="1" className="p-0">
          <Filters/>

          <ClearButton cleareFilter={cleareFilter} textColor="#0d6efd" bColor="#0d6efd"/>

          {/* <Button onClick={()=>{toggleAccord();cleareFilter()}}>Clear Filters</Button> */}
          </AccordionBody>
        </AccordionItem>
        </Accordion>
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
      <div className="__home-page-filters-cards">
        <div className="_home-filters">
          <Filters/>
            <ClearButton cleareFilter={cleareFilter} textColor="#fff" bColor="#fff"/>
          <div className="pagination-home">
            <p>
              {" "}
              {grooms.length} of total {totalGrooms} on page{" "}
              {urlParams.page ?? page}{" "}
            </p>
            <PaginationCom />
          </div>
        </div>
        <Row style={{ width: "100%" }}>
          {grooms.length > 0
            ? grooms.map((data, index) => {
                return (
                  <Col sm={12} md={6} lg={4} key={index}>
                    <GroomCard
                      data={data}
                      setPhotoLoading={setPhotoLoading}
                      photoLoading={photoLoading}
                    />
                  </Col>
                );
              })
            : loading && !photoLoading && <p>No data found</p>}
           
        </Row>

      
      </div>
  
    </Layout>
  );
};

export default memo(HomePage);
