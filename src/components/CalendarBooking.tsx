// src/components/CalendarBooking.tsx
import { useState } from "react";
import { format } from "date-fns";
import { Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

export const CalendarBooking = () => {
  const { toast } = useToast();
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const timeSlots = [
    "09:00","09:30","10:00","10:30","11:00","11:30",
    "12:00","12:30","13:00","13:30","14:00","14:30",
    "15:00","15:30","16:00","16:30","17:00"
  ];

  const handleSubmit = async () => {
    if (!date || !time || !name || !email || !company) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const payload = {
        type: "consultation_booking",
        name,
        email,
        company,
        date: format(date, "yyyy-MM-dd"),
        time,
        datetime: `${format(date, "yyyy-MM-dd")} ${time}`,
        timestamp: new Date().toISOString(),
      };

      const res = await fetch("https://4flajfhr.rpcld.cc/webhook/bb41e4cd-802c-48f1-90af-5ccbe6a1b4a6", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to book");

      toast({ title: "Success!", description: "Your consultation has been scheduled. We’ll email you shortly." });
      // reset
      setDate(undefined); setTime(undefined); setName(""); setEmail(""); setCompany("");
      setOpen(false);
    } catch {
      toast({ title: "Error", description: "There was an error booking your appointment. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* >>> CTA START — Delete this whole block to remove the button */}
      <DialogTrigger asChild>
        <Button className="glass-button">
          Schedule a consultation
        </Button>
      </DialogTrigger>
      {/* >>> CTA END */}

      <DialogContent
        className="sm:max-w-md"
        onOpenAutoFocus={(e) => e.preventDefault()}           // stop scroll jump
        onPointerDownOutside={(e) => e.preventDefault()}      // don’t close on stray clicks
        onInteractOutside={(e) => e.preventDefault()}         // don’t close on overlay
      >
        <div className="max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Schedule Your Free Consultation</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            {/* Contact Info */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="name">Full Name *</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" className="mt-1" autoComplete="name" />
              </div>
              <div>
                <Label htmlFor="email">Email *</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" className="mt-1" autoComplete="email" />
              </div>
              <div>
                <Label htmlFor="company">Company *</Label>
                <Input id="company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Your company" className="mt-1" autoComplete="organization" />
              </div>
            </div>

            {/* Date */}
            <div>
              <Label>Select Date *</Label>
              <div className="mt-1">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  disabled={(d) => d < new Date(new Date().setHours(0,0,0,0)) || d.getDay() === 0 || d.getDay() === 6}
                  className={cn("rounded-md border pointer-events-auto")}
                />
              </div>
            </div>

            {/* Time */}
            {date && (
              <div>
                <Label className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  Select Time *
                </Label>
                <Select value={time} onValueChange={setTime}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choose a time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Summary */}
            {date && time && (
              <div className="bg-muted/10 p-3 rounded-lg border">
                <p className="text-sm font-medium">Selected Appointment:</p>
                <p className="text-sm text-muted-foreground">
                  {format(date, "EEEE, MMMM do, yyyy")} at {time}
                </p>
              </div>
            )}

            <Button
              onClick={handleSubmit}
              disabled={loading || !date || !time || !name || !email || !company}
              className="w-full"
            >
              {loading ? "Booking..." : "Book Consultation"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
