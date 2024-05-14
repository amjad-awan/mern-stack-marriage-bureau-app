import Layout from "../../components/Layout/Layout";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { getGrooms } from "../../ServerRequests/groomRequest";
import { useGrooms } from "../../context/groomContext";
import GroomCard from "../../components/GroomCard/GroomCard";
import { Button, Col, FormGroup, Input, Row } from "reactstrap";
import PaginationCom from "../../components/Pagination/Pagination";
import Filters from "../../components/Filters/Filters";
const HomePage = () => {

  const { grooms, loading, setParams } = useGrooms()
  const [showFilters, setShowFilters] = useState(false)

  return (
    <Layout>

      <div style={{ display: "flex", alignItems: "center", marginBottom: "30px", gap: "10px", justifyContent: "flex-end" }}>
        <FormGroup className="search-bar mt-3">
          <Input
            id="exampleName"
            name="name"
            placeholder="search with name, city, sect, mobile number, cast"
            type="text"
            className="search-on-desktop"
            onChange={(e) => setParams((prev) => ({ ...prev, search: e.target.value }))}

          />

        </FormGroup>
        <Button color="primary" className="mt-3 mb-3" style={{ height: "38px" }} onClick={() => setShowFilters(!showFilters)}>
          {
            showFilters ? "Hide " : "Show "
          }
          Filters
        </Button>

      </div>

      {
        showFilters && <Filters />
      }

      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <PaginationCom />
      </div>
      <Row >
        {
          loading && <p style={{ fontWeight: "600", fontSize: "22px" }} >Loading...</p>
        }
        {
          grooms.length > 0 ? grooms.map((data, index) => {
            return <Col sm={12} md={6} lg={3} > <GroomCard key={index} data={data} /></Col>
          }) : <p>No data found</p>

        }

      </Row>

    </Layout>
  )
};

export default HomePage;
