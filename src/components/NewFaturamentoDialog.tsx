import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { ChangeEvent, FormEvent, useState } from "react";
import { BasicTextField } from "./TextField";

interface NewFaturamentoDialogProps {
  open: boolean;
  onClose: () => void
}

export function NewFaturamentoDialog({ open, onClose }: NewFaturamentoDialogProps) {
  const [value, setValue] = useState<string>('0')

  function handleOnChangeValue(event: ChangeEvent<HTMLTextAreaElement>) {
    setValue(event.target.value)
  }


  return (
    <Dialog open={open}
      onClose={onClose}
    >
      <DialogTitle>Subscribe</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <BasicTextField
          value={value}
          type="value"
          onChange={handleOnChangeValue}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button type="submit">Subscribe</Button>
      </DialogActions>
    </Dialog>
  )
}