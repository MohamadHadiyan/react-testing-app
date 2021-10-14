import { Button, Container, SwipeableDrawer } from "@material-ui/core";
import React, { useState } from "react";

function RightDrawer() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h2>Drawer Component</h2>
      <Button
        variant="contained"
        color="primary"
        onClick={() => setIsOpen(true)}
      >
        Open Drawer
      </Button>

      <SwipeableDrawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
        anchor="right"
      >
        <Container>This is a Drawer</Container>
      </SwipeableDrawer>
    </div>
  );
}

export default RightDrawer;
