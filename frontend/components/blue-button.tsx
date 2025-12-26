import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Props {
  text: string;
  href: string;
  isArrow?: boolean;
}

const BlueButton = ({ text, href, isArrow }: Props) => {
  return (
    <Link href={href}>
      <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold">
        {text}
        {isArrow && <ArrowRight className="ml-2 w-5 h-5" />}
      </Button>
    </Link>
  );
};

export default BlueButton;
