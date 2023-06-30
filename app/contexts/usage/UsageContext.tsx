import { createContext, useContext } from 'react';

interface IUsageContext {
  usagePercentage: number;
}

export const UsageContext = createContext<IUsageContext>({
  usagePercentage: 0,
});

export const useUsageContext = () => useContext(UsageContext);
