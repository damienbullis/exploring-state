import { useEffect, useState } from "react";

export function createSubbable<DataType>() {
  const subscribers = new Set<(msg: DataType) => void>();

  return {
    subscribe(cb: (msg: DataType) => void): () => void {
      subscribers.add(cb);
      return () => {
        subscribers.delete(cb);
      };
    },
    publish(msg: DataType): void {
      subscribers.forEach((cb) => cb(msg));
    },
  };
}
