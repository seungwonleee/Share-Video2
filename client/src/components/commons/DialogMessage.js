import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
//Material UI dialog Imports
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const Text = styled.span`
  font-size: ${(props) => props.theme.fontSizes.base};
`;

const DialogMessage = () => {
  const dialog = useSelector((state) => state.dialog);

  const dialogState = dialog.dialogState;
  const message = dialog.message;

  return (
    <Dialog
      open={dialogState}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Text>안내</Text>
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Text>{message}</Text>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

export default DialogMessage;
