import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: '#fff',
    flex: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  half: {
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  filePicker: {
    padding: 10,
    backgroundColor: '#e6e6e6',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
  },
  textarea: {
    height: 100,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  switch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    minWidth: 100,
    backgroundColor: '#083c6c',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  tabButton: {
    flexDirection: 'row',
    borderRadius: 30,
    overflow: 'hidden',
    marginBottom: 12,
    backgroundColor: '#ccc',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  activeTab: {
    backgroundColor: '#083c6c',
  },
  tabText: {
    fontWeight: 'bold',
    color: '#000',
  },
  activeTabText: {
    color: '#fff',
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginBottom: 12,
  },
  addtextButton: {
    fontWeight: 'bold',
    color: '#083c6c',
  },
  itemAdd: {
    flex: 1,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#f8f8f8',
    marginTop: 12,
  },
  deleteIcon: {
    alignSelf: 'flex-end',
    marginVertical: 10,
  },

  // DROPDOWN styles
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    height: 44,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  dropdownText: {
    color: '#222',
    fontSize: 16,
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalDropdown: {
    width: Math.round(windowWidth * 0.9),
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 5,
    paddingVertical: 8,
    maxHeight: 250,
    alignSelf: 'center',
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#222',
  },
  dropdownItemTextInactive: {
    fontSize: 16,
    color: '#888',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    margin: 8,
    paddingHorizontal: 10,
    height: 40,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  inputBill: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  helper: {
    fontSize: 12,
    color: 'gray',
  },
});

 