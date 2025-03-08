import { useEffect } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    FormControl,
    FormLabel,
    Input,
    useToast
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { CompanyDetailsType } from "../types/Types";
import axios from "axios";

interface CompanyFormProps {
    isOpen: boolean;
    onClose: () => void;
    company?: CompanyDetailsType;
}

const CompanyFormModal: React.FC<CompanyFormProps> = ({ isOpen, onClose, company }) => {

    const toast = useToast();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<CompanyDetailsType>();

    useEffect(() => {
        if (company) {
            reset(company);
        } else {
            reset();
        }
    }, [company, reset]);

    const onSubmit = async (data: CompanyDetailsType) => {
        if (company) {
            console.log("Updating company:", data);
            await axios.put(`https://json-placeholder.mock.beeceptor.com/companies/${company.id}`, data);
            toast({ title: "Company updated successfully!", status: "success", duration: 3000, isClosable: true });
        } else {
            console.log("Adding new company:", data);
            await axios.post("https://json-placeholder.mock.beeceptor.com/companies", data);
            toast({ title: "Company Added successfully!", status: "success", duration: 3000, isClosable: true });

        }
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{company ? "Edit Company" : "Add Company"}</ModalHeader>
                <ModalBody>
                    <FormControl isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input {...register("name", { required: true })} />
                        {errors.name && <p style={{ color: "red" }}>Name is required</p>}
                    </FormControl>

                    <FormControl isRequired mt={4}>
                        <FormLabel>CEO Name</FormLabel>
                        <Input {...register("ceoName", { required: true })} />
                    </FormControl>

                    <FormControl isRequired mt={4}>
                        <FormLabel>Market Cap</FormLabel>
                        <Input type="number" {...register("marketCap", { required: true })} />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit(onSubmit)}>
                        {company ? "Update" : "Add"}
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default CompanyFormModal;
