// import {
//     Box,
//     Button,
//     Card,
//     CardHeader,
//     Heading,
//     Spinner,
//     Text,
//     Stack,
//     Divider,
//     Avatar,
//     Flex,
//     useColorModeValue,
// } from "@chakra-ui/react";
// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";
// import { useState } from "react";
// import { CompanyDetailsType } from "../types/Types";
// import CompanyFormModal from "./CompanyFormModal";

// const fetchCompanyDetails = async (id: number): Promise<CompanyDetailsType> => {
//     const { data } = await axios.get<CompanyDetailsType>(
//         `https://json-placeholder.mock.beeceptor.com/companies/${id}`
//     );
//     return data;
// };

// const CompanyDetails = () => {
//     const { id } = useParams<{ id: string }>();
//     const navigate = useNavigate();
//     const [isEditModalOpen, setIsEditModalOpen] = useState(false);

//     const {
//         data: companyDetails,
//         isLoading,
//         isError,
//     } = useQuery({
//         queryKey: ["companyDetail", id],
//         queryFn: () => fetchCompanyDetails(Number(id)),
//     });

//     if (isLoading) {
//         return (
//             <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
//                 <Spinner size="lg" color="blue.500" />
//             </Box>
//         );
//     }

//     if (isError || !companyDetails) {
//         return (
//             <Box textAlign="center" mt={10}>
//                 <Text fontSize="xl" color="red.500">
//                     Failed to fetch company details.
//                 </Text>
//             </Box>
//         );
//     }

//     return (
//         <>
//             <Button
//                 onClick={() => navigate("/companies")}
//                 position="absolute"
//                 top={4}
//                 left={4}
//                 size="sm"
//                 colorScheme="blue"
//                 variant="solid"
//                 shadow="sm"
//             >
//                 Back
//             </Button>

//             <Card
//                 mt={12}
//                 mx="auto"
//                 maxW="lg"
//                 p={8}
//                 borderRadius="lg"
//                 shadow="xl"
//                 bg={useColorModeValue("white", "gray.800")}
//             >
//                 <CardHeader textAlign="center">
//                     <Avatar
//                         size="xl"
//                         name={companyDetails.name}
//                         src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
//                             companyDetails.name
//                         )}`}
//                         mb={4}
//                     />
//                     <Heading size="lg">{companyDetails.name}</Heading>
//                     <Text fontSize="md" color="gray.500">
//                         {companyDetails.industry}
//                     </Text>
//                 </CardHeader>

//                 <Divider my={6} />

//                 <Box>
//                     <Stack spacing={4}>
//                         <Flex align="center">
//                             <Text fontWeight="bold" w="40%">
//                                 CEO:
//                             </Text>
//                             <Text>{companyDetails.ceoName}</Text>
//                         </Flex>

//                         <Flex align="center">
//                             <Text fontWeight="bold" w="40%">
//                                 Market Cap:
//                             </Text>
//                             <Text>${companyDetails.marketCap.toLocaleString()}</Text>
//                         </Flex>
//                     </Stack>
//                 </Box>

//                 <Button colorScheme="teal" mt={6} onClick={() => setIsEditModalOpen(true)}>
//                     Edit Company
//                 </Button>
//             </Card>

//             <CompanyFormModal
//                 isOpen={isEditModalOpen}
//                 onClose={() => setIsEditModalOpen(false)}
//                 company={companyDetails}
//             />
//         </>
//     );
// };

// export default CompanyDetails;































import {
    Box,
    Button,
    Card,
    CardHeader,
    Heading,
    Spinner,
    Text,
    Stack,
    Divider,
    Avatar,
    Flex,
    useColorModeValue,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
} from "@chakra-ui/react";
import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useRef } from "react";
import { CompanyDetailsType } from "../types/Types";
import CompanyFormModal from "./CompanyFormModal";

const fetchCompanyDetails = async (id: number): Promise<CompanyDetailsType> => {
    const { data } = await axios.get<CompanyDetailsType>(
        `https://json-placeholder.mock.beeceptor.com/companies/${id}`
    );
    return data;
};

const deleteCompany = async (id: number) => {
    await axios.delete(`https://json-placeholder.mock.beeceptor.com/companies/${id}`);
};

const CompanyDetails = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const cancelRef = useRef(null);

    const { data: companyDetails, isLoading, isError } = useQuery({
        queryKey: ["companyDetail", id],
        queryFn: () => fetchCompanyDetails(Number(id)),
    });

    const mutation = useMutation({
        mutationFn: () => deleteCompany(Number(id)),
        onSuccess: () => {
            navigate("/companies");
        },
    });


    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
                <Spinner size="lg" color="blue.500" />
            </Box>
        );
    }

    if (isError || !companyDetails) {
        return (
            <Box textAlign="center" mt={10}>
                <Text fontSize="xl" color="red.500">
                    Failed to fetch company details.
                </Text>
            </Box>
        );
    }

    return (
        <>
            <Button
                onClick={() => navigate("/companies")}
                position="absolute"
                top={4}
                left={4}
                size="sm"
                colorScheme="blue"
                variant="solid"
                shadow="sm"
            >
                Back
            </Button>

            <Card
                mt={12}
                mx="auto"
                maxW="lg"
                p={8}
                borderRadius="lg"
                shadow="xl"
                bg={useColorModeValue("white", "gray.800")}
            >
                <CardHeader textAlign="center">
                    <Avatar
                        size="xl"
                        name={companyDetails.name}
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                            companyDetails.name
                        )}`}
                        mb={4}
                    />
                    <Heading size="lg">{companyDetails.name}</Heading>
                    <Text fontSize="md" color="gray.500">
                        {companyDetails.industry}
                    </Text>
                </CardHeader>

                <Divider my={6} />

                <Box>
                    <Stack spacing={4}>
                        <Flex align="center">
                            <Text fontWeight="bold" w="40%">
                                CEO:
                            </Text>
                            <Text>{companyDetails.ceoName}</Text>
                        </Flex>

                        <Flex align="center">
                            <Text fontWeight="bold" w="40%">
                                Market Cap:
                            </Text>
                            <Text>${companyDetails.marketCap.toLocaleString()}</Text>
                        </Flex>
                    </Stack>
                </Box>

                <Button colorScheme="teal" mt={6} ml={4} onClick={() => setIsEditModalOpen(true)}>

                    Edit Company
                </Button>

                <Button
                    colorScheme="red"
                    mt={6}
                    ml={4}
                    onClick={() => setIsDeleteDialogOpen(true)}
                >
                    Delete Company
                </Button>
            </Card>

            <CompanyFormModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                company={companyDetails}
            />

            {/* Delete Confirmation Dialog */}
            <AlertDialog
                isOpen={isDeleteDialogOpen}
                leastDestructiveRef={cancelRef}
                onClose={() => setIsDeleteDialogOpen(false)}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Delete Company
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You want to delete this company?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={() => setIsDeleteDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button
                                colorScheme="red"
                                onClick={() => {
                                    mutation.mutate();
                                    setIsDeleteDialogOpen(false);
                                }}
                                ml={3}
                            >
                                Yes, Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default CompanyDetails;
