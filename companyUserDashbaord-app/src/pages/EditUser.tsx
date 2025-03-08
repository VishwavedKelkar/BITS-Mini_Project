import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    userData?: any;
}

const EditUser = ({ isOpen, onClose, userData }: Props) => {
    const { register, handleSubmit } = useForm({
        defaultValues: userData || { name: "", company: "", username: "", email: "", address: "", zip: "", state: "", country: "", phone: "" },
    });

    const toast = useToast();
    const queryClient = useQueryClient();

    const onSubmit = async (data: any) => {
        try {
            if (userData) {
                await axios.put(`https://json-placeholder.mock.beeceptor.com/users/${userData.id}`, data);
                toast({ title: "User updated successfully!", status: "success", duration: 3000, isClosable: true });
            } else {
                await axios.post("https://json-placeholder.mock.beeceptor.com/users", data);
                toast({ title: "User created successfully!", status: "success", duration: 3000, isClosable: true });
            }

            queryClient.invalidateQueries({ queryKey: ["userDetails", String(userData?.id)] });
            onClose();
        } catch (error) {
            toast({ title: "Something went wrong!", status: "error", duration: 3000, isClosable: true });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{userData ? "Edit User" : "Add User"}</ModalHeader>
                <ModalBody>
                    <FormControl>
                        <FormLabel>Name</FormLabel>
                        <Input {...register("name", { required: true })} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Company</FormLabel>
                        <Input {...register("company", { required: true })} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Username</FormLabel>
                        <Input {...register("username", { required: true })} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Email</FormLabel>
                        <Input {...register("email", { required: true })} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Address</FormLabel>
                        <Input {...register("address", { required: true })} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>ZIP</FormLabel>
                        <Input {...register("zip", { required: true })} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>State</FormLabel>
                        <Input {...register("state", { required: true })} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Country</FormLabel>
                        <Input {...register("country", { required: true })} />
                    </FormControl>
                    <FormControl mt={4}>
                        <FormLabel>Phone</FormLabel>
                        <Input {...register("phone", { required: true })} />
                    </FormControl>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleSubmit(onSubmit)}>
                        {userData ? "Update" : "Create"}
                    </Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default EditUser;
