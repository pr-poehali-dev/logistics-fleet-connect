import { useState } from "react";
import Icon from "@/components/ui/icon";

// ─── Types ───────────────────────────────────────────────
type Section = "orders" | "map" | "fleets" | "drivers" | "chats" | "analytics" | "profile" | "documents";

// ─── Mock Data ────────────────────────────────────────────
const ORDERS = [
  { id: "ORD-4821", from: "Москва", to: "Санкт-Петербург", cargo: "Электроника", weight: "3.2 т", status: "active", driver: "Иванов А.В.", progress: 62, date: "17 апр", doc: "НК-4821" },
  { id: "ORD-4820", from: "Казань", to: "Нижний Новгород", cargo: "Стройматериалы", weight: "12 т", status: "active", driver: "Петров С.М.", progress: 28, date: "17 апр", doc: "НК-4820" },
  { id: "ORD-4819", from: "Екатеринбург", to: "Челябинск", cargo: "Продукты питания", weight: "5.8 т", status: "transit", driver: "Смирнов Д.К.", progress: 91, date: "16 апр", doc: "НК-4819" },
  { id: "ORD-4818", from: "Ростов-на-Дону", to: "Краснодар", cargo: "Авто запчасти", weight: "2.1 т", status: "done", driver: "Козлов Р.В.", progress: 100, date: "15 апр", doc: "НК-4818" },
  { id: "ORD-4817", from: "Новосибирск", to: "Омск", cargo: "Промоборудование", weight: "18.4 т", status: "done", driver: "Морозов А.С.", progress: 100, date: "14 апр", doc: "НК-4817" },
  { id: "ORD-4816", from: "Пермь", to: "Уфа", cargo: "Химия", weight: "7.2 т", status: "cancelled", driver: "Волков И.Н.", progress: 0, date: "14 апр", doc: "НК-4816" },
];

const DRIVERS = [
  { id: "DRV-01", name: "Иванов Александр Витальевич", rating: 4.9, trips: 312, status: "busy", vehicle: "КАМАЗ-5490", license: "А123ВС77", joined: "Янв 2022" },
  { id: "DRV-02", name: "Петров Сергей Михайлович", rating: 4.7, trips: 198, status: "busy", vehicle: "MAN TGX", license: "В456ЕК99", joined: "Мар 2022" },
  { id: "DRV-03", name: "Смирнов Дмитрий Константинович", rating: 4.8, trips: 445, status: "transit", vehicle: "Volvo FH", license: "С789НО178", joined: "Июн 2021" },
  { id: "DRV-04", name: "Козлов Роман Витальевич", rating: 4.6, trips: 267, status: "free", vehicle: "Mercedes Actros", license: "Д321РТ50", joined: "Апр 2022" },
  { id: "DRV-05", name: "Морозов Андрей Сергеевич", rating: 5.0, trips: 521, status: "free", vehicle: "Scania R450", license: "Е654УФ61", joined: "Авг 2020" },
];

const FLEETS = [
  { id: "FLT-01", name: "АвтоТранс Групп", city: "Москва", trucks: 24, available: 8, rating: 4.8, since: "2019" },
  { id: "FLT-02", name: "СибирьЛогист", city: "Новосибирск", trucks: 16, available: 4, rating: 4.6, since: "2020" },
  { id: "FLT-03", name: "УралТранс", city: "Екатеринбург", trucks: 31, available: 12, rating: 4.9, since: "2018" },
  { id: "FLT-04", name: "ЮгТрейд", city: "Краснодар", trucks: 9, available: 3, rating: 4.5, since: "2021" },
];

const CHATS = [
  { id: 1, order: "ORD-4821", participant: "Иванов А.В.", role: "Водитель", last: "Прибуду через 40 минут", time: "14:22", unread: 2 },
  { id: 2, order: "ORD-4820", participant: "ООО «СтройМастер»", role: "Отправитель", last: "Документы готовы к передаче", time: "13:55", unread: 0 },
  { id: 3, order: "ORD-4819", participant: "Смирнов Д.К.", role: "Водитель", last: "Загрузка завершена, выезжаю", time: "12:10", unread: 1 },
  { id: 4, order: "ORD-4818", participant: "ИП Кравцов", role: "Получатель", last: "Отлично, ждём", time: "Вчера", unread: 0 },
];

