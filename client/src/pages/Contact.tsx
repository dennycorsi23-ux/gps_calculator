import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle2, Mail, Phone, User, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export function Contact() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefono: "",
    messaggio: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sendEmailMutation = trpc.contact.send.useMutation({
    onSuccess: () => {
      setIsSubmitted(true);
      toast.success("Messaggio inviato con successo!");
      setFormData({ nome: "", email: "", telefono: "", messaggio: "" });
    },
    onError: (error) => {
      toast.error(error.message || "Errore nell'invio del messaggio. Riprova.");
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await sendEmailMutation.mutateAsync(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-12 md:py-16">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-white/10 backdrop-blur-sm p-5 rounded-2xl">
                <Mail className="w-12 h-12 md:w-16 md:h-16" />
              </div>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Contattaci
            </h1>
            
            <p className="text-lg md:text-xl text-white/90">
              Hai domande o dubbi? Siamo qui per aiutarti nel tuo percorso verso l'insegnamento
            </p>
          </div>
        </div>
      </div>

      <main className="container py-12">
        <div className="max-w-3xl mx-auto">
          {isSubmitted ? (
            /* Success Message */
            <div className="bg-white rounded-2xl shadow-lg p-10 text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-green-100 p-6 rounded-full">
                  <CheckCircle2 className="w-16 h-16 text-green-600" />
                </div>
              </div>
              
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Messaggio Inviato!
              </h2>
              
              <p className="text-lg text-gray-700 mb-8">
                Grazie per averci contattato. Risponderemo al più presto alla tua richiesta.
              </p>
              
              <Button
                onClick={() => setIsSubmitted(false)}
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                Invia un altro messaggio
              </Button>
            </div>
          ) : (
            /* Contact Form */
            <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10">
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  Inviaci un Messaggio
                </h2>
                <p className="text-gray-600">
                  Compila il form qui sotto e ti risponderemo il prima possibile
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nome */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <User className="w-4 h-4 inline mr-2" />
                    Nome e Cognome *
                  </label>
                  <Input
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    required
                    placeholder="Mario Rossi"
                    className="w-full text-gray-900"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email *
                  </label>
                  <Input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="mario.rossi@email.com"
                    className="w-full text-gray-900"
                  />
                </div>

                {/* Telefono */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="w-4 h-4 inline mr-2" />
                    Telefono (opzionale)
                  </label>
                  <Input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    placeholder="333 1234567"
                    className="w-full text-gray-900"
                  />
                </div>

                {/* Messaggio */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Messaggio *
                  </label>
                  <Textarea
                    name="messaggio"
                    value={formData.messaggio}
                    onChange={handleChange}
                    required
                    placeholder="Scrivi qui la tua domanda o richiesta..."
                    rows={6}
                    className="w-full text-gray-900"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-lg font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                      Invio in corso...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Invia Messaggio
                    </>
                  )}
                </Button>

                <p className="text-sm text-gray-500 text-center">
                  * Campi obbligatori
                </p>
              </form>
            </div>
          )}

          {/* Info Box */}
          <div className="mt-8 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl shadow-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              📧 Tempi di Risposta
            </h3>
            <p className="text-white/90 leading-relaxed">
              Il nostro team risponde generalmente entro <strong>24-48 ore</strong> nei giorni lavorativi. 
              Per domande urgenti, ti preghiamo di indicarlo nel messaggio.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
