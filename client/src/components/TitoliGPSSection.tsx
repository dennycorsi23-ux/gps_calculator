import { useState } from "react";
import { TitoloGPS } from "@/data/titoliGPS";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { HelpCircle } from "lucide-react";

interface TitoliGPSSectionProps {
  titoli: TitoloGPS[];
  values: Record<string, any>;
  onChange: (id: string, value: any) => void;
  title: string;
  description?: string;
}

export function TitoliGPSSection({ titoli, values, onChange, title, description }: TitoliGPSSectionProps) {
  return (
    <Card className="p-6 glass-panel">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        {description && <p className="text-white/70 text-sm">{description}</p>}
      </div>

      <div className="space-y-4">
        {titoli.map((titolo) => (
          <div key={titolo.id} className="space-y-2">
            <div className="flex items-start gap-3">
              {titolo.tipo === "checkbox" && (
                <>
                  <Checkbox
                    id={titolo.id}
                    checked={values[titolo.id] || false}
                    onCheckedChange={(checked) => onChange(titolo.id, checked)}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <Label htmlFor={titolo.id} className="text-white font-medium cursor-pointer flex items-center gap-2">
                      <span>
                        <span className="text-blue-300">{titolo.codice}</span> - {titolo.descrizione}
                        <span className="ml-2 text-green-300">({titolo.punti} punti)</span>
                      </span>
                      {titolo.note && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <HelpCircle className="w-4 h-4 text-white/50 hover:text-white transition-colors cursor-help" />
                          </TooltipTrigger>
                          <TooltipContent className="max-w-xs">
                            <p className="text-sm">{titolo.note}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </Label>
                  </div>
                </>
              )}

              {titolo.tipo === "number" && (
                <div className="flex-1">
                  <Label htmlFor={titolo.id} className="text-white font-medium flex items-center gap-2">
                    <span>
                      <span className="text-blue-300">{titolo.codice}</span> - {titolo.descrizione}
                      <span className="ml-2 text-green-300">({titolo.punti} punti{titolo.max ? ` - max ${titolo.max}` : ""})</span>
                    </span>
                    {titolo.note && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="w-4 h-4 text-white/50 hover:text-white transition-colors cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">{titolo.note}</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </Label>
                  <Input
                    id={titolo.id}
                    type="number"
                    min="0"
                    max={titolo.max || 99}
                    value={values[titolo.id] || 0}
                    onChange={(e) => onChange(titolo.id, parseInt(e.target.value) || 0)}
                    className="glass-input max-w-xs"
                    placeholder="Numero titoli"
                  />
                </div>
              )}

              {titolo.tipo === "select" && titolo.opzioni && (
                <div className="flex-1">
                  <Label htmlFor={titolo.id} className="text-white font-medium flex items-center gap-2">
                    <span>
                      <span className="text-blue-300">{titolo.codice}</span> - {titolo.descrizione}
                    </span>
                    {titolo.note && (
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <HelpCircle className="w-4 h-4 text-white/50 hover:text-white transition-colors cursor-help" />
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p className="text-sm">{titolo.note}</p>
                        </TooltipContent>
                      </Tooltip>
                    )}
                  </Label>
                  <Select
                    value={values[titolo.id] || ""}
                    onValueChange={(value) => onChange(titolo.id, value)}
                  >
                    <SelectTrigger className="glass-input max-w-xs">
                      <SelectValue placeholder="Seleziona..." />
                    </SelectTrigger>
                    <SelectContent>
                      {titolo.opzioni.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          {opt.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
