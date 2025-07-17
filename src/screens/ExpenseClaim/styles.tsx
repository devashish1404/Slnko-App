// ExpenseClaimStyles.js
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  form: {
    marginBottom: 20,
  },
  dateInput: {
    padding: 12,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 6,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  dateField: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 10,
},
dateLabel: {
  fontSize: 16,
  fontWeight: '500',
  color: '#333',
  marginBottom: 4,
},

  picker: {
    height: 50,
    borderWidth: 12,
    borderColor: 'black',
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  getStatusBtn: {
    backgroundColor: '#003366',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 16,
  },
  getStatusText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  remarksInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 8,
    marginBottom: 8,
  },
  editButton: {
    backgroundColor: '#003366',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  editText: {
    color: '#fff',
    fontWeight: 'bold',
     backgroundColor:'#003366',
    
  },
});

export default styles;
