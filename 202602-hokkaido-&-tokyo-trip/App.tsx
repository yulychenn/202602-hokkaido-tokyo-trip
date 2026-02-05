import React, { useState, useRef, useEffect } from 'react';
import { ITINERARY_DATA, FLIGHTS, HOTELS, getTypeIcon } from './constants';
import { Activity, DayItinerary, ActivityType } from './types';
import { Snowflake, Calendar, MapPin, Plane, ChevronRight, Clock } from 'lucide-react';

const DayCard: React.FC<{ day: DayItinerary, isActive: boolean }> = ({ day, isActive }) => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden mb-6">
      {/* Header */}
      <div className={`p-4 ${day.location === 'Otaru' || day.location === 'Sapporo' ? 'bg-blue-50' : 'bg-rose-50'}`}>
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center space-x-2">
            <span className="bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded">
              Day {day.day}
            </span>
            <span className="text-slate-500 font-medium text-sm">
              {day.date} ({day.weekday})
            </span>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            {day.location}
          </span>
        </div>
        <h3 className="text-xl font-bold text-slate-800 leading-tight">
          {day.title}
        </h3>
        {day.hotel && (
          <div className="mt-3 flex items-start text-xs text-slate-600 bg-white/60 p-2 rounded-lg backdrop-blur-sm">
            <MapPin className="w-3 h-3 mr-1 mt-0.5 flex-shrink-0" />
            <span>{day.hotel}</span>
          </div>
        )}
      </div>

      {/* Timeline */}
      <div className="p-4 space-y-6">
        {day.activities.map((activity, idx) => (
          <div key={idx} className="relative pl-6 last:pb-0">
            {/* Timeline Line */}
            {idx !== day.activities.length - 1 && (
              <div className="absolute left-[11px] top-7 bottom-0 w-0.5 bg-slate-100"></div>
            )}

            {/* Icon Bubble */}
            <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white border border-slate-200 flex items-center justify-center z-10 shadow-sm">
              {getTypeIcon(activity.type)}
            </div>

            {/* Content */}
            <div className="ml-2">
              <div className="flex flex-wrap items-baseline gap-2 mb-1">
                {activity.time && (
                  <span className="text-xs font-mono font-bold text-slate-400 bg-slate-50 px-1.5 py-0.5 rounded">
                    {activity.time}
                  </span>
                )}
                <h4 className="font-bold text-slate-800">{activity.title}</h4>
              </div>

              {activity.tags && (
                <div className="flex flex-wrap gap-1 mb-2">
                  {activity.tags.map(tag => (
                    <span key={tag} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {activity.description && (
                <p className="text-sm text-slate-600 leading-relaxed mb-1">
                  {activity.description}
                </p>
              )}

              {activity.details && activity.details.length > 0 && (
                <ul className="mt-2 space-y-1 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  {activity.details.map((detail, dIdx) => (
                    <li key={dIdx} className="text-xs text-slate-500 flex items-start">
                      <span className="mr-1.5 mt-1 block w-1 h-1 rounded-full bg-slate-300 flex-shrink-0"></span>
                      {detail}
                    </li>
                  ))}
                </ul>
              )}

              {activity.image && (
                <div className="mt-3">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full rounded-lg border border-slate-200 shadow-sm"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const FlightCard: React.FC<{ info: typeof FLIGHTS[0] }> = ({ info }) => (
  <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
    <div className="flex justify-between items-start mb-2">
      <div className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded">
        {info.code}
      </div>
    </div>
    <div className="flex items-center space-x-2 mb-2">
      <Plane className="w-4 h-4 text-slate-400" />
      <span className="text-sm font-semibold text-slate-700">{info.route}</span>
    </div>
    <div className="flex items-center space-x-2 text-xs text-slate-500">
      <Clock className="w-3 h-3" />
      <span>{info.time}</span>
    </div>
    <p className="text-xs text-slate-400 mt-2">{info.description}</p>
  </div>
);

const App: React.FC = () => {
  const [activeDay, setActiveDay] = useState<number>(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // 滑鼠拖曳滾動
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let isDown = false;
    let startX: number;
    let scrollLeft: number;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      container.style.cursor = 'grabbing';
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
    };

    const handleMouseLeave = () => {
      isDown = false;
      container.style.cursor = 'grab';
    };

    const handleMouseUp = () => {
      isDown = false;
      container.style.cursor = 'grab';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 2;
      container.scrollLeft = scrollLeft - walk;
    };

    // 滾輪橫向滾動
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      container.scrollLeft += e.deltaY;
    };

    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseleave', handleMouseLeave);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('wheel', handleWheel, { passive: false });

    container.style.cursor = 'grab';

    return () => {
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseleave', handleMouseLeave);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  const handleTabClick = (dayNum: number) => {
    setActiveDay(dayNum);
    const element = document.getElementById(`day-${dayNum}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen pb-20 bg-slate-50">
      {/* Hero Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="w-full px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-slate-900 flex items-center">
              <Snowflake className="w-5 h-5 text-cyan-500 mr-2" />
              2026 北海道・東京
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">2/8 - 2/18 (11 Days)</p>
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors"
          >
            <Calendar className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Day Navigation - Horizontal Scroll */}
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto px-4 pb-3"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          <div className="flex gap-2 min-w-max">
            {ITINERARY_DATA.map((day) => (
              <button
                key={day.day}
                onClick={() => handleTabClick(day.day)}
                className={`flex-shrink-0 px-3 py-2 rounded-lg text-[10px] font-medium transition-all text-center leading-tight ${activeDay === day.day
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                  }`}
              >
                <div className="font-bold text-[11px] whitespace-nowrap">{day.date} ({day.weekday})</div>
                <div className="text-[9px] opacity-70 mt-0.5 flex items-center justify-center gap-1">
                  <span>Day {day.day}</span>
                  <span className={`font-semibold ${activeDay === day.day ? 'text-cyan-300' : 'text-slate-400'}`}>
                    {day.location === 'Otaru' ? '小樽' : day.location === 'Sapporo' ? '札幌' : day.location.includes('Tokyo') ? '東京' : day.location}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </header>

      <main className="w-full px-4 pt-6 space-y-8 max-w-2xl mx-auto">

        {/* Info Section (Only shown at top) */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800 px-1">航班資訊</h2>
          <div className="grid grid-cols-2 gap-3">
            {FLIGHTS.map((f, i) => <FlightCard key={i} info={f} />)}
          </div>
        </section>

        {/* Itinerary Feed */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-slate-800 px-1 mb-4">每日行程</h2>
          {ITINERARY_DATA.map((day) => (
            <div id={`day-${day.day}`} key={day.day} style={{ scrollMarginTop: '130px' }}>
              <DayCard
                day={day}
                isActive={activeDay === day.day}
              />
            </div>
          ))}
        </section>

        {/* Hotel Reference */}
        <section className="pb-8">
          <h2 className="text-lg font-bold text-slate-800 px-1 mb-4">住宿列表</h2>
          <div className="bg-white rounded-xl border border-slate-100 divide-y divide-slate-100">
            {Object.entries(HOTELS).map(([key, hotel]) => (
              <div key={key} className="p-4">
                <h4 className="font-bold text-slate-700 text-sm mb-1">{hotel.name}</h4>
                <div className="flex items-start text-xs text-slate-500">
                  <MapPin className="w-3 h-3 mr-1.5 mt-0.5 flex-shrink-0" />
                  <p>{hotel.address}</p>
                </div>
                {hotel.phone && (
                  <p className="text-xs text-slate-400 mt-1 ml-4.5">{hotel.phone}</p>
                )}
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};

export default App;