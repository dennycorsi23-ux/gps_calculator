import { useState, FormEvent } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { GraduationCap, Lock, Mail } from "lucide-react";

export default function Login() {
  const [, setLocation] = useLocation();
  const [location] = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Ottieni il redirect URL dai query params (es: ?redirect=/admin/corsi)
  const searchParams = new URLSearchParams(window.location.search);
  const redirectTo = searchParams.get("redirect") || "/admin/corsi";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Validazione base
      if (!email || !password) {
        setError("Inserisci email e password");
        setLoading(false);
        return;
      }

      // Chiama API di login
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include", // Importante per i cookie di sessione
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Credenziali non valide");
        setLoading(false);
        return;
      }

      // Verifica che l'utente sia admin
      if (data.user.role !== "admin") {
        setError("Accesso negato: solo gli amministratori possono accedere");
        setLoading(false);
        return;
      }

      // Login riuscito, redirect al pannello admin
      setLocation(redirectTo);

    } catch (err) {
      console.error("Errore login:", err);
      setError("Errore di connessione. Riprova più tardi.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo e Titolo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-4">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">MONDO SCUOLA</h1>
          <p className="text-gray-600">Pannello Amministrazione</p>
        </div>

        {/* Card Login */}
        <Card className="shadow-xl border-0">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Login Admin</CardTitle>
            <CardDescription className="text-center">
              Accedi con le tue credenziali di amministratore
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@infogps2026.it"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                    autoComplete="email"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                    autoComplete="current-password"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Errore */}
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Pulsante Login */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <span className="mr-2">Accesso in corso...</span>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  </>
                ) : (
                  "Accedi"
                )}
              </Button>
            </form>

            {/* Link Homepage */}
            <div className="mt-6 text-center">
              <a
                href="/"
                className="text-sm text-gray-600 hover:text-blue-600 transition-colors"
              >
                ← Torna alla Homepage
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Solo per amministratori autorizzati</p>
          <p className="mt-1">© 2026 MONDO SCUOLA - Tutti i diritti riservati</p>
        </div>
      </div>
    </div>
  );
}
