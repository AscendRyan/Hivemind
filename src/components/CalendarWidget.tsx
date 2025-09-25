import { useEffect, useMemo, useState } from "react";
import { format, addMinutes, setHours, setMinutes, isBefore, isToday } from "date-fns";
import { Calendar as CalendarIcon, Clock, Mail, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar"; // shadcn/ui day-picker wrapper

type Props = {
  recipientEmail?: string;        // where the request email goes
  durationMinutes?: number;       // meeting length
  startHour?: number;             // business start (local time)
  endHour?: number;               // business end (local time)
  title?: string;                 // event title
  location?: string;              // optional location
};

export default function CalendarWidget({
  recipientEmail = "hello@hivemindai.co.uk",
  durationMinutes = 30,
  startHour = 9,
  endHour = 18,
  title = "Consultation with HiveMind",
  location = "Online",
}: Props) {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const [date, setDate] = useState<Date | undefined>(new Date());
  const [slot, setSlot] = useState<Date | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // generate 30-min slots for the selected day
  const slots = useMemo(() => {
    if (!date) return [];
    const d = new Date(date);
    d.setHours(startHour, 0, 0, 0);
    const end = new Date(date);
    end.setHours(endHour, 0, 0, 0);

    const out: Date[] = [];
    let cur = new Date(d);
    while (cur <= end) {
      // if today: hide past times
      if (!(isToday(date) && isBefore(cur, new Date()))) out.push(new Date(cur));
      cur = addMinutes(cur, 30);
    }
    return out;
  }, [date, startHour, endHour]);

  useEffect(() => {
    // auto-select first available slot when date changes
    setSlot((prev) => (prev && date && prev.toDateString() === date.toDateString() ? prev : slots[0] ?? null));
  }, [date, slots]);

  const disabled = !date || !slot || !name || !email;

  // helpers
  const toUTC = (d: Date) => new Date(d.getTime() - d.getTimezoneOffset() * 60000);
  const formatICSDate = (d: Date) => {
    const iso = toUTC(d).toISOString().replace(/[-:]/g, "");
    return iso.slice(0, 15) + "Z"; // YYYYMMDDTHHMMSSZ
  };

  const start = slot ?? undefined;
  const end = start ? addMinutes(start, durationMinutes) : undefined;

  const subject = start
    ? `${title} – ${format(start, "EEE, d MMM yyyy HH:mm")} (${tz})`
    : `${title} – Request`;
  const body = [
    `Name: ${name}`,
    `Email: ${email}`,
    start ? `Requested time: ${format(start, "EEE, d MMM yyyy HH:mm")} (${tz})` : "",
    `Duration: ${durationMinutes} min`,
    location ? `Location: ${location}` : "",
    "",
    "Add any notes or goals for the call here:",
  ]
    .filter(Boolean)
    .join("\n");

  const mailtoHref = `mailto:${encodeURIComponent(recipientEmail)}?subject=${encodeURIComponent(
    subject
  )}&body=${encodeURIComponent(body)}`;

  const downloadICS = () => {
    if (!start || !end) return;
    const uid = `${Date.now()}@hivemindai.co.uk`;
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//HiveMind//Consultation//EN",
      "CALSCALE:GREGORIAN",
      "METHOD:PUBLISH",
      "BEGIN:VEVENT",
      `UID:${uid}`,
      `DTSTAMP:${formatICSDate(new Date())}`,
      `DTSTART:${formatICSDate(start)}`,
      `DTEND:${formatICSDate(end)}`,
      `SUMMARY:${escapeICS(title)}`,
      location ? `LOCATION:${escapeICS(location)}` : "",
      `DESCRIPTION:${escapeICS(body)}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ]
      .filter(Boolean)
      .join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "hivemind-consultation.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="space-y-6">
      {/* date picker */}
      <div className="space-y-2">
        <Label className="text-sm">Choose a date</Label>
        <div className="rounded-lg border p-2">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            // prevent selecting past dates
            disabled={(d) => d < new Date(new Date().setHours(0, 0, 0, 0))}
          />
        </div>
      </div>

      {/* time slots */}
      <div className="space-y-2">
        <Label className="text-sm flex items-center gap-2">
          <Clock className="h-4 w-4" /> Available times ({tz})
        </Label>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
          {slots.length === 0 && <div className="text-muted-foreground text-sm">No times available today.</div>}
          {slots.map((t) => {
            const active = slot && t.getTime() === slot.getTime();
            return (
              <Button
                key={t.toISOString()}
                type="button"
                variant={active ? "default" : "outline"}
                onClick={() => setSlot(t)}
                className={active ? "button-3d" : ""}
              >
                {format(t, "HH:mm")}
              </Button>
            );
          })}
        </div>
      </div>

      {/* details */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Your name</Label>
          <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Jane Doe" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Your email</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" />
        </div>
      </div>

      {/* summary */}
      <div className="rounded-lg border p-4 text-sm text-muted-foreground">
        <div>
          <strong>Selected:</strong>{" "}
          {start ? `${format(start, "EEE, d MMM yyyy")} at ${format(start, "HH:mm")} (${tz})` : "—"}
        </div>
        <div>
          <strong>Duration:</strong> {durationMinutes} min
        </div>
        {location && (
          <div>
            <strong>Location:</strong> {location}
          </div>
        )}
      </div>

      {/* actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button asChild disabled={disabled} className="glass-button">
          <a href={mailtoHref}>
            <Mail className="h-4 w-4 mr-2" />
            Send request email
          </a>
        </Button>
        <Button type="button" variant="outline" onClick={downloadICS} disabled={!start} className="glass-button-outline">
          <Download className="h-4 w-4 mr-2" />
          Add to my calendar (.ics)
        </Button>
      </div>
    </div>
  );
}

// escape commas/semicolons for ICS
function escapeICS(s: string) {
  return s.replace(/([,;])/g, "\\$1").replace(/\n/g, "\\n");
}
