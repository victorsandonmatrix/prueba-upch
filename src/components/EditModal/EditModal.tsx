"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button, Form } from "react-bootstrap";

import { User, editUser } from "@/features/users/usersSlice";
import { AppDispatch } from "@/store/store";

interface EditModalProps {
  user: User;
  onClose: () => void;
}

const EditModal: React.FC<EditModalProps> = ({ user, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [editedUser, setEditedUser] = useState<User>({ ...user });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(editUser(editedUser));
    onClose();
  };

  return (
    <Modal show onHide={onClose} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              value={`${editedUser.name.first} ${editedUser.name.last}`}
              onChange={(e) => {
                const [first, ...rest] = e.target.value.split(" ");
                setEditedUser({
                  ...editedUser,
                  name: {
                    ...editedUser.name,
                    first: first,
                    last: rest.join(" ") || editedUser.name.last,
                  },
                });
              }}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Género</Form.Label>
            <Form.Select
              value={editedUser.gender}
              onChange={(e) =>
                setEditedUser({ ...editedUser, gender: e.target.value })
              }
              required
            >
              <option value="female">Female</option>
              <option value="male">Male</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              type="text"
              value={`${editedUser.location.street.name} ${editedUser.location.street.number}`}
              onChange={(e) => {
                const [streetName, ...numberParts] = e.target.value.split(" ");
                const streetNumber = parseInt(numberParts.join(" "), 10) || 0;
                setEditedUser({
                  ...editedUser,
                  location: {
                    ...editedUser.location,
                    street: {
                      ...editedUser.location.street,
                      name: streetName,
                      number: streetNumber,
                    },
                  },
                });
              }}
              required
            />
          </Form.Group>

          {/* Teléfono */}
          <Form.Group className="mb-3">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              type="text"
              value={editedUser.phone}
              onChange={(e) =>
                setEditedUser({ ...editedUser, phone: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              value={editedUser.email}
              onChange={(e) =>
                setEditedUser({ ...editedUser, email: e.target.value })
              }
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>País</Form.Label>
            <Form.Control
              type="text"
              value={editedUser.location.country}
              onChange={(e) =>
                setEditedUser({
                  ...editedUser,
                  location: {
                    ...editedUser.location,
                    country: e.target.value,
                  },
                })
              }
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit">
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditModal;
