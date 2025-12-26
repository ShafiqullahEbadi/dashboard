import { ArrowRight, ExternalLink } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

const DemoGradientButton = () => {
  return (
    <Button
      size="sm"
      variant="secondary"
      className="bg-gradient-to-r from-cyan-500 to-amber-300 hover:bg-accent/90 text-lg px-8 py-3"
    >
      <ExternalLink className="h-4 w-4 mr-2" />
      Live Demo
    </Button>
  );
};

export default DemoGradientButton;
