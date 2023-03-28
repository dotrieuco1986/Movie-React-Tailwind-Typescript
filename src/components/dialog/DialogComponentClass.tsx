import React from "react"
import DialogModal from ".";

class DialogComponentClass extends React.Component<{ref: React.Ref<DialogComponentClass>}> {  
  render() {
    return (
      <DialogModal />
    );
  }
      
}
export default DialogComponentClass;
