import React from "react";

import GetDate from "../components/GetDate";
import ConvocationForm from "../components/ConvocationForm";
import EventAddedSuccess from "../components/EventAddedSuccess";

export default function GenerateForm() {
  const [eventDate, addDate] = React.useState("");
  const [state, setState] = React.useState(1);
  const [convoDetails, setDetails] = React.useState("");
  const [branches, setBranches] = React.useState(0);
  switch (state) {
    case 1:
      return (
        <GetDate
          nextButtonEventHandler={() => setState(2)}
          eventDate={(eventData) => addDate(eventData)}
        />
      );
    case 2:
      return (
        <ConvocationForm
          nextButtonEventHandler={() => setState(3)}
          setDetails={(details) => setDetails(details)}
          setBranches={(details) => setBranches(details)}
        />
      );

    case 3:
      return <EventAddedSuccess convoDetails={convoDetails} />;
    default:
      throw new Error(`Unknnown page ID ${state}`);
  }
}
