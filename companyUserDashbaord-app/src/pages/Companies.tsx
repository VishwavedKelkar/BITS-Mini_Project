import {
    Box,
    Button,
    Heading,
    Input,
    Select,
    SimpleGrid,
    Spinner,
    Text,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useReducer, useState } from "react";
import { filterReducer } from "../reducers/CompanyReducer";
import { Company } from "../types/Types";
import Navbar from "../components/Navbar";
import CompanyFormModal from "./CompanyFormModal";

const fetchCompanies = async (): Promise<Company[]> => {
    const { data } = await axios.get<Company[]>(
        "https://json-placeholder.mock.beeceptor.com/companies"
    );
    return data;
};

const Companies = () => {
    const navigate = useNavigate();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const [filterState, dispatch] = useReducer(filterReducer, {
        minMarketCap: 0,
        sortOrder: "asc",
    });

    const { data: companies = [], isLoading, isError } = useQuery({
        queryKey: ["companies"],
        queryFn: fetchCompanies,
    });

    const filteredCompanies = companies
        .filter(company => company.marketCap >= filterState.minMarketCap)
        .sort((a, b) =>
            filterState.sortOrder === "asc"
                ? a.marketCap - b.marketCap
                : b.marketCap - a.marketCap
        );

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
                <Spinner size="xl" />
            </Box>
        );
    }

    if (isError) {
        return (
            <Box textAlign="center" mt={10}>
                <Text fontSize="xl" color="red.500">
                    Failed to fetch companies.
                </Text>
            </Box>
        );
    }

    return (
        <>
            <Button
                onClick={() => navigate("/dashboard")}
                position="absolute"
                top={4}
                left={4}
                colorScheme="blue"
            >
                Back
            </Button>

            <Navbar />

            <Box p={10}>
                <Heading mb={6}>All Companies</Heading>

                <Button colorScheme="green" position="absolute" mb={4} top={4} right={4} onClick={() => setIsAddModalOpen(true)}>
                    Add Company
                </Button>

                <Input
                    placeholder="Min Market Cap"
                    type="number"
                    mb={4}
                    onChange={(e) =>
                        dispatch({
                            type: "SET_MIN_MARKET_CAP",
                            payload: Number(e.target.value),
                        })
                    }
                />

                <Select
                    mb={6}
                    placeholder="Sort by Market Cap"
                    onChange={(e) =>
                        dispatch({
                            type: "SET_SORT_ORDER",
                            payload: e.target.value as "asc" | "desc",
                        })
                    }
                >
                    <option value="asc">Low to High</option>
                    <option value="desc">High to Low</option>
                </Select>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                    {filteredCompanies.map(company => (
                        <Box
                            key={company.id}
                            p={5}
                            bg="gray.100"
                            rounded="md"
                            shadow="md"
                            cursor="pointer"
                            _hover={{
                                transform: "translateY(-2px) translateX(-2px)",
                                boxShadow: "2xl",
                            }}
                            transition="all 0.3s ease"
                            onClick={() => navigate(`/company-details/${company.id}`)}
                        >
                            <Text fontWeight="bold">Name: {company.name}</Text>
                            <Text>Market Cap: ${company.marketCap.toLocaleString()}</Text>
                        </Box>
                    ))}
                </SimpleGrid>
            </Box>

            <CompanyFormModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
        </>
    );
};

export default Companies;
