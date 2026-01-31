import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { classiConcorsoData } from "@/data/classiConcorsoData";

export default function TestCombobox() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-2xl font-bold mb-8">Test Combobox</h1>
      
      <div className="max-w-md">
        <p className="mb-4 text-sm text-gray-600">
          Stato open: {open ? "APERTO" : "CHIUSO"}
        </p>
        <p className="mb-4 text-sm text-gray-600">
          Valore selezionato: {value || "Nessuno"}
        </p>
        
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {value
                ? classiConcorsoData.find((c) => c.codeId === value)?.code
                : "Seleziona classe..."}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[400px] p-0">
            <Command>
              <CommandInput placeholder="Cerca classe..." />
              <CommandList>
                <CommandEmpty>Nessuna classe trovata.</CommandEmpty>
                <CommandGroup>
                  {classiConcorsoData.slice(0, 20).map((classe) => (
                    <CommandItem
                      key={classe.codeId}
                      value={classe.codeId}
                      onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === classe.codeId ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {classe.codeId} - {classe.code}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
