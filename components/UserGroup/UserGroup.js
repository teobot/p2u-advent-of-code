import React, { useContext } from "react";

import { ButtonGroup, Button } from "react-bootstrap";

import { AdventOfCodeDataContext } from "../../context/useAOC";

export default function UserGroup() {
  const { eventData, setSelectedUser, selectedUser } = useContext(
    AdventOfCodeDataContext
  );

  return (
    <ButtonGroup className="w-100 my-3">
      {eventData.members.map(({ user, stars }) => (
        <Button
          active={user === selectedUser}
          onClick={() => setSelectedUser(user)}
          className="border"
          key={user + "_userSelected"}
          variant="dark"
        >
          {user}
        </Button>
      ))}
    </ButtonGroup>
  );
}
