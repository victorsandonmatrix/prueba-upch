"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Spinner, Alert } from "react-bootstrap";

import UsersTable from "@/components/UsersTable/UsersTable";
import Filters from "@/components/Filters/Filters";

import { fetchUsers } from "../features/users/usersSlice";
import { RootState, AppDispatch } from "../store/store";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers({ results: 10 }));
  }, [dispatch]);

  return (
    <Container className="pt-5">
      <h3>Listado de usuarios</h3>
      <Filters />
      {loading && (
        <div className="text-center mt-4">
          <Spinner animation="border" />
        </div>
      )}
      {error && (
        <Alert variant="danger" className="mt-4">
          Error: {error}
        </Alert>
      )}
      {!loading && !error && <UsersTable users={users} />}
    </Container>
  );
}
