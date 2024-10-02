"use client";

import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Table, Button, Image, Modal, Alert, FormCheck } from "react-bootstrap";

import { AppDispatch } from "@/store/store";

import { User } from "@/features/users/usersSlice";
import { deleteUser } from "@/features/users/usersSlice";
import EditModal from "@/components/EditModal/EditModal";

interface UsersTableProps {
  users: User[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    selectedUsers.forEach((uuid) => dispatch(deleteUser(uuid)));
    setSelectedUsers(new Set());
    setShowDeleteModal(false);
  };

  const toggleUserSelection = (uuid: string) => {
    const newSet = new Set(selectedUsers);
    if (newSet.has(uuid)) {
      newSet.delete(uuid);
    } else {
      newSet.add(uuid);
    }
    setSelectedUsers(newSet);
  };

  return (
    <>
      <div className="d-flex justify-content-start align-items-center mt-4">
        <Button
          variant="outline-primary"
          size="sm"
          className="me-2"
          onClick={() => {
            const uuid = Array.from(selectedUsers)[0];
            const user = users.find((user) => user.login.uuid === uuid);
            if (user) setSelectedUser(user);
          }}
          disabled={selectedUsers.size !== 1}
        >
          <i className="bi bi-pencil"></i> Editar
        </Button>
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => setShowDeleteModal(true)}
          disabled={selectedUsers.size === 0}
        >
          <i className="bi bi-trash3"></i> Eliminar
        </Button>
      </div>

      {users.length === 0 ? (
        <Alert variant="info" className="mt-4">
          No hay usuarios para mostrar.
        </Alert>
      ) : (
        <Table hover responsive className="mt-3">
          <thead>
            <tr>
              <th>
                <FormCheck
                  checked={selectedUsers.size === users.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedUsers(new Set(users.map((u) => u.login.uuid)));
                    } else {
                      setSelectedUsers(new Set());
                    }
                  }}
                />
              </th>
              <th></th>
              <th>Nombre</th>
              <th>Género</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Correo electrónico</th>
              <th>País</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.login.uuid}>
                <td>
                  <FormCheck
                    checked={selectedUsers.has(user.login.uuid)}
                    onChange={() => toggleUserSelection(user.login.uuid)}
                  />
                </td>
                <td>
                  <Image
                    src={user.picture.thumbnail}
                    roundedCircle
                    alt="Avatar"
                    width={36}
                    height={36}
                  />
                </td>
                <td>{`${user.name.first} ${user.name.last}`}</td>
                <td>{user.gender}</td>
                <td>{`${user.location.street.name} ${user.location.street.number}`}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.location.country.toUpperCase()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal de Edición */}
      {selectedUser && (
        <EditModal user={selectedUser} onClose={() => setSelectedUser(null)} />
      )}

      {/* Modal de Confirmación de Eliminación */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Eliminar Usuario(s)</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            ¿Estás seguro de que deseas eliminar el(los) usuario(s)
            seleccionado(s)?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UsersTable;
