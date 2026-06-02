import { useCallback, useEffect, useRef, useState } from 'react';
import { Vibration } from 'react-native';

export type TimerStatus = 'idle' | 'running' | 'paused' | 'completed';

interface FocusTimerState {
  status: TimerStatus;
  remainingSeconds: number;
  totalSeconds: number;
}

const TICK_MS = 250;

export function useFocusTimer() {
  const [state, setState] = useState<FocusTimerState>({
    status: 'idle',
    remainingSeconds: 0,
    totalSeconds: 0,
  });

  const endsAtRef = useRef<number | null>(null);
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTick = useCallback(() => {
    if (tickRef.current) {
      clearInterval(tickRef.current);
      tickRef.current = null;
    }
  }, []);

  const tick = useCallback(() => {
    if (endsAtRef.current === null) return;
    const remainingMs = endsAtRef.current - Date.now();
    if (remainingMs <= 0) {
      clearTick();
      endsAtRef.current = null;
      Vibration.vibrate([0, 400, 200, 400, 200, 600]);
      setState((prev) => ({
        status: 'completed',
        remainingSeconds: 0,
        totalSeconds: prev.totalSeconds,
      }));
      return;
    }
    setState((prev) => ({
      ...prev,
      remainingSeconds: Math.ceil(remainingMs / 1000),
    }));
  }, [clearTick]);

  const start = useCallback(
    (totalSeconds: number) => {
      clearTick();
      endsAtRef.current = Date.now() + totalSeconds * 1000;
      setState({ status: 'running', remainingSeconds: totalSeconds, totalSeconds });
      tickRef.current = setInterval(tick, TICK_MS);
    },
    [clearTick, tick],
  );

  const pause = useCallback(() => {
    if (state.status !== 'running' || endsAtRef.current === null) return;
    const remainingMs = Math.max(0, endsAtRef.current - Date.now());
    clearTick();
    endsAtRef.current = null;
    setState((prev) => ({
      status: 'paused',
      remainingSeconds: Math.ceil(remainingMs / 1000),
      totalSeconds: prev.totalSeconds,
    }));
  }, [state.status, clearTick]);

  const resume = useCallback(() => {
    if (state.status !== 'paused') return;
    endsAtRef.current = Date.now() + state.remainingSeconds * 1000;
    setState((prev) => ({ ...prev, status: 'running' }));
    tickRef.current = setInterval(tick, TICK_MS);
  }, [state.status, state.remainingSeconds, tick]);

  const cancel = useCallback(() => {
    clearTick();
    endsAtRef.current = null;
    setState({ status: 'idle', remainingSeconds: 0, totalSeconds: 0 });
  }, [clearTick]);

  const dismissCompleted = useCallback(() => {
    setState({ status: 'idle', remainingSeconds: 0, totalSeconds: 0 });
  }, []);

  useEffect(() => clearTick, [clearTick]);

  return {
    status: state.status,
    remainingSeconds: state.remainingSeconds,
    totalSeconds: state.totalSeconds,
    start,
    pause,
    resume,
    cancel,
    dismissCompleted,
  };
}

export function formatRemaining(seconds: number): string {
  const safe = Math.max(0, seconds);
  const m = Math.floor(safe / 60);
  const s = safe % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
}
