
import React, { useState } from 'react';
import styles from './styles';

import {
  View,
  ScrollView,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { Picker } from '@react-native-picker/picker';
import { format } from 'date-fns';

interface ExpenseItem {
  tokenNumber: string;
  status: string;
  reqDate: string;
  actionBy: string;
  monthlyBudget: number;
  apprAmt: number;
  finApprAmt: number;
  pendingAt: string;
  excessAmt: number;
  remarks: string;
  editable: boolean;
}

const ExpenseDetail: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('Inprocess');
  const [isDatePickerVisible, setDatePickerVisibility] = useState<'start' | 'end' | null>(null);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([
    {
      tokenNumber: '2498788',
      status: 'Inprocess',
      reqDate: '02 June 2025',
      actionBy: 'Mukesh Pathirana',
      monthlyBudget: 200000,
      apprAmt: 125000,
      finApprAmt: 100000,
      pendingAt: 'HR',
      excessAmt: 0,
      remarks: 'all the items have been added',
      editable: true,
    },
    {
      tokenNumber: '2498789',
      status: 'Pending',
      reqDate: '10 June 2025',
      actionBy: 'Mukesh Pathirana',
      monthlyBudget: 200000,
      apprAmt: 125000,
      finApprAmt: 100000,
      pendingAt: 'HR',
      excessAmt: 0,
      remarks: 'All monthly expense',
      editable: false,
    },
  ]);

const showDatePicker = (type: 'start' | 'end') => setDatePickerVisibility(type);
const hideDatePicker = () => setDatePickerVisibility(null);

const handleDateConfirm = (date: Date) => {
  if (isDatePickerVisible === 'start') {
    setStartDate(date);
  } else if (isDatePickerVisible === 'end') {
    setEndDate(date);
  }
  hideDatePicker();
};


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>Expense Claim</Text>
      <View style={styles.form}>
        <TouchableOpacity onPress={() => showDatePicker('start')} style={styles.dateInput}>
          <Text>{startDate ? format(startDate, 'dd/MM/yyyy') : 'Start Date'}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => showDatePicker('end')} style={styles.dateInput}>
          <Text>{endDate ? format(endDate, 'dd/MM/yyyy') : 'End Date'}</Text>
        </TouchableOpacity>

        <Picker
          selectedValue={statusFilter}
          onValueChange={(value) => setStatusFilter(value)}
          style={styles.picker}
        >
          <Picker.Item label="Inprocess" value="Inprocess" />
          <Picker.Item label="Pending" value="Pending" />
          <Picker.Item label="Cancelled" value="Cancelled" />
          <Picker.Item label="Approved" value="Approved" />
        </Picker>

        <TouchableOpacity style={styles.getStatusBtn}>
          <Text style={styles.getStatusText}>Get Status</Text>
        </TouchableOpacity>
      </View>

      {expenses.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text>Token Number: {item.tokenNumber}</Text>
          <Text>Status: {item.status}</Text>
          <Text>Req Date: {item.reqDate}</Text>
          <Text>Action By: {item.actionBy}</Text>
          <Text>Monthly Budget: {item.monthlyBudget.toFixed(2)}</Text>
          <Text>Appr Amt: {item.apprAmt.toFixed(2)}</Text>
          <Text>Fin Appr Amount: {item.finApprAmt.toFixed(2)}</Text>
          <Text>Pending At: {item.pendingAt}</Text>
          <Text>Excess Amt: {item.excessAmt.toFixed(2)}</Text>

          <TextInput
            value={item.remarks}
            editable={item.editable}
            style={[styles.remarksInput, { backgroundColor: item.editable ? '#fff' : '#f0f0f0' }]}
          />

          <TouchableOpacity
            style={[styles.editButton, { backgroundColor: item.editable ? '#003366' : '#ccc' }]}
            disabled={!item.editable}
          >
            <Text style={styles.editText}>{item.editable ? 'Edit' : 'Saved'}</Text>
          </TouchableOpacity>
        </View>
      ))}

      <DateTimePickerModal
        isVisible={!!isDatePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={hideDatePicker}
      />
    </ScrollView>
  );
};



export default ExpenseDetail;

