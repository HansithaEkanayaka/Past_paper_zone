"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import styles from "./AdminCharts.module.css";

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

function niceMax(value: number): number {
  if (value <= 4) return 4;
  const pow = Math.pow(10, Math.floor(Math.log10(value)));
  const n = value / pow;
  const nice = n <= 1 ? 1 : n <= 2 ? 2 : n <= 2.5 ? 2.5 : n <= 5 ? 5 : 10;
  return nice * pow;
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function formatDateLabel(label: string): string {
  // "2026-11-21" -> "Nov 21"; hourly labels ("14:00") pass through unchanged
  const m = label.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return label;
  return `${MONTHS[Number(m[2]) - 1]} ${Number(m[3])}`;
}

function formatLongDate(label: string): string {
  const m = label.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!m) return label;
  return `${MONTHS[Number(m[2]) - 1]} ${Number(m[3])}, ${m[1]}`;
}

function smoothPath(points: { x: number; y: number }[]): string {
  if (!points.length) return "";
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const p0 = points[i - 1];
    const p1 = points[i];
    const mx = (p0.x + p1.x) / 2;
    d += ` C ${mx} ${p0.y}, ${mx} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  return d;
}

function useWidth<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    setWidth(el.clientWidth);
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) setWidth(Math.floor(entry.contentRect.width));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}

/* ------------------------------------------------------------------ */
/* Trend (multi-series line / area) chart                              */
/* ------------------------------------------------------------------ */

export type TrendSeries = { key: string; label: string; color: string };
export type TrendPoint = { label: string } & Record<string, number | string>;

export function TrendChart({
  data,
  series,
  height = 300,
}: {
  data: TrendPoint[];
  series: TrendSeries[];
  height?: number;
}) {
  const [wrapRef, width] = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const gradId = useId().replace(/:/g, "");

  const padL = 42;
  const padR = 14;
  const padT = 14;
  const padB = 30;
  const innerW = Math.max(width - padL - padR, 10);
  const innerH = height - padT - padB;

  const maxValue = Math.max(
    0,
    ...data.flatMap((d) => series.map((s) => Number(d[s.key]) || 0))
  );
  const yMax = niceMax(maxValue);
  const isEmpty = maxValue === 0;

  const xAt = (i: number) =>
    data.length <= 1 ? padL + innerW / 2 : padL + (i / (data.length - 1)) * innerW;
  const yAt = (v: number) => padT + innerH - (v / yMax) * innerH;

  const ticks = [0, 0.25, 0.5, 0.75, 1].map((t) => Math.round(yMax * t * 10) / 10);

  // Roughly 6 evenly spaced x labels, always including the first and last.
  const maxLabels = Math.max(2, Math.floor(innerW / 80));
  const labelEvery = Math.max(1, Math.ceil(data.length / maxLabels));

  const handleMove = (clientX: number, rect: DOMRect) => {
    if (!data.length) return;
    const x = clientX - rect.left - padL;
    const idx = data.length <= 1 ? 0 : Math.round((x / innerW) * (data.length - 1));
    setHover(Math.min(Math.max(idx, 0), data.length - 1));
  };

  const hoverPoint = hover !== null ? data[hover] : null;
  const tooltipLeft =
    hover !== null ? Math.min(Math.max(xAt(hover) - 80, 0), Math.max(width - 170, 0)) : 0;

  return (
    <div className={styles.chartWrap} ref={wrapRef} style={{ height }}>
      {width > 0 && (
        <svg
          className={styles.svg}
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="Traffic trend chart"
          onPointerMove={(e) => handleMove(e.clientX, e.currentTarget.getBoundingClientRect())}
          onPointerLeave={() => setHover(null)}
        >
          <defs>
            {series.map((s) => (
              <linearGradient key={s.key} id={`${gradId}-${s.key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={s.color} stopOpacity="0.28" />
                <stop offset="100%" stopColor={s.color} stopOpacity="0" />
              </linearGradient>
            ))}
          </defs>

          {ticks.map((t) => (
            <g key={t}>
              <line className={styles.gridLine} x1={padL} x2={width - padR} y1={yAt(t)} y2={yAt(t)} />
              <text className={styles.axisText} x={padL - 8} y={yAt(t) + 4} textAnchor="end">
                {t % 1 === 0 ? t.toLocaleString() : t.toFixed(1)}
              </text>
            </g>
          ))}

          {data.map((d, i) =>
            i % labelEvery === 0 && (data.length - 1 - i >= labelEvery * 0.6 || i === data.length - 1) ? (
              <text
                key={d.label}
                className={styles.axisText}
                x={xAt(i)}
                y={height - 8}
                textAnchor={i === 0 ? "start" : i === data.length - 1 ? "end" : "middle"}
              >
                {formatDateLabel(d.label)}
              </text>
            ) : null
          )}

          {!isEmpty &&
            series.map((s, si) => {
              const pts = data.map((d, i) => ({ x: xAt(i), y: yAt(Number(d[s.key]) || 0) }));
              const line = smoothPath(pts);
              const area =
                pts.length > 1
                  ? `${line} L ${pts[pts.length - 1].x} ${padT + innerH} L ${pts[0].x} ${padT + innerH} Z`
                  : "";
              return (
                <g key={s.key}>
                  {si === 0 && area && <path d={area} fill={`url(#${gradId}-${s.key})`} />}
                  <path d={line} fill="none" stroke={s.color} strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" />
                  {pts.length === 1 && <circle cx={pts[0].x} cy={pts[0].y} r={4} fill={s.color} />}
                </g>
              );
            })}

          {hover !== null && !isEmpty && (
            <>
              <line className={styles.cursorLine} x1={xAt(hover)} x2={xAt(hover)} y1={padT} y2={padT + innerH} />
              {series.map((s) => (
                <circle
                  key={s.key}
                  cx={xAt(hover)}
                  cy={yAt(Number(data[hover][s.key]) || 0)}
                  r={4.5}
                  fill="var(--admin-card)"
                  stroke={s.color}
                  strokeWidth={2.4}
                />
              ))}
            </>
          )}
        </svg>
      )}

      {isEmpty && width > 0 && <div className={styles.empty}>No activity recorded in this period</div>}

      {hoverPoint && !isEmpty && (
        <div className={styles.tooltip} style={{ left: tooltipLeft }}>
          <div className={styles.tooltipTitle}>{formatLongDate(hoverPoint.label)}</div>
          {series.map((s) => (
            <div key={s.key} className={styles.tooltipRow}>
              <i className={styles.dot} style={{ background: s.color }} />
              {s.label}
              <b>{(Number(hoverPoint[s.key]) || 0).toLocaleString()}</b>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export function ChartLegend({ series }: { series: TrendSeries[] }) {
  return (
    <div className={styles.legend}>
      {series.map((s) => (
        <span key={s.key} className={styles.legendItem}>
          <i className={styles.dot} style={{ background: s.color }} />
          {s.label}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Hour-of-day bars                                                    */
/* ------------------------------------------------------------------ */

export function HourBars({ values }: { values: number[] }) {
  const max = Math.max(1, ...values);
  const peak = values.some((v) => v > 0) ? values.indexOf(Math.max(...values)) : -1;
  return (
    <div>
      <div className={styles.hours}>
        {values.map((v, h) => (
          <div key={h} className={styles.hourCol}>
            <span className={styles.hourTip}>
              {String(h).padStart(2, "0")}:00 · {v.toLocaleString()}
            </span>
            <div
              className={`${styles.hourBar} ${h === peak ? styles.hourPeak : ""}`}
              style={{ height: `${Math.max((v / max) * 100, 2)}%` }}
            />
          </div>
        ))}
      </div>
      <div className={styles.hourLabels}>
        {values.map((_, h) => (
          <span key={h}>{String(h).padStart(2, "0")}</span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Donut                                                               */
/* ------------------------------------------------------------------ */

export function Donut({
  segments,
  centerLabel,
}: {
  segments: { label: string; value: number; color: string }[];
  centerLabel: string;
}) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const r = 54;
  const c = 2 * Math.PI * r;
  let offset = 0;

  return (
    <div className={styles.donutWrap}>
      <svg className={styles.donutSvg} viewBox="0 0 150 150" role="img" aria-label={centerLabel}>
        <circle cx="75" cy="75" r={r} fill="none" stroke="var(--admin-grid)" strokeWidth="16" />
        {total > 0 &&
          segments.map((s) => {
            const len = (s.value / total) * c;
            const el = (
              <circle
                key={s.label}
                cx="75"
                cy="75"
                r={r}
                fill="none"
                stroke={s.color}
                strokeWidth="16"
                strokeDasharray={`${Math.max(len - 2, 0)} ${c - Math.max(len - 2, 0)}`}
                strokeDashoffset={-offset}
                transform="rotate(-90 75 75)"
              />
            );
            offset += len;
            return el;
          })}
        <text className={styles.donutTotal} x="75" y="78" textAnchor="middle">
          {total.toLocaleString()}
        </text>
        <text className={styles.donutSub} x="75" y="94" textAnchor="middle">
          {centerLabel}
        </text>
      </svg>
      <div className={styles.donutLegend}>
        {segments.map((s) => (
          <div key={s.label} className={styles.donutRow}>
            <i className={styles.dot} style={{ background: s.color }} />
            {s.label}
            <b>
              {s.value.toLocaleString()}{" "}
              <small>{total ? `${Math.round((s.value / total) * 100)}%` : "0%"}</small>
            </b>
          </div>
        ))}
      </div>
    </div>
  );
}