const DOCUMENTS = [
  { id: "DOC-4821", order: "ORD-4821", type: "Накладная", name: "НК-4821.pdf", date: "17 апр 2026", size: "124 KB", status: "signed" },
  { id: "DOC-4821B", order: "ORD-4821", type: "Квитанция", name: "КВ-4821.pdf", date: "17 апр 2026", size: "48 KB", status: "pending" },
  { id: "DOC-4820", order: "ORD-4820", type: "Накладная", name: "НК-4820.pdf", date: "17 апр 2026", size: "118 KB", status: "signed" },
  { id: "DOC-4819", order: "ORD-4819", type: "Накладная", name: "НК-4819.pdf", date: "16 апр 2026", size: "131 KB", status: "signed" },
  { id: "DOC-4819B", order: "ORD-4819", type: "Акт приёма", name: "АКТ-4819.pdf", date: "16 апр 2026", size: "67 KB", status: "review" },
  { id: "DOC-4818", order: "ORD-4818", type: "Квитанция", name: "КВ-4818.pdf", date: "15 апр 2026", size: "52 KB", status: "signed" },
];

const ANALYTICS_STATS = [
  { label: "Доставок за месяц", value: "248", delta: "+12%", up: true },
  { label: "Выручка", value: "₽4.2М", delta: "+8.3%", up: true },
  { label: "Ср. время доставки", value: "18.4 ч", delta: "-2.1 ч", up: true },
  { label: "Отменено", value: "7", delta: "-3", up: true },
];

const MAP_MARKERS = [
  { id: 1, type: "truck", label: "КАМАЗ-5490", status: "active" },
  { id: 2, type: "truck", label: "Volvo FH", status: "transit" },
  { id: 3, type: "depot", label: "Склад №1", status: "depot" },
  { id: 4, type: "truck", label: "MAN TGX", status: "active" },
  { id: 5, type: "depot", label: "Терминал Запад", status: "depot" },
];

// ─── Status Helpers ───────────────────────────────────────
const statusConfig: Record<string, { label: string; color: string }> = {
  active: { label: "В пути", color: "text-cyan" },
  transit: { label: "Загрузка", color: "text-amber" },
  done: { label: "Завершён", color: "text-green" },
  cancelled: { label: "Отменён", color: "text-red-status" },
  busy: { label: "Занят", color: "text-amber" },
  free: { label: "Свободен", color: "text-green" },
  depot: { label: "Склад", color: "text-muted-foreground" },
  signed: { label: "Подписан", color: "text-green" },
  pending: { label: "Ожидает", color: "text-amber" },
  review: { label: "На проверке", color: "text-cyan" },
};

