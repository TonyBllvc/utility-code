import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  useDialogDisclosure,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";

export const useHandleDialogLayout = () => {
  const { isOpen, onClose, onOpen, setIsOpen } = useDialogDisclosure()

  const DialogButton = ({
    children,
    position,
    cancelVariant = "ghost",
    cancelScheme = "red",
    preventReplica = false,
  }) => {
    // children: every other button asides cancel
    // position: positioning of all the buttons at the bottom of the dialog
    // preventReplica: to prevent duplication of the cancel button due to declaration of the Dialog Button(not to be use outside of HandleDialog component)

    const direction =
      position === "right"
        ? "end"
        : position === "left"
        ? "start"
        : position === "center" || position === "middle"
        ? "center"
        : "end";

    // const buttonPositions =
    //   arrangement === "reverse" || arrangement === "inverse"
    //     ? "flex-row-reverse"
    //     : "flex-row";

    return (
      <div className={`flex justify-${direction} gap-2`}>
        {children}
        {preventReplica !== true && (
          <Button
            variant={cancelVariant}
            scheme={cancelScheme}
            onClick={onClose}
          >
            Cancel
          </Button>
        )}
      </div>
    );
  };

  const DialogComponent = ({ title = null, description = null, zIndex = 999 , children, handleClosable = null, bgCloseable = true }) => {
    // title:  title of the dialog
    // description: more details into the dialog
    // children: a component containing whatever is to be displayed

    return (
      <Dialog zIndex={zIndex} open={isOpen} bgCloseable={bgCloseable} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[525px]" onClose={handleClosable || onClose}>
          <DialogHeader>
            <DialogTitle>{title || "No Title"}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <div className="gap-3 py-4">{children}</div>
          <div className="w-full">
            <DialogButton preventReplica={true} />
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return {
    handleShowDialog: onOpen, // function: to open dialog
    handleCloseDialog: onClose, // function: to close dialog
    DialogButton, // handle bottom buttons
    DialogComponent, // handle components content2 of the dialog
  };
};
