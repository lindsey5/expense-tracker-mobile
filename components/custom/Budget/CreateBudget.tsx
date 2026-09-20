import Button from "@/components/ui/Button";
import InputField from "@/components/ui/InputField";
import { CustomModal, CustomModalBody, CustomModalContent, CustomModalFooter, CustomModalHeader, CustomModalTitle } from "@/components/ui/Modal";
import Select from "@/components/ui/Select";
import Separator from "@/components/ui/Separator";
import { Colors } from "@/constants/theme";
import { ExpenseCategories } from "@/constants/transaction";
import useCreateBudget from "@/hooks/budget/create-budget.hook";
import { CreateBudgetFormData, CreateBudgetSchema } from "@/schemas/budget.schema";
import { TransactionCategory } from "@/types/transaction.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react-native";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { Pressable, useColorScheme, Text, ActivityIndicator } from "react-native";
import Error from "../Error";


export default function CreateBudget({
    onSuccess
} : { onSuccess?: () => void }) {
    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const colors = Colors[colorScheme];

    const [visible, setVisible] = useState(false);
    
    const { handleSubmit, formState: { errors }, watch, setValue, reset } = useForm<CreateBudgetFormData>({
        resolver: zodResolver(CreateBudgetSchema),
        defaultValues: {
            amount: 0,
            category: '',
        
        }
    });

    const createBudgetMutation = useCreateBudget();
    
    const categoryOptions = useMemo(() => {
        return ExpenseCategories.map((category: string) => ({
            label: category.replace(/_/g, ' '),
            value: category,
        }))
    }, []);

    const onSubmit = (data: CreateBudgetFormData) => {
        createBudgetMutation.mutateAsync({
            amount: data.amount,
            category: data.category as TransactionCategory,
            month: new Date().getMonth() + 1,
            year: new Date().getFullYear(),
        }, {
            onSuccess: () => {
                reset();
                setVisible(false);
                onSuccess?.();
            }
        });
    }

    const handleClose = () => {
        if(createBudgetMutation.isPending) return;

        setVisible(false);
    }

    return (
        <>
        <Pressable onPress={() => setVisible(true)} className="flex-row items-center">
            <Plus size={17} color={colors.tint} />
            <Text className="ml-1 text-sm font-semibold" style={{ color: colors.tint }}>
            Add Budget
            </Text>
        </Pressable>
        <CustomModal
            handleClose={handleClose}
            visible={visible}
        >
            <CustomModalContent>
                <CustomModalHeader>
                    <CustomModalTitle>
                        Create Budget
                    </CustomModalTitle>
                    <Text className="text-sm mt-2" style={{ color: colors.icon }}>{new Date().toLocaleDateString('en-US', {
                        month: 'long',
                        year: 'numeric',
                    })}</Text>
                </CustomModalHeader>
                <CustomModalBody>
                    <Separator className="mb-5"/>
                    <Error />
                    <Select 
                        onChange={(value) => setValue('category', value)}
                        options={categoryOptions}
                        value={watch('category')}
                        label="Select Category"
                        placeholder="Select Category"
                        error={errors.category?.message}
                    />
                    <InputField 
                        label="Amount"
                        placeholder="0.00"
                        keyboardType="number-pad"
                        onChangeText={(text) => setValue('amount', Number(text))}
                        error={errors.amount?.message}
                    />
                </CustomModalBody>
                <CustomModalFooter>
                    {createBudgetMutation.isPending ? (
                        <ActivityIndicator color={colors.text}/>
                    ) : (
                        <Button 
                            title="Create Budget"
                            onPress={handleSubmit(onSubmit)}
                        />
                    )}
                </CustomModalFooter>
            </CustomModalContent>
        </CustomModal>
        </>
    )
}