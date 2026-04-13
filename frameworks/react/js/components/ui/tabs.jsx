import React, { useState, createContext, useContext } from "react";
import { cn } from "../../lib/utils";

const TabsContext = createContext();

function Tabs({ defaultValue, children, className }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn("", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

function TabsList({ children, className }) {
  return (
    <div
      className={cn(
        "inline-flex h-10 overflow-x-auto lg:overflow-x-hidden items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className
      )}
    >
      {children}
    </div>
  );
}

function TabsTrigger({
  value,
  children,
  className,
  active = "bg-brand-secondary text-white shadow-md rounded-xl",
  inactive = "text-muted-foreground hover:text-foreground",
}) {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-xs sm:text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        activeTab === value ? active : inactive,
        className
      )}
    >
      {children}
    </button>
  );
}

function TabsContent({ value, children, className }) {
  const { activeTab } = useContext(TabsContext);
  if (activeTab !== value) return null;

  return (
    <div
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className
      )}
    >
      {children}
    </div>
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent };