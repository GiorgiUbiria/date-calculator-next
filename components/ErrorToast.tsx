import React, { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";

interface ErrorToastProps {
  errorText: string;
}

function ErrorToast({ errorText }: ErrorToastProps) {
  const { toast } = useToast();

  useEffect(() => {
    if (errorText) {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: errorText,
      });
    }
  }, [errorText, toast]);

  return null;
}

export default ErrorToast;
