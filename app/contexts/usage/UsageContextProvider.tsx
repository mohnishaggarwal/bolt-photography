'use client';

import { ReactNode } from 'react';
import { UsageContext } from './UsageContext';

export default function UsageContextProvider({
  children,
  usagePercentage,
}: {
  children: ReactNode;
  usagePercentage: number;
}) {
  return (
    <UsageContext.Provider value={{ usagePercentage }}>
      {children}
    </UsageContext.Provider>
  );
}
