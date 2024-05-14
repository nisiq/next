import React from "react";
import {
  Accordion,
  AccordionBody,
} from "@material-tailwind/react";
 
export function DefaultAccordion() {
  const [open, setOpen] = React.useState(true);
 
  return (
    <div className="">
      <Accordion open={open} >
        <AccordionBody className="w-full">
          <h2 className="font-semibold text-black">SSO</h2>
          <p>
            We're not always in the position that we want to be at. We're constantly
            growing. We're constantly making mistakes. We're constantly trying to express
            ourselves and actualize our dreams.
          </p>
        </AccordionBody>
      </Accordion>
      <hr />
      <Accordion open={open}>
        <AccordionBody>
          <h2 className="font-semibold text-black">Apresentation</h2>
          <p>
            We're not always in the position that we want to be at. We're constantly
            growing. We're constantly making mistakes. We're constantly trying to express
            ourselves and actualize our dreams.
          </p>
        </AccordionBody>
      </Accordion>
      <hr />
      <Accordion open={open}>
        <AccordionBody>
          <h2 className="font-semibold text-black">Components React</h2>
          <p>
            We're not always in the position that we want to be at. We're constantly
            growing. We're constantly making mistakes. We're constantly trying to express
            ourselves and actualize our dreams.
          </p>
        </AccordionBody>
      </Accordion>
    </div>
  );
}