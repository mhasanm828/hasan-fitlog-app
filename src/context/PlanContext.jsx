"use client";

import { createContext, useContext, useEffect, useState } from "react";

const PlanContext = createContext();

export const PlanProvider = ({ children }) => {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);

  // Load once from localStorage
  useEffect(() => {
    const planData = JSON.parse(localStorage.getItem("plan")) || [];
    const savedData = JSON.parse(localStorage.getItem("saved")) || [];

    setPlan(planData);
    setSaved(savedData);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    localStorage.setItem("saved", JSON.stringify(saved));
  }, [saved]);

  // Today's Plan
  const addPlan = (workout) => {
    if (plan.find((item) => item.id === workout.id)) return false;
    if (plan.length >= 5) return false;

    setPlan((prev) => [...prev, workout]);
    return true;
  };

  const removePlan = (id) => {
    setPlan((prev) => prev.filter((item) => item.id !== id));
  };

  // Saved
  const addSaved = (workout) => {
    if (saved.find((item) => item.id === workout.id)) return false;

    setSaved((prev) => [...prev, workout]);
    return true;
  };

  const removeSaved = (id) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        addPlan,
        removePlan,
        addSaved,
        removeSaved,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
};

export const usePlan = () => useContext(PlanContext);