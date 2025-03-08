import { createContext, useContext, useState, ReactNode } from "react";
import { Company } from "../types/Types";


interface CompanyContextType {
    selectedCompany: Company | null;
    setSelectedCompany: (company: Company | null) => void;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider = ({ children }: { children: ReactNode }) => {
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

    return (
        <CompanyContext.Provider value={{ selectedCompany, setSelectedCompany }}>
            {children}
        </CompanyContext.Provider>
    );
};

export const useCompanyContext = () => {
    const context = useContext(CompanyContext);
    if (!context) {
        throw new Error("useCompanyContext must be used within a CompanyProvider");
    }
    return context;
};
