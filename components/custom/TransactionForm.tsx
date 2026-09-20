import InputField from "@/components/ui/InputField";
import Select from "@/components/ui/Select";
import DateInput from "@/components/ui/DateInput";
import WalletSelect from "./WalletSelect";
import Button from "@/components/ui/Button";
import { CustomModal, CustomModalBody, CustomModalContent, CustomModalFooter, CustomModalHeader, CustomModalTitle } from "../ui/Modal";
import Error from "./Error";

import { View, TouchableOpacity, useColorScheme, Text, ActivityIndicator } from "react-native";
import { ExpenseCategories, IncomeCategories, TransactionTypeOptions } from "@/constants/transaction";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTransactionSchema, TransactionFormData } from "@/schemas/transaction.schema";
import { useForm } from "react-hook-form";
import useCreateTransaction from "@/hooks/transaction/use-create-transaction.hook";
import { useEffect, useMemo } from "react";
import { formatDateOnly } from "@/utils/utils";
import { TransactionCategory } from "@/types/transaction.type";
import { Colors } from "@/constants/theme";

type TransactionFormProps = {
    visible: boolean;
    handleClose: () => void;
    onSuccess?: () => void;
    type?: "EXPENSE" | "INCOME"
}

export default function TransactionForm({
    handleClose,
    visible,
    type,
    onSuccess
} : TransactionFormProps) {
    const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
    const colors = Colors[colorScheme];

    const { handleSubmit, formState: { errors }, watch, setValue, reset } = useForm<TransactionFormData>({
        resolver: zodResolver(CreateTransactionSchema),
        defaultValues: {
            title: '',
            amount: 0,
            category: '',
            date: undefined,
            type: 'EXPENSE',
            walletId: ''
        }
    });

    useEffect(() => {
        if(type) {
            setValue("type", type);
        }
    }, [type])

    const createTransactionMutation = useCreateTransaction();

    const categoryOptions = useMemo(() => {
        const type = watch('type')

        let categories : any = []

        if (type === 'EXPENSE') {
            categories = ExpenseCategories;
        }

        if (type === 'INCOME') {
            categories = IncomeCategories;
        }

        return categories.map((category: string) => ({
            label: category.replace(/_/g, ' '),
            value: category,
        }))

    }, [watch('type')]);

    const onSubmit = (data: TransactionFormData) => {
        createTransactionMutation.mutateAsync({
            amount: data.amount,
            category: data.category as TransactionCategory,
            date: formatDateOnly(data.date),
            title: data.title,
            type: data.type as "INCOME" | "EXPENSE",
            walletId: data.walletId
        }, {
            onSuccess: () => {
                reset();
                handleClose();
                onSuccess?.();
            }
        });
    }

    return (
        <CustomModal
            visible={visible}
            handleClose={handleClose}
        >
            <CustomModalContent>
                <CustomModalHeader>
                    <CustomModalTitle>
                    {type === 'EXPENSE'
                        ? 'Add Expense'
                        : type === 'INCOME'
                        ? 'Add Income'
                        : 'Create Transaction'}
                    </CustomModalTitle>
                </CustomModalHeader>
                <CustomModalBody>
                    {!type && (
                        <View className="flex-row flex-wrap gap-3">
                            {TransactionTypeOptions.map(option => {
                                const selected = option.value === watch('type');
                                const Icon = option.icon;
                                return (
                                    <TouchableOpacity
                                        key={option.value}
                                        onPress={() => setValue('type', option.value)}
                                        className="min-h-[52px] flex-row items-center rounded-xl border p-3"
                                        style={{
                                            width: '48%',
                                            backgroundColor: selected
                                            ? colors.surfaceTint[0]
                                            : colors.input,
                                            borderColor: selected
                                            ? colors.tint
                                            : colors.border,
                                        }}
                                        activeOpacity={0.7}
                                    >
                                        <Icon
                                            size={20}
                                            color={selected ? colors.tint : colors.icon}
                                        />

                                        <Text
                                            className="ml-2 flex-1 text-sm font-medium"
                                            numberOfLines={1}
                                            style={{
                                            color: selected ? colors.tint : colors.text,
                                            }}
                                        >
                                            {option.label}
                                        </Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    )}
                    <Error />
                    <InputField 
                        label="Title"
                        value={watch('title')}
                        placeholder="Enter transaction title"
                        onChangeText={(text) => setValue('title', text)}
                        error={errors.title?.message}
                    />
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
                    <DateInput
                        label="Date"
                        value={watch('date')}
                        onChange={(date) => setValue('date', date)}
                        error={errors.date?.message}
                    />

                    <WalletSelect 
                        onChange={(value) => setValue('walletId', value)}
                        value={watch('walletId')}
                        error={errors.walletId?.message}
                    />
                </CustomModalBody>
                <CustomModalFooter>
                    {createTransactionMutation.isPending ? (
                        <ActivityIndicator color={colors.text}/>
                    ) : (
                        <Button 
                            title="Create Transaction"
                            onPress={handleSubmit(onSubmit)}
                        />
                    )}
                </CustomModalFooter>
            </CustomModalContent>
        </CustomModal>
    )
}