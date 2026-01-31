import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  Users, 
  BookOpen, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Phone, 
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, Shield } from "lucide-react";

interface RichiestaInfo {
  id: number;
  corsoId: number;
  nome: string;
  email: string;
  telefono: string;
  messaggio: string | null;
  stato: "nuova" | "contattato" | "interessato" | "iscritto" | "non_interessato";
  note: string | null;
  createdAt: string;
}

interface Corso {
  id: number;
  titolo: string;
  categoria: string;
  descrizione: string;
  durata: string;
  costo: string;
  punteggioGps: string;
  attivo: number;
  ordine: number;
}

export default function AdminCorsi() {
  const { user, loading: authLoading, requireAdmin, logout } = useAuth();
  const [richieste, setRichieste] = useState<RichiestaInfo[]>([]);
  const [corsi, setCorsi] = useState<Corso[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRichiesta, setSelectedRichiesta] = useState<RichiestaInfo | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Verifica autenticazione admin
  useEffect(() => {
    if (!authLoading) {
      const isAuthorized = requireAdmin();
      if (isAuthorized) {
        loadData();
      }
    }
  }, [authLoading]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Carica richieste info
      const richiesteRes = await fetch("/api/admin/richieste-info");
      if (richiesteRes.ok) {
        const richiesteData = await richiesteRes.json();
        setRichieste(richiesteData);
      }

      // Carica corsi
      const corsiRes = await fetch("/api/corsi");
      if (corsiRes.ok) {
        const corsiData = await corsiRes.json();
        setCorsi(corsiData);
      }
    } catch (error) {
      console.error("Errore caricamento dati:", error);
      toast.error("Errore durante il caricamento dei dati");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStato = async (id: number, nuovoStato: string) => {
    try {
      const res = await fetch(`/api/admin/richieste-info/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stato: nuovoStato }),
      });

      if (res.ok) {
        toast.success("Stato aggiornato con successo");
        loadData();
      } else {
        toast.error("Errore durante l'aggiornamento");
      }
    } catch (error) {
      console.error("Errore aggiornamento stato:", error);
      toast.error("Errore durante l'aggiornamento");
    }
  };

  const handleViewDetails = (richiesta: RichiestaInfo) => {
    setSelectedRichiesta(richiesta);
    setIsDialogOpen(true);
  };

  const getStatoBadge = (stato: string) => {
    const variants: Record<string, { variant: "default" | "secondary" | "destructive" | "outline", icon: any }> = {
      nuova: { variant: "default", icon: Clock },
      contattato: { variant: "secondary", icon: Phone },
      interessato: { variant: "outline", icon: Eye },
      iscritto: { variant: "default", icon: CheckCircle },
      non_interessato: { variant: "destructive", icon: XCircle },
    };

    const config = variants[stato] || variants.nuova;
    const Icon = config.icon;

    return (
      <Badge variant={config.variant} className="flex items-center gap-1">
        <Icon className="w-3 h-3" />
        {stato.replace("_", " ")}
      </Badge>
    );
  };

  const getCorsoNome = (corsoId: number) => {
    const corso = corsi.find(c => c.id === corsoId);
    return corso?.titolo || `Corso #${corsoId}`;
  };

  // Statistiche
  const stats = {
    totaleRichieste: richieste.length,
    nuove: richieste.filter(r => r.stato === "nuova").length,
    iscritti: richieste.filter(r => r.stato === "iscritto").length,
    conversionRate: richieste.length > 0 
      ? ((richieste.filter(r => r.stato === "iscritto").length / richieste.length) * 100).toFixed(1)
      : "0",
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Caricamento...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header con Logout */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Pannello Admin Corsi
            </h1>
            <p className="text-gray-600">
              Gestisci corsi e richieste info
            </p>
          </div>
          
          {/* Info Utente e Logout */}
          <div className="flex items-center gap-4 bg-white rounded-lg shadow-md px-4 py-3">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="w-4 h-4 text-blue-600" />
              <div>
                <p className="font-medium text-gray-900">{user?.name || user?.email}</p>
                <p className="text-xs text-gray-500">Amministratore</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={logout}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Totale Richieste</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totaleRichieste}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Nuove</CardTitle>
              <Clock className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">{stats.nuove}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Iscritti</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">{stats.iscritti}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tasso Conversione</CardTitle>
              <BookOpen className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">{stats.conversionRate}%</div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="richieste" className="space-y-6">
          <TabsList>
            <TabsTrigger value="richieste">
              <Users className="w-4 h-4 mr-2" />
              Richieste Info
            </TabsTrigger>
            <TabsTrigger value="corsi">
              <BookOpen className="w-4 h-4 mr-2" />
              Gestione Corsi
            </TabsTrigger>
          </TabsList>

          {/* Richieste Info */}
          <TabsContent value="richieste">
            <Card>
              <CardHeader>
                <CardTitle>Richieste Info Ricevute</CardTitle>
                <CardDescription>
                  Gestisci le richieste di informazioni sui corsi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Data</TableHead>
                        <TableHead>Nome</TableHead>
                        <TableHead>Contatti</TableHead>
                        <TableHead>Corso</TableHead>
                        <TableHead>Stato</TableHead>
                        <TableHead>Azioni</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {richieste.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                            Nessuna richiesta ricevuta
                          </TableCell>
                        </TableRow>
                      ) : (
                        richieste.map((richiesta) => (
                          <TableRow key={richiesta.id}>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                {new Date(richiesta.createdAt).toLocaleDateString("it-IT")}
                              </div>
                            </TableCell>
                            <TableCell className="font-medium">{richiesta.nome}</TableCell>
                            <TableCell>
                              <div className="space-y-1 text-sm">
                                <div className="flex items-center gap-1">
                                  <Mail className="w-3 h-3 text-gray-400" />
                                  {richiesta.email}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Phone className="w-3 h-3 text-gray-400" />
                                  {richiesta.telefono}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>{getCorsoNome(richiesta.corsoId)}</TableCell>
                            <TableCell>
                              <Select
                                value={richiesta.stato}
                                onValueChange={(value) => handleUpdateStato(richiesta.id, value)}
                              >
                                <SelectTrigger className="w-[180px]">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="nuova">Nuova</SelectItem>
                                  <SelectItem value="contattato">Contattato</SelectItem>
                                  <SelectItem value="interessato">Interessato</SelectItem>
                                  <SelectItem value="iscritto">Iscritto</SelectItem>
                                  <SelectItem value="non_interessato">Non Interessato</SelectItem>
                                </SelectContent>
                              </Select>
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleViewDetails(richiesta)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Gestione Corsi */}
          <TabsContent value="corsi">
            <Card>
              <CardHeader>
                <CardTitle>Gestione Corsi</CardTitle>
                <CardDescription>
                  Visualizza e gestisci i corsi disponibili
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {corsi.map((corso) => (
                    <div
                      key={corso.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{corso.titolo}</h3>
                          <p className="text-sm text-gray-600 mt-1">{corso.categoria}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <span className="text-gray-500">Durata: {corso.durata}</span>
                            <span className="text-gray-500">Punti GPS: {corso.punteggioGps}</span>
                            <Badge variant={corso.attivo ? "default" : "secondary"}>
                              {corso.attivo ? "Attivo" : "Disattivato"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Dialog Dettagli Richiesta */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Dettagli Richiesta Info</DialogTitle>
              <DialogDescription>
                Informazioni complete sulla richiesta
              </DialogDescription>
            </DialogHeader>
            {selectedRichiesta && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Nome</Label>
                    <p className="font-medium">{selectedRichiesta.nome}</p>
                  </div>
                  <div>
                    <Label>Stato</Label>
                    <div className="mt-1">{getStatoBadge(selectedRichiesta.stato)}</div>
                  </div>
                  <div>
                    <Label>Email</Label>
                    <p className="font-medium">{selectedRichiesta.email}</p>
                  </div>
                  <div>
                    <Label>Telefono</Label>
                    <p className="font-medium">{selectedRichiesta.telefono}</p>
                  </div>
                  <div>
                    <Label>Corso</Label>
                    <p className="font-medium">{getCorsoNome(selectedRichiesta.corsoId)}</p>
                  </div>
                  <div>
                    <Label>Data Richiesta</Label>
                    <p className="font-medium">
                      {new Date(selectedRichiesta.createdAt).toLocaleString("it-IT")}
                    </p>
                  </div>
                </div>
                {selectedRichiesta.messaggio && (
                  <div>
                    <Label>Messaggio</Label>
                    <p className="mt-1 p-3 bg-gray-50 rounded-lg text-sm">
                      {selectedRichiesta.messaggio}
                    </p>
                  </div>
                )}
                {selectedRichiesta.note && (
                  <div>
                    <Label>Note Interne</Label>
                    <p className="mt-1 p-3 bg-yellow-50 rounded-lg text-sm">
                      {selectedRichiesta.note}
                    </p>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Chiudi
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