const StatusBadge = ({ status }: { status: string }) => {
  const cfg = statusConfig[status] || { label: status, color: "text-muted-foreground" };
  return (
    <span className={`font-mono text-xs font-medium ${cfg.color} flex items-center gap-1.5`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current inline-block" />
      {cfg.label}
    </span>
  );
};

// ─── Map Section ──────────────────────────────────────────
const MapSection = () => {
  const [selected, setSelected] = useState<number | null>(null);

  const markerPos: Record<number, { x: string; y: string }> = {
    1: { x: "28%", y: "38%" },
    2: { x: "55%", y: "22%" },
    3: { x: "44%", y: "52%" },
    4: { x: "22%", y: "58%" },
    5: { x: "18%", y: "48%" },
  };

  return (
    <div className="flex-1 flex flex-col gap-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold">Карта маршрутов</h2>
          <p className="text-xs text-muted-foreground mt-0.5">Реальное время · обновлено 2 мин назад</p>
        </div>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full inline-block" style={{ background: "hsl(195 80% 52%)" }} />Грузовик</span>
          <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />Склад</span>
        </div>
      </div>

      <div className="flex gap-4 flex-1">
        <div className="flex-1 rounded-lg border border-surface relative overflow-hidden" style={{ minHeight: 400, background: "hsl(220 14% 7%)" }}>
          <svg className="absolute inset-0 w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="hsl(195 80% 52%)" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <line x1="15%" y1="60%" x2="70%" y2="20%" stroke="hsl(220 12% 22%)" strokeWidth="2" />
            <line x1="30%" y1="70%" x2="80%" y2="40%" stroke="hsl(220 12% 22%)" strokeWidth="2" />
            <line x1="10%" y1="35%" x2="90%" y2="55%" stroke="hsl(220 12% 20%)" strokeWidth="1.5" />
            <line x1="28%" y1="38%" x2="44%" y2="52%" stroke="hsl(195 80% 52%)" strokeWidth="1.5" strokeDasharray="6,4" opacity="0.6" />
            <line x1="55%" y1="22%" x2="44%" y2="52%" stroke="hsl(38 92% 55%)" strokeWidth="1.5" strokeDasharray="6,4" opacity="0.5" />
          </svg>

          {MAP_MARKERS.map((m) => {
            const pos = markerPos[m.id];
            const isDepot = m.type === "depot";
            const isSelected = selected === m.id;
            return (
              <button
                key={m.id}
                onClick={() => setSelected(isSelected ? null : m.id)}
                className="absolute group"
                style={{ left: pos.x, top: pos.y, transform: "translate(-50%, -50%)" }}
              >
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all
                  ${isDepot ? "border-amber-400/60 bg-amber-400/10" : "border-cyan-400/70 bg-cyan-400/10"}
                  ${isSelected ? "scale-125" : "hover:scale-110"}
                `}>
                  <Icon name={isDepot ? "Warehouse" : "Truck"} size={14} className={isDepot ? "text-amber-400" : "text-cyan-400"} />
                </div>
                {isSelected && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-card border border-surface rounded-md px-3 py-2 text-xs whitespace-nowrap z-10 shadow-xl">
                    <p className="font-medium text-foreground">{m.label}</p>
                    <StatusBadge status={m.status} />
                  </div>
                )}
              </button>
            );
          })}

          <div className="absolute top-3 left-3 flex items-center gap-2 bg-card/80 backdrop-blur-sm border border-surface rounded-md px-3 py-1.5 text-xs">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="text-green">LIVE</span>
            <span className="text-muted-foreground">· 3 грузовика онлайн</span>
          </div>
        </div>

        <div className="w-56 flex flex-col gap-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Объекты</p>
          {MAP_MARKERS.map((m) => (
            <button
              key={m.id}
              onClick={() => setSelected(selected === m.id ? null : m.id)}
              className={`text-left rounded-lg border p-3 transition-all
                ${selected === m.id ? "border-cyan-500/50 bg-cyan-500/5" : "border-surface surface-1 hover:border-border"}
              `}
            >
              <p className="text-xs font-medium">{m.label}</p>
              <StatusBadge status={m.status} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── Orders Section ───────────────────────────────────────
const OrdersSection = () => {
  const [filter, setFilter] = useState<"all" | "active" | "done">("all");
  const [selectedOrder, setSelectedOrder] = useState<typeof ORDERS[0] | null>(null);

  const filtered = ORDERS.filter((o) => {
    if (filter === "active") return o.status === "active" || o.status === "transit";
    if (filter === "done") return o.status === "done" || o.status === "cancelled";
    return true;
  });

  return (
    <div className="flex-1 flex flex-col gap-4 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-semibold">Заказы</h2>
          <p className="text-xs text-muted-foreground mt-0.5">{ORDERS.filter(o => o.status === "active" || o.status === "transit").length} активных</p>
        </div>
        <div className="flex bg-secondary rounded-lg p-0.5 text-xs">
          {(["all", "active", "done"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md transition-all ${filter === f ? "bg-card text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              {f === "all" ? "Все" : f === "active" ? "Активные" : "Архив"}
            </button>
          ))}
        </div>
      </div>

      <div className="flex gap-4 flex-1">
        <div className="flex-1 flex flex-col gap-1">
          {filtered.map((order, i) => (
            <button
              key={order.id}
              onClick={() => setSelectedOrder(selectedOrder?.id === order.id ? null : order)}
              className={`w-full text-left rounded-lg border px-4 py-3 transition-all hover:border-border
                ${selectedOrder?.id === order.id ? "border-cyan-500/40 bg-cyan-500/5" : "border-surface surface-1"}
              `}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-muted-foreground w-20 shrink-0">{order.id}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium truncate">{order.from}</span>
                    <Icon name="ArrowRight" size={12} className="text-muted-foreground shrink-0" />
                    <span className="text-muted-foreground truncate">{order.to}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5 truncate">{order.cargo} · {order.weight}</p>
                </div>
                <div className="shrink-0 text-right">
                  <StatusBadge status={order.status} />
                  <p className="text-xs text-muted-foreground mt-1">{order.date}</p>
                </div>
              </div>
              {(order.status === "active" || order.status === "transit") && (
                <div className="mt-2.5">
                  <div className="w-full h-0.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${order.progress}%`, background: "hsl(195 80% 52%)" }} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{order.progress}% завершено</p>
                </div>
              )}
            </button>
          ))}
        </div>

        {selectedOrder && (
          <div className="w-64 surface-1 rounded-lg border border-surface p-4 flex flex-col gap-4 animate-fade-in">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-xs text-muted-foreground">{selectedOrder.id}</p>
                <h3 className="font-semibold mt-0.5">{selectedOrder.from} → {selectedOrder.to}</h3>
              </div>
              <button onClick={() => setSelectedOrder(null)} className="text-muted-foreground hover:text-foreground p-1">
                <Icon name="X" size={14} />
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              {[
                { label: "Груз", value: selectedOrder.cargo },
                { label: "Вес", value: selectedOrder.weight },
                { label: "Водитель", value: selectedOrder.driver },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-start gap-2">
                  <span className="text-xs text-muted-foreground">{row.label}</span>
                  <span className="text-xs font-medium text-right">{row.value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center gap-2">
                <span className="text-xs text-muted-foreground">Статус</span>
                <StatusBadge status={selectedOrder.status} />
              </div>
            </div>

            <div className="border-t border-surface pt-3">
              <p className="text-xs font-medium mb-2 flex items-center gap-2 text-cyan">
                <Icon name="FileText" size={12} />
                Документ
              </p>
              <div className="flex items-center gap-2 surface-2 rounded-md px-3 py-2">
                <Icon name="FileText" size={14} className="text-muted-foreground shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium truncate">{selectedOrder.doc}.pdf</p>
                  <p className="text-xs text-muted-foreground">Накладная</p>
                </div>
                <button className="text-cyan hover:opacity-70 transition-opacity">
                  <Icon name="Download" size={13} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Drivers Section ──────────────────────────────────────
const DriversSection = () => (
  <div className="flex-1 flex flex-col gap-4 animate-fade-in">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-base font-semibold">Исполнители</h2>
        <p className="text-xs text-muted-foreground mt-0.5">{DRIVERS.filter(d => d.status === "free").length} свободных водителей</p>
      </div>
      <button className="flex items-center gap-2 text-xs border border-surface rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:border-border transition-all">
        <Icon name="Plus" size={12} />
        Добавить
      </button>
    </div>
    <div className="flex flex-col gap-2">
      {DRIVERS.map((d, i) => (
        <div
          key={d.id}
          className="surface-1 border border-surface rounded-lg px-4 py-3 flex items-center gap-4 hover:border-border transition-all animate-fade-in"
          style={{ animationDelay: `${i * 50}ms` }}
        >
          <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center shrink-0">
            <span className="text-xs font-semibold text-muted-foreground">{d.name.split(" ").map(n => n[0]).slice(0, 2).join("")}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{d.name}</p>
            <p className="text-xs text-muted-foreground truncate">{d.vehicle} · {d.license}</p>
          </div>
          <div className="flex items-center gap-4 shrink-0">
            <div className="text-right">
              <div className="flex items-center gap-1">
                <Icon name="Star" size={11} className="text-amber" />
                <span className="font-mono text-sm font-medium">{d.rating}</span>
              </div>
              <p className="text-xs text-muted-foreground">{d.trips} рейсов</p>
            </div>
            <StatusBadge status={d.status} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── Fleets Section ───────────────────────────────────────
const FleetsSection = () => (
  <div className="flex-1 flex flex-col gap-4 animate-fade-in">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-base font-semibold">Автопарки</h2>
        <p className="text-xs text-muted-foreground mt-0.5">{FLEETS.length} подключённых поставщика</p>
      </div>
      <button className="flex items-center gap-2 text-xs border border-surface rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:border-border transition-all">
        <Icon name="Plus" size={12} />
        Подключить автопарк
      </button>
    </div>
    <div className="grid grid-cols-2 gap-3">
      {FLEETS.map((f, i) => (
        <div
          key={f.id}
          className="surface-1 border border-surface rounded-lg p-4 hover:border-border transition-all cursor-pointer animate-fade-in"
          style={{ animationDelay: `${i * 60}ms` }}
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="font-semibold text-sm">{f.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{f.city} · с {f.since}</p>
            </div>
            <div className="flex items-center gap-1">
              <Icon name="Star" size={11} className="text-amber" />
              <span className="font-mono text-sm font-medium">{f.rating}</span>
            </div>
          </div>
          <div className="flex gap-4">
            <div>
              <p className="font-mono text-xl font-medium">{f.trucks}</p>
              <p className="text-xs text-muted-foreground">грузовиков</p>
            </div>
            <div className="border-l border-surface pl-4">
              <p className="font-mono text-xl font-medium text-green">{f.available}</p>
              <p className="text-xs text-muted-foreground">свободно</p>
            </div>
          </div>
          <div className="mt-3 w-full h-0.5 bg-secondary rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${(f.available / f.trucks) * 100}%`, background: "hsl(195 80% 52% / 0.5)" }} />
          </div>
        </div>
      ))}
    </div>
  </div>
);

// ─── Chats Section ────────────────────────────────────────
const ChatsSection = () => {
  const [active, setActive] = useState(CHATS[0]);
  const mockMessages = [
    { from: "them", text: "Добрый день! Подтверждаю принятие заказа.", time: "11:30" },
    { from: "me", text: "Отлично. Место погрузки: ул. Складская, 14.", time: "11:32" },
    { from: "them", text: "Понял, буду около 13:00.", time: "11:35" },
    { from: "me", text: "Хорошо, вас встретят.", time: "11:36" },
    { from: "them", text: active.last, time: active.time },
  ];

  return (
    <div className="flex-1 flex gap-4 animate-fade-in" style={{ minHeight: 0 }}>
      <div className="w-64 flex flex-col gap-1">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">Диалоги</p>
        {CHATS.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c)}
            className={`text-left rounded-lg border p-3 transition-all
              ${active.id === c.id ? "border-cyan-500/40 bg-cyan-500/5" : "border-surface surface-1 hover:border-border"}
            `}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs font-medium truncate">{c.participant}</p>
                <p className="text-xs text-muted-foreground">{c.role} · {c.order}</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <span className="text-xs text-muted-foreground">{c.time}</span>
                {c.unread > 0 && (
                  <span className="w-4 h-4 rounded-full text-xs flex items-center justify-center font-medium text-background" style={{ background: "hsl(195 80% 52%)" }}>
                    {c.unread}
                  </span>
                )}
              </div>
            </div>
            <p className="text-xs text-muted-foreground truncate mt-1">{c.last}</p>
          </button>
        ))}
      </div>

      <div className="flex-1 surface-1 border border-surface rounded-lg flex flex-col">
        <div className="border-b border-surface px-4 py-3 flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-secondary flex items-center justify-center">
            <Icon name="User" size={13} className="text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium">{active.participant}</p>
            <p className="text-xs text-muted-foreground">{active.role} · {active.order}</p>
          </div>
        </div>
        <div className="flex-1 p-4 flex flex-col gap-3 overflow-y-auto">
          {mockMessages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs rounded-lg px-3 py-2 text-xs
                ${msg.from === "me" ? "bg-cyan-500/15 text-foreground" : "surface-2 text-foreground"}
              `}>
                <p>{msg.text}</p>
                <p className="text-muted-foreground mt-1 text-right">{msg.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-surface px-4 py-3 flex gap-2">
          <input
            placeholder="Написать сообщение..."
            className="flex-1 bg-secondary rounded-lg px-3 py-2 text-xs outline-none placeholder:text-muted-foreground border border-transparent focus:border-cyan-500/40 transition-colors"
          />
          <button className="rounded-lg px-3 py-2 text-xs font-medium transition-colors text-background" style={{ background: "hsl(195 80% 52%)" }}>
            <Icon name="Send" size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Documents Section ────────────────────────────────────
const DocumentsSection = () => (
  <div className="flex-1 flex flex-col gap-4 animate-fade-in">
    <div className="flex items-center justify-between">
      <div>
        <h2 className="text-base font-semibold">Документы</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Накладные, квитанции, акты приёма</p>
      </div>
      <button className="flex items-center gap-2 text-xs border border-surface rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:border-border transition-all">
        <Icon name="Upload" size={12} />
        Загрузить
      </button>
    </div>

    <div className="surface-1 rounded-lg border border-surface overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-surface">
            {["Документ", "Тип", "Заказ", "Дата", "Размер", "Статус", ""].map((h, i) => (
              <th key={i} className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {DOCUMENTS.map((doc, i) => (
            <tr
              key={doc.id}
              className="border-b border-surface last:border-0 hover:bg-secondary/30 transition-colors"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Icon name="FileText" size={14} className="text-muted-foreground shrink-0" />
                  <span className="text-sm font-medium">{doc.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-xs text-muted-foreground">{doc.type}</td>
              <td className="px-4 py-3 font-mono text-xs text-cyan">{doc.order}</td>
              <td className="px-4 py-3 text-xs text-muted-foreground">{doc.date}</td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{doc.size}</td>
              <td className="px-4 py-3"><StatusBadge status={doc.status} /></td>
              <td className="px-4 py-3">
                <button className="text-muted-foreground hover:text-cyan transition-colors">
                  <Icon name="Download" size={13} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ─── Analytics Section ────────────────────────────────────
const AnalyticsSection = () => {
  const bars = [68, 82, 75, 91, 60, 88, 72, 95, 84, 79, 92, 87];
  const months = ["Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек", "Янв", "Фев", "Мар", "Апр"];

  return (
    <div className="flex-1 flex flex-col gap-4 animate-fade-in">
      <div>
        <h2 className="text-base font-semibold">Аналитика</h2>
        <p className="text-xs text-muted-foreground mt-0.5">Показатели за апрель 2026</p>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {ANALYTICS_STATS.map((s, i) => (
          <div key={i} className="surface-1 border border-surface rounded-lg px-4 py-3 animate-fade-in" style={{ animationDelay: `${i * 60}ms` }}>
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="font-mono text-2xl font-medium mt-1">{s.value}</p>
            <p className={`text-xs mt-1 flex items-center gap-1 ${s.up ? "text-green" : "text-red-status"}`}>
              <Icon name={s.up ? "TrendingUp" : "TrendingDown"} size={11} />
              {s.delta} к пред. месяцу
            </p>
          </div>
        ))}
      </div>

      <div className="surface-1 border border-surface rounded-lg p-4 flex-1">
        <p className="text-xs font-medium text-muted-foreground mb-4">Доставок по месяцам</p>
        <div className="flex items-end gap-2 h-32">
          {bars.map((h, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
              <div
                className="w-full rounded-sm relative overflow-hidden transition-all hover:opacity-80 cursor-pointer"
                style={{ height: `${h}%`, background: "hsl(195 80% 52% / 0.25)" }}
              >
                <div className="absolute bottom-0 left-0 right-0 rounded-sm" style={{ height: "30%", background: "hsl(195 80% 52% / 0.7)" }} />
              </div>
              <span className="text-muted-foreground" style={{ fontSize: 10 }}>{months[i]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { route: "Москва — СПб", count: 48, pct: 19 },
          { route: "Екб — Челябинск", count: 32, pct: 13 },
          { route: "НН — Казань", count: 28, pct: 11 },
        ].map((r, i) => (
          <div key={i} className="surface-1 border border-surface rounded-lg px-4 py-3">
            <p className="text-xs font-medium">{r.route}</p>
            <p className="font-mono text-lg font-medium mt-1">{r.count} рейсов</p>
            <div className="mt-2 w-full h-0.5 bg-secondary rounded-full overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${r.pct * 5}%`, background: "hsl(195 80% 52% / 0.6)" }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── Profile Section ──────────────────────────────────────
const ProfileSection = () => (
  <div className="flex-1 flex flex-col gap-4 animate-fade-in max-w-2xl">
    <div>
      <h2 className="text-base font-semibold">Профиль</h2>
      <p className="text-xs text-muted-foreground mt-0.5">Настройки аккаунта и история операций</p>
    </div>

    <div className="surface-1 border border-surface rounded-lg p-5">
      <div className="flex items-center gap-4 mb-5">
        <div className="w-12 h-12 rounded-full border flex items-center justify-center" style={{ background: "hsl(195 80% 52% / 0.1)", borderColor: "hsl(195 80% 52% / 0.3)" }}>
          <span className="text-lg font-semibold text-cyan">АД</span>
        </div>
        <div>
          <p className="font-semibold">Алексей Дмитриев</p>
          <p className="text-xs text-muted-foreground">Логист · admin@logiflow.ru</p>
        </div>
        <button className="ml-auto text-xs border border-surface rounded-lg px-3 py-1.5 text-muted-foreground hover:text-foreground transition-all">
          Редактировать
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4 border-t border-surface pt-4">
        {[
          { label: "На платформе", value: "с марта 2024" },
          { label: "Всего заказов", value: "1 247" },
          { label: "Тариф", value: "Бизнес" },
        ].map((s) => (
          <div key={s.label}>
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="font-mono text-sm font-medium mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>
    </div>

    <div className="surface-1 border border-surface rounded-lg overflow-hidden">
      <div className="px-4 py-3 border-b border-surface">
        <p className="text-xs font-medium">История операций</p>
      </div>
      {[
        { action: "Заказ создан", detail: "ORD-4821 · Москва → СПб", time: "Сегодня, 09:14" },
        { action: "Документ загружен", detail: "НК-4820.pdf", time: "Сегодня, 08:52" },
        { action: "Заказ завершён", detail: "ORD-4818 · Ростов → Краснодар", time: "Вчера, 18:30" },
        { action: "Водитель добавлен", detail: "Морозов А.С.", time: "Вчера, 11:00" },
      ].map((op, i) => (
        <div key={i} className="px-4 py-3 border-b border-surface last:border-0 flex items-center gap-4">
          <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "hsl(195 80% 52% / 0.6)" }} />
          <div className="flex-1">
            <p className="text-xs font-medium">{op.action}</p>
            <p className="text-xs text-muted-foreground">{op.detail}</p>
          </div>
          <span className="text-xs text-muted-foreground">{op.time}</span>
        </div>
      ))}
    </div>
  </div>
);

// ─── Navigation config ────────────────────────────────────
const NAV_ITEMS: { id: Section; label: string; icon: string; badge?: number }[] = [
  { id: "orders", label: "Заказы", icon: "Package", badge: 3 },
  { id: "map", label: "Карта", icon: "Map" },
  { id: "fleets", label: "Автопарки", icon: "Truck" },
  { id: "drivers", label: "Исполнители", icon: "Users" },
  { id: "chats", label: "Чаты", icon: "MessageSquare", badge: 3 },
  { id: "documents", label: "Документы", icon: "FolderOpen" },
  { id: "analytics", label: "Аналитика", icon: "BarChart2" },
];

// ─── Main App ─────────────────────────────────────────────
export default function Index() {
  const [section, setSection] = useState<Section>("orders");

  const renderSection = () => {
    switch (section) {
      case "orders": return <OrdersSection />;
      case "map": return <MapSection />;
      case "fleets": return <FleetsSection />;
      case "drivers": return <DriversSection />;
      case "chats": return <ChatsSection />;
      case "documents": return <DocumentsSection />;
      case "analytics": return <AnalyticsSection />;
      case "profile": return <ProfileSection />;
    }
  };

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 border-r border-surface flex flex-col shrink-0" style={{ background: "hsl(220 14% 5%)" }}>
        <div className="px-5 py-4 border-b border-surface">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md flex items-center justify-center" style={{ background: "hsl(195 80% 52%)" }}>
              <Icon name="Navigation" size={13} className="text-background" />
            </div>
            <span className="font-semibold tracking-tight">LogiFlow</span>
          </div>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs text-muted-foreground">Система онлайн</span>
          </div>
        </div>

        <nav className="flex-1 px-2 py-3 flex flex-col gap-0.5">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setSection(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all
                ${section === item.id
                  ? "text-cyan border border-cyan-500/20"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary border border-transparent"
                }
              `}
              style={section === item.id ? { background: "hsl(195 80% 52% / 0.08)" } : {}}
            >
              <Icon name={item.icon} size={15} />
              <span className="text-sm flex-1">{item.label}</span>
              {item.badge && (
                <span className="w-4 h-4 rounded-full text-xs flex items-center justify-center font-medium text-background" style={{ background: "hsl(195 80% 52%)" }}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="px-2 py-3 border-t border-surface">
          <button
            onClick={() => setSection("profile")}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all
              ${section === "profile"
                ? "text-cyan border border-cyan-500/20"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary border border-transparent"
              }
            `}
            style={section === "profile" ? { background: "hsl(195 80% 52% / 0.08)" } : {}}
          >
            <div className="w-6 h-6 rounded-full border flex items-center justify-center shrink-0" style={{ background: "hsl(195 80% 52% / 0.1)", borderColor: "hsl(195 80% 52% / 0.3)" }}>
              <span className="text-xs font-medium text-cyan">АД</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium truncate">Алексей Д.</p>
              <p className="text-xs text-muted-foreground">Логист</p>
            </div>
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-12 border-b border-surface flex items-center px-6 gap-4 shrink-0" style={{ background: "hsl(220 14% 5%)" }}>
          <div className="flex-1 flex items-center gap-2">
            <Icon name="Search" size={14} className="text-muted-foreground" />
            <input
              placeholder="Поиск по заказам, водителям..."
              className="bg-transparent text-sm outline-none placeholder:text-muted-foreground flex-1"
            />
          </div>
          <div className="flex items-center gap-3">
            <button className="relative text-muted-foreground hover:text-foreground transition-colors">
              <Icon name="Bell" size={16} />
              <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-background" style={{ background: "hsl(195 80% 52%)" }} />
            </button>
            <div className="h-5 w-px bg-border" />
            <span className="font-mono text-xs text-muted-foreground">17 апр 2026</span>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col">
          {renderSection()}
        </div>
      </main>
    </div>
  );
}
