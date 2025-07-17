import { createContext, useContext, useState } from "react";

export const BrandContext = createContext();

export function BrandProvider({ children }) {
  const [activeBrand, setActiveBrand] = useState(null);

  function openBrandModal(brand) {
    setActiveBrand(brand);
  }

  function closeBrandModal() {
    setActiveBrand(null);
  }

  return (
    <BrandContext.Provider
      value={{ activeBrand, openBrandModal, closeBrandModal }}
    >
      {children}
    </BrandContext.Provider>
  );
}
