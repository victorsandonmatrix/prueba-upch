"use client";

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, Row, Col, Form, Button } from "react-bootstrap";

import { fetchUsers } from "@/features/users/usersSlice";
import { AppDispatch } from "@/store/store";

const Filters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [gender, setGender] = useState("");
  const [nat, setNat] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    const params: Record<string, unknown> = { results: 10 };
    if (gender) params.gender = gender;
    if (nat) params.nat = nat;
    dispatch(fetchUsers(params));
  };

  return (
    <>
      <div className="d-flex justify-content-end align-items-center mt-3">
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => setShowFilters(!showFilters)}
        >
          <i className="bi bi-sliders"></i> Filtros
        </Button>
      </div>

      {showFilters && (
        <Card className="mt-4">
          <Card.Body>
            <Row className="gy-3">
              <Col lg={4}>
                <Form.Select
                  size="sm"
                  value={nat}
                  onChange={(e) => setNat(e.target.value)}
                >
                  <option value="">NACIONALIDAD</option>
                  <option value="US">US</option>
                  <option value="AU">AU</option>
                  <option value="BR">BR</option>
                  <option value="CH">CH</option>
                </Form.Select>
              </Col>
              <Col lg={4}>
                <Form.Select
                  size="sm"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">GÉNERO</option>
                  <option value="female">FEMALE</option>
                  <option value="male">MALE</option>
                </Form.Select>
              </Col>
              <Col lg={4}>
                <Button
                  variant="primary"
                  size="sm"
                  className="w-100"
                  onClick={handleSearch}
                >
                  <i className="bi bi-search me-2"></i> Buscar
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default Filters;
