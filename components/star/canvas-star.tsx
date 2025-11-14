"use client";

import debounce from "lodash.debounce";
import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { Star } from "@/lib/star";
import { cn } from "@/lib/utils";

interface CanvasStarProps {
  classNames?: string
}

export function CanvasStar(props: CanvasStarProps) {
  const { classNames } = props;

  const { resolvedTheme } = useTheme();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const clearIntervalRef = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    const handleResizeWithTheme = debounce(() => {
      const canvas = canvasRef.current;

      const ctx = canvasRef.current?.getContext("2d");

      if (clearIntervalRef.current) {
        clearInterval(clearIntervalRef.current);
      }

      if (canvas && ctx) {
        // 获取设备像素比
        const dpr = window.devicePixelRatio || 1;
        // 调整canvas尺寸以适应devicePixelRatio
        canvas.width = canvas.offsetWidth * dpr;
        canvas.height = canvas.offsetHeight * dpr;
        // 缩放context
        ctx.scale(dpr, dpr);

        const starCountCoe = resolvedTheme === "dark" ? 10 : 1;

        const stars: Star[] = [];
        // pc端给20个✨，移动端给5个
        const starCount = window.innerWidth > 768 ? 20 * starCountCoe : 5 * starCountCoe;

        for (let i = 0; i < starCount; i += 1) {
          stars.push(new Star({ ctx, boundary: [window.innerWidth, window.innerHeight], dark: resolvedTheme === "dark" }));
        }

        clearIntervalRef.current = setInterval(() => {
          ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
          stars.forEach((star) => {
            star.draw();
          });
        }, 100);
      }
    }, 200, { trailing: true, leading: false });

    handleResizeWithTheme();

    window.addEventListener("resize", handleResizeWithTheme);

    return () => {
      window.removeEventListener("resize", handleResizeWithTheme);
    };
  }, [resolvedTheme]);

  useEffect(() => {
    const intervalId = clearIntervalRef.current;

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <canvas className={cn("w-screen h-screen", classNames)} ref={canvasRef}>
      &nbsp;
    </canvas>
  );
}
